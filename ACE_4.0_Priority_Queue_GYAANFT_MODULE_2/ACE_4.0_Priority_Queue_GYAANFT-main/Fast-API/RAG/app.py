from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from langchain_community.document_loaders import TextLoader
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import time
from pymongo import MongoClient
import json
import logging
from pydantic import BaseModel
from typing import Optional, Dict, List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Use the working API key
gemini_api_key = "AIzaSyCxvh9h-otrM5BABmEkQW-f9RRYfVlVQ2U"
mongo_uri = os.environ.get("MONGO_URI")

if not mongo_uri:
    raise ValueError("MONGO_URI is not set in environment variables.")

# FastAPI app setup
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize MongoDB connection
mongo_client = MongoClient(mongo_uri)
db = mongo_client.get_default_database()

# Initialize embeddings
embeddings = OllamaEmbeddings(model="llama3")

# Global FAISS vector store
vector_store = None

# Initialize Google Gemini LLM with the correct model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=gemini_api_key,
    temperature=0.7
)

# Chat prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", """
    Answer the question based on the provided context and collection data.
    Please provide the most accurate response considering both the immediate context
    and relevant information from the collections.
    
    Context: {context}
    Collection Data: {collection_data}
    """),
    ("user", "{input}")
])

document_chain = create_stuff_documents_chain(llm, prompt)

# Request/Response models
class CareerAssessmentAnswer(BaseModel):
    questionId: str
    answer: str

class CareerAssessmentResponse(BaseModel):
    nextQuestion: Optional[dict] = None
    careers: Optional[List[dict]] = None
    message: str
    isComplete: bool = False

async def get_all_collections_data():
    collections = ["User", "Playlist", "Book", "CareerPath", "Question", "Other"]
    all_data = {}
    
    for collection_name in collections:
        collection = db[collection_name]
        documents = list(collection.find({}, {'_id': 0}))
        all_data[collection_name] = documents
    
    return all_data

def process_collection_data_for_embedding(collection_data):
    texts = []
    for collection_name, documents in collection_data.items():
        for doc in documents:
            if isinstance(doc.get('data'), str):
                texts.append(f"{collection_name}: {doc['data']}")
            else:
                texts.append(f"{collection_name}: {json.dumps(doc)}")
    return texts

@app.post("/add_text/")
async def add_text(text: str):
    global vector_store
    try:
        collection_data = await get_all_collections_data()
        collection_texts = process_collection_data_for_embedding(collection_data)
        
        all_texts = [text] + collection_texts
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
        final_documents = text_splitter.split_text("\n".join(all_texts))
        
        new_vectors = FAISS.from_texts(final_documents, embeddings)
        
        if vector_store is None:
            vector_store = new_vectors
        else:
            existing_texts = vector_store.get_texts()
            all_texts = existing_texts + final_documents
            vector_store = FAISS.from_texts(all_texts, embeddings)
        
        return {"message": "Text and collection data added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding text: {e}")

@app.post("/get_response/")
async def get_response(input_text: str):
    global vector_store
    if vector_store is None:
        raise HTTPException(status_code=400, detail="No data available in vector store. Add text first.")
    
    try:
        collection_data = await get_all_collections_data()
        retriever = vector_store.as_retriever()
        retrieved_docs = retriever.invoke(input_text)
        context = "\n".join([doc.page_content for doc in retrieved_docs])
        
        response = requests.get("http://localhost:5001/allCollection")
        if response.status_code == 200:
            context += "\n" + response.text
        
        full_context = {
            "context": context,
            "collection_data": json.dumps(collection_data, indent=2),
            "input": input_text
        }
        
        start = time.time()
        response = llm.invoke(prompt.format_messages(**full_context))
        end = time.time()
        
        return {
            "response": response.content,
            "response_time": f"{end - start:.2f} seconds"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {e}")

@app.get("/refresh_vectorstore/")
async def refresh_vectorstore():
    global vector_store
    try:
        collection_data = await get_all_collections_data()
        texts = process_collection_data_for_embedding(collection_data)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
        final_documents = text_splitter.split_text("\n".join(texts))
        vector_store = FAISS.from_texts(final_documents, embeddings)
        return {"message": "Vector store refreshed successfully with current collection data"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refreshing vector store: {e}")

@app.post("/career-assessment/answer/")
async def submit_answer(answer: CareerAssessmentAnswer):
    try:
        logger.info(f"Received answer: {answer}")
        
        # Get all questions
        questions = list(db.CareerAssessment.find({}, {'_id': 0}))
        current_question_id = int(answer.questionId)
        
        # If it's the first question (interests)
        if current_question_id == 1:
            # Process the interest with Gemini
            try:
                # Create a simple prompt for Gemini
                prompt = f"""You are a career counselor. The user is interested in {answer.answer}. 
                Which of these categories best matches their interest:
                - Technology and Innovation
                - Healthcare and Medicine
                - Business and Finance
                - Arts and Design
                - Education and Training
                - Engineering and Construction
                - Science and Research
                - Social Services and Community
                
                Return only the exact category name from the list above. If the interest is related to blockchain, cryptocurrency, or technology, return 'Technology and Innovation'."""
                
                # Get career category suggestion from Gemini
                logger.info("Sending prompt to Gemini")
                response = llm.invoke(prompt)
                suggested_category = response.content.strip()
                logger.info(f"Gemini suggested category: {suggested_category}")
                
                # Get matching careers
                career_paths = list(db.CareerPath.find({'category': suggested_category}, {'_id': 0}))
                if not career_paths and "blockchain" in answer.answer.lower():
                    career_paths = list(db.CareerPath.find({'category': 'Technology and Innovation'}, {'_id': 0}))
                
                # Get next question
                next_question = next((q for q in questions if q['question_id'] == current_question_id + 1), None)
                
                return CareerAssessmentResponse(
                    nextQuestion=next_question,
                    careers=career_paths[:3],  # Return top 3 matching careers
                    message="Answer processed successfully",
                    isComplete=False
                )
                
            except Exception as e:
                logger.error(f"Error processing with Gemini: {str(e)}")
                # Fallback to technology careers for blockchain
                if "blockchain" in answer.answer.lower():
                    career_paths = list(db.CareerPath.find({'category': 'Technology and Innovation'}, {'_id': 0}))
                    next_question = next((q for q in questions if q['question_id'] == current_question_id + 1), None)
                    return CareerAssessmentResponse(
                        nextQuestion=next_question,
                        careers=career_paths[:3],
                        message="Showing technology careers based on your interest",
                        isComplete=False
                    )
                raise
        
        # For other questions, just return the next question
        next_question = next((q for q in questions if q['question_id'] == current_question_id + 1), None)
        
        # If there is no next question, we're done
        if not next_question:
            return CareerAssessmentResponse(
                message="Assessment complete",
                isComplete=True
            )
        
        return CareerAssessmentResponse(
            nextQuestion=next_question,
            message="Answer processed successfully",
            isComplete=False
        )
        
    except Exception as e:
        logger.error(f"Error processing answer: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "message": "An error occurred processing your answer",
                "error": str(e)
            }
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Changed port to 8001 to avoid conflict