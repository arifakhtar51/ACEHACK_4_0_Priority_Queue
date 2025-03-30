from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017/zingguru"
client = MongoClient(MONGO_URI)
db = client.zingguru

# Sample data for collections
sample_data = {
    "User": [
        {"username": "john_doe", "email": "john@example.com", "role": "student"},
        {"username": "jane_smith", "email": "jane@example.com", "role": "teacher"}
    ],
    "Playlist": [
        {
            "title": "Python Basics",
            "description": "Learn Python programming fundamentals",
            "videos": ["video1", "video2"]
        },
        {
            "title": "Web Development",
            "description": "Full stack web development course",
            "videos": ["video3", "video4"]
        }
    ],
    "Book": [
        {
            "title": "Python Programming",
            "author": "John Smith",
            "description": "Comprehensive guide to Python"
        },
        {
            "title": "Web Development Basics",
            "author": "Jane Doe",
            "description": "Learn web development from scratch"
        }
    ],
    "CareerPath": [
        {
            "title": "Full Stack Developer",
            "description": "Path to become a full stack developer",
            "skills": ["HTML", "CSS", "JavaScript", "Python", "Database"]
        },
        {
            "title": "Data Scientist",
            "description": "Path to become a data scientist",
            "skills": ["Python", "Statistics", "Machine Learning", "Data Analysis"]
        }
    ],
    "Question": [
        {
            "question": "What is Python?",
            "answer": "Python is a high-level programming language known for its simplicity and readability."
        },
        {
            "question": "What is HTML?",
            "answer": "HTML is the standard markup language for creating web pages."
        }
    ],
    "Other": [
        {
            "type": "resource",
            "title": "Useful Programming Tools",
            "content": "List of essential programming tools and resources"
        },
        {
            "type": "article",
            "title": "Career Guide",
            "content": "Guide to choosing the right programming career"
        }
    ]
}

def setup_collections():
    try:
        # Drop existing collections
        for collection_name in db.list_collection_names():
            db[collection_name].drop()
        
        # Create new collections and insert sample data
        for collection_name, data in sample_data.items():
            collection = db[collection_name]
            if data:
                collection.insert_many(data)
            print(f"Created collection: {collection_name} with {len(data)} documents")
        
        print("\nMongoDB collections setup completed successfully!")
        
        # Verify collections
        print("\nVerifying collections:")
        for collection_name in db.list_collection_names():
            count = db[collection_name].count_documents({})
            print(f"{collection_name}: {count} documents")
            
    except Exception as e:
        print(f"Error setting up MongoDB collections: {e}")

if __name__ == "__main__":
    setup_collections() 