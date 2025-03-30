import streamlit as st
import os
import warnings
import speech_recognition as sr
import tempfile
import time
from gtts import gTTS
from langchain_community.document_loaders import TextLoader
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

# Page configuration
st.set_page_config(
    page_title="Zing Sensei - Your AI Learning Assistant",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Enhanced Custom CSS with yellow theme
st.markdown("""
    <style>
    /* Variables for consistent colors */
    :root {
        --primary-yellow: #FFD700;
        --secondary-yellow: #FFC107;
        --hover-yellow: #FFB300;
        --text-dark: #2C3E50;
        --bg-light: #FFFDF7;
    }
    
    /* Global styles */
    .main {
        background-color: var(--bg-light);
        padding: 2rem;
        font-family: 'Inter', sans-serif;
    }
    
    /* Header styles */
    .stTitle {
        background: linear-gradient(120deg, var(--primary-yellow) 0%, var(--secondary-yellow) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 3.5rem !important;
        text-align: center;
        margin-bottom: 2rem;
        font-weight: 800;
    }
    
    /* Input fields */
   
    
    .stTextInput:focus, .stTextArea:focus {
        border-color: var(--primary-yellow);
        box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
    }
    
    /* Buttons */
    .stButton>button {
        width: 100%;
        border-radius: 1rem;
        background: linear-gradient(45deg, var(--primary-yellow), var(--secondary-yellow));
        color: var(--text-dark);
        font-weight: bold;
        padding: 0.75rem 1.5rem;
        border: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .stButton>button:hover {
        background: linear-gradient(45deg, var(--secondary-yellow), var(--hover-yellow));
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
    }
    
    /* Sidebar */
    .sidebar .stTextArea {
        min-height: 200px;
        background-color: white;
    }
    
    /* Cards and containers */
    .content-card {
      
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 2px solid rgba(255, 225, 0, 1); /* Bright yellow */


        margin-bottom: 1.5rem;
    }
    
    /* Success messages */
    .success-message {
        background-color: #121212;
        border-left: 4px solid var(--primary-yellow);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
    
    /* Chat history */
    .chat-item {
        border-left: 3px solid var(--secondary-yellow);
        padding-left: 1rem;
        margin-bottom: 1.5rem;
    }
    
    /* Loading spinner */
    .stSpinner > div {
        border-top-color: var(--primary-yellow) !important;
    }
    </style>
    """, unsafe_allow_html=True)

# Suppress deprecated warnings
warnings.filterwarnings("ignore", category=UserWarning, module="langchain")

# Initialize session state with additional features
if "vector_store" not in st.session_state:
    st.session_state.vector_store = None
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "total_questions" not in st.session_state:
    st.session_state.total_questions = 0
if "successful_responses" not in st.session_state:
    st.session_state.successful_responses = 0

# Load environment variables
load_dotenv()

# Environment variable check with enhanced error handling
gemini_api_key = os.environ.get("GEMINI_API_KEY")
if not gemini_api_key:
    st.error("🔑 GEMINI_API_KEY is missing! Please set it in your environment variables.")
    st.info("💡 Tip: Create a .env file in your project root and add: GEMINI_API_KEY=your_key_here")
    st.stop()

# Initialize components with improved error handling
try:
    embeddings = OllamaEmbeddings(model="llama3")
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=gemini_api_key,
        temperature=0.7
    )
except Exception as e:
    st.error(f"⚠️ Error initializing AI components: {str(e)}")
    st.stop()

