from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
from youtube_transcript_api._errors import TranscriptsDisabled, CouldNotRetrieveTranscript, NoTranscriptFound
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
API_KEY = "AIzaSyCxvh9h-otrM5BABmEkQW-f9RRYfVlVQ2U"
genai.configure(api_key=API_KEY)

# Initialize the model with the correct model name
model = genai.GenerativeModel("gemini-1.5-flash")

class VideoURL(BaseModel):
    url: str
    language: str = "en"  # Default to English

def extract_transcript_text(youtube_video_url, language="en"):
    try:
        video_id = youtube_video_url.split("=")[1]
        
        try:
            # First attempt: Get transcript in requested language
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[language])
        except (TranscriptsDisabled, NoTranscriptFound, CouldNotRetrieveTranscript):
            try:
                # Get list of available transcripts
                transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
                available_languages = [
                    t.language_code 
                    for t in transcript_list._manually_created_transcripts.values()
                ]
                available_languages.extend([
                    t.language_code 
                    for t in transcript_list._generated_transcripts.values()
                ])
                
                if not available_languages:
                    raise HTTPException(
                        status_code=400,
                        detail=f"No transcripts available for this video. Available languages: {', '.join(available_languages)}"
                    )
                
                # Try to get transcript in any available language
                transcript = transcript_list.find_transcript(available_languages)
                if transcript:
                    transcript = transcript.fetch()
                else:
                    raise HTTPException(
                        status_code=400,
                        detail=f"No transcript available. Try one of these languages: {', '.join(available_languages)}"
                    )
                    
            except Exception as e:
                raise HTTPException(
                    status_code=400,
                    detail=str(e)
                )
        
        formatter = TextFormatter()
        return formatter.format_transcript(transcript)

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid YouTube URL. Please provide a valid video URL."
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error processing video: {str(e)}"
        )

def generate_summary(transcript_text, target_language):
    prompt = f"""
    You are a YouTube video summarizer. You understand any language but gives output in 
    English only with proper emojis used in your answer
    You will be taking the transcript text and 
    summarizing the entire video, providing the important summary in points 
    with full explanation in more than 500 words. Format the response with proper line breaks between points and in markodown format. 
    
    If the transcript text is in any language other than english, 
    first translate it into english before summarizing.
    

    The transcript text will be appended here:
    """
    
    try:
        response = model.generate_content(prompt + transcript_text)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/summarize")
async def summarize_video(video: VideoURL):
    try:
        # Get the transcript
        transcript = extract_transcript_text(video.url, video.language)
        if not transcript:
            raise HTTPException(
                status_code=400,
                detail="Could not extract transcript from the video"
            )
        
        # Generate summary
        summary = generate_summary(transcript, video.language)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-questions")
async def generate_questions(video: VideoURL):
    try:
        # Get the transcript
        transcript = extract_transcript_text(video.url, video.language)
        if not transcript:
            raise HTTPException(
                status_code=400,
                detail="Could not extract transcript from the video"
            )
        
        # Updated prompt for better question generation
        prompt = f"""
        Based on the following video transcript, generate 5 thought-provoking questions and detailed answers.
        Make sure each question tests understanding of the key concepts from the video.
        
        Format your response exactly like this, with numbered Q&A pairs:
        Q1: [Clear, specific question about main concept]
        A1: [Detailed answer with evidence from the video]
        
        Q2: [Question that explores implications]
        A2: [Well-reasoned answer with examples]
        
        Continue this pattern for all 5 questions.
        Keep answers concise but informative.

        Here's the transcript to analyze:
        {transcript}
        """

        try:
            response = model.generate_content(prompt)
            return {"questions": response.text}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))