# Enhanced chat prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", """
    You are Zing Sensei, an enthusiastic and knowledgeable educational AI assistant with expertise in:
    - Breaking down complex concepts into simple explanations
    - Providing real-world examples and analogies
    - Adapting explanations to different learning styles
    - Encouraging critical thinking and curiosity
    
    Context: {context}
    
    Remember to:
    1. Start with a warm greeting
    2. Provide clear, structured explanations
    3. Include relevant examples
    4. End with an encouraging note or follow-up suggestion
    """),
    ("user", "{input}")
])

# Create document chain
document_chain = create_stuff_documents_chain(llm, prompt)

# Main title with enhanced styling
st.title("✨ Zing Sensei")
st.markdown("### Your Personal AI Learning Guide")

# Sidebar with improved organization
with st.sidebar:
   
    
    # Stats display
    st.markdown("### 📊 Learning Statistics")
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Questions Asked", st.session_state.total_questions)
    with col2:
        success_rate = (st.session_state.successful_responses / st.session_state.total_questions * 100) if st.session_state.total_questions > 0 else 0
        st.metric("Success Rate", f"{success_rate:.1f}%")
    
    st.markdown("### 📚 Knowledge Base")
    
    with st.expander("ℹ️ Quick Guide", expanded=False):
        st.markdown("""
        1. 📝 Add your educational content below
        2. 💭 Ask questions via text or voice
        3. 🎯 Get detailed explanations
        4. 🔊 Listen to audio responses
        5. 📌 Review chat history
        """)
    
    text_input = st.text_area(
        "Educational Content:",
        placeholder="Paste your learning materials, notes, or any educational content here...",
        height=200
    )
    
    if st.button("📥 Add to Knowledge Base", use_container_width=True):
        with st.spinner("Processing your content..."):
            try:
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=1000,
                    chunk_overlap=100,
                    separators=["\n\n", "\n", ". ", " ", ""]
                )
                final_documents = text_splitter.split_text(text_input)
                
                new_vectors = FAISS.from_texts(final_documents, embeddings)
                
                if st.session_state.vector_store is None:
                    st.session_state.vector_store = new_vectors
                else:
                    st.session_state.vector_store.merge_from(new_vectors)
                
                st.success("✨ Content successfully added to your knowledge base!")
                st.balloons()
            except Exception as e:
                st.error(f"❌ Error processing content: {str(e)}")

# Main content area with improved layout
col1, col2 = st.columns([2, 1])

with col1:
    st.markdown("""
    <div class="content-card">
        <h3>🤔 Ask Your Question</h3>
    </div>
    """, unsafe_allow_html=True)
    
    query = st.text_input(
        "",
        placeholder="What would you like to learn about today?",
        key="text_query"
    )
    
    st.markdown("""
    <div class="content-card">
        <h3>🎤 Voice Input</h3>
    </div>
    """, unsafe_allow_html=True)
    
    audio_value = st.audio_input("")

    if audio_value:
        with st.spinner("🎯 Converting speech to text..."):
            with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
                temp_audio.write(audio_value.read())
                temp_audio_path = temp_audio.name

            def audio_to_text(audio_file):
                recognizer = sr.Recognizer()
                with sr.AudioFile(audio_file) as source:
                    audio_data = recognizer.record(source)
                    try:
                        return recognizer.recognize_google(audio_data)
                    except sr.UnknownValueError:
                        return None
                    except sr.RequestError as e:
                        st.error(f"🎤 Speech Recognition Error: {e}")
                        return None

            query = audio_to_text(temp_audio_path)
            if query:
                st.success(f"🎯 I heard: {query}")
            else:
                st.warning("👂 I couldn't understand that. Could you try again?")

with col2:
    st.markdown("""
    <div class="content-card">
        <h3>⚡ Quick Actions</h3>
    </div>
    """, unsafe_allow_html=True)
    
    get_response = st.button("🤖 Get Answer & 🔊 Listen", use_container_width=True)

if get_response:
    st.session_state.total_questions += 1
    
    if not query:
        st.error("📝 Please ask a question first!")
    elif st.session_state.vector_store is None:
        st.error("📚 The knowledge base is empty. Please add some content!")
    else:
        with st.spinner("🧠 Thinking deeply about your question..."):
            try:
                retriever = st.session_state.vector_store.as_retriever(
                    search_type="similarity",
                    search_kwargs={"k": 3}
                )
                retrieval_chain = create_retrieval_chain(retriever, document_chain)
                
                start_time = time.time()
                response = retrieval_chain.invoke({"input": query})
                end_time = time.time()
                
                response_text = response['answer']
                
                # Display response in enhanced container
                st.markdown("""
                <div class="content-card">
                    <h3>💡 Here's what I found</h3>
                </div>
                """, unsafe_allow_html=True)
                
                st.markdown(f"""
                <div style='background-color: #121212; padding: 20px; border-radius: 10px; border-left: 4px solid #FFD700;'>
                    {response_text}
                </div>
                """, unsafe_allow_html=True)
                
                # Performance metrics
                col1, col2 = st.columns(2)
                with col1:
                    st.metric("Response Time", f"{(end_time - start_time):.2f}s")
                with col2:
                    st.metric("Answer Confidence", "High" if (end_time - start_time) < 5 else "Medium")
                
                # Generate and play audio response
                with st.spinner("🎵 Creating audio response..."):
                    tts = gTTS(response_text)
                    tts_audio_path = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3").name
                    tts.save(tts_audio_path)
                    st.audio(tts_audio_path, format="audio/mp3")
                
                # Update statistics
                st.session_state.successful_responses += 1
                
                # Add to chat history
                st.session_state.chat_history.append({
                    "question": query,
                    "answer": response_text,
                    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
                })
                
            except Exception as e:
                st.error(f"❌ Something went wrong: {str(e)}")

# Enhanced chat history display
if st.session_state.chat_history:
    with st.expander("📜 Learning History", expanded=False):
        for idx, qa in enumerate(reversed(st.session_state.chat_history), 1):
            st.markdown(f"""
            <div class="chat-item">
                <p><strong>Question {idx}</strong> ({qa['timestamp']})</p>
                <p><em>{qa['question']}</em></p>
                <p>{qa['answer']}</p>
            </div>
            """, unsafe_allow_html=True)