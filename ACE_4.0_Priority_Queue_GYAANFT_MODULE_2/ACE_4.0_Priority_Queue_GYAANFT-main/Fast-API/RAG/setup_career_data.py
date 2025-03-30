from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_default_database()

# Career Assessment Questions
career_assessment_data = [
    {
        "question_id": 1,
        "question": "What are your key interests?",
        "options": [
            "Technology and Innovation",
            "Healthcare and Medicine",
            "Business and Finance",
            "Arts and Design",
            "Education and Training",
            "Engineering and Construction",
            "Science and Research",
            "Social Services and Community"
        ]
    },
    {
        "question_id": 2,
        "question": "What are your preferred work environments?",
        "options": [
            "Office-based",
            "Remote work",
            "Outdoor work",
            "Laboratory",
            "Classroom",
            "Healthcare facility",
            "Construction site",
            "Creative studio"
        ]
    },
    {
        "question_id": 3,
        "question": "What are your key skills?",
        "options": [
            "Technical skills",
            "Communication skills",
            "Analytical skills",
            "Creative skills",
            "Leadership skills",
            "Problem-solving skills",
            "Research skills",
            "Teaching skills"
        ]
    },
    {
        "question_id": 4,
        "question": "What is your preferred work schedule?",
        "options": [
            "Regular 9-5",
            "Flexible hours",
            "Shift work",
            "Project-based",
            "Part-time",
            "Remote work",
            "Seasonal work",
            "Freelance"
        ]
    },
    {
        "question_id": 5,
        "question": "What is your desired salary range?",
        "options": [
            "Entry level",
            "Mid-level",
            "Senior level",
            "Executive level",
            "Freelance/Consulting",
            "Academic/Research",
            "Government/Public",
            "Non-profit"
        ]
    },
    {
        "question_id": 6,
        "question": "What is your preferred work-life balance?",
        "options": [
            "Traditional balance",
            "High flexibility",
            "Intensive work periods",
            "Seasonal work",
            "Remote work",
            "Part-time work",
            "Freelance work",
            "Academic schedule"
        ]
    }
]

# Career Paths Data
career_paths_data = [
    {
        "title": "Software Developer",
        "category": "Technology and Innovation",
        "description": "Design and develop software applications and systems",
        "skills": ["Programming", "Problem-solving", "Team collaboration"],
        "education": "Bachelor's in Computer Science or related field",
        "salary_range": "Mid-level to Senior level",
        "work_environment": "Office-based or Remote work",
        "work_schedule": "Regular 9-5 or Flexible hours"
    },
    {
        "title": "Data Scientist",
        "category": "Technology and Innovation",
        "description": "Analyze complex data sets to help organizations make better decisions",
        "skills": ["Data analysis", "Machine learning", "Statistical modeling"],
        "education": "Master's in Data Science or related field",
        "salary_range": "Mid-level to Senior level",
        "work_environment": "Office-based or Remote work",
        "work_schedule": "Regular 9-5 or Flexible hours"
    },
    {
        "title": "Healthcare Administrator",
        "category": "Healthcare and Medicine",
        "description": "Manage healthcare facilities and coordinate medical services",
        "skills": ["Leadership", "Healthcare management", "Communication"],
        "education": "Bachelor's in Healthcare Administration",
        "salary_range": "Mid-level to Senior level",
        "work_environment": "Healthcare facility",
        "work_schedule": "Regular 9-5"
    },
    {
        "title": "Financial Analyst",
        "category": "Business and Finance",
        "description": "Analyze financial data and provide investment recommendations",
        "skills": ["Financial analysis", "Data analysis", "Communication"],
        "education": "Bachelor's in Finance or related field",
        "salary_range": "Mid-level",
        "work_environment": "Office-based",
        "work_schedule": "Regular 9-5"
    },
    {
        "title": "Graphic Designer",
        "category": "Arts and Design",
        "description": "Create visual concepts and designs for various media",
        "skills": ["Design", "Creativity", "Technical skills"],
        "education": "Bachelor's in Graphic Design or related field",
        "salary_range": "Entry level to Mid-level",
        "work_environment": "Creative studio or Remote work",
        "work_schedule": "Flexible hours"
    },
    {
        "title": "Teacher",
        "category": "Education and Training",
        "description": "Educate students in various subjects and grade levels",
        "skills": ["Teaching", "Communication", "Patience"],
        "education": "Bachelor's in Education or related field",
        "salary_range": "Entry level to Mid-level",
        "work_environment": "Classroom",
        "work_schedule": "Academic schedule"
    },
    {
        "title": "Civil Engineer",
        "category": "Engineering and Construction",
        "description": "Design and oversee construction projects",
        "skills": ["Engineering", "Project management", "Technical skills"],
        "education": "Bachelor's in Civil Engineering",
        "salary_range": "Mid-level to Senior level",
        "work_environment": "Office-based and Construction site",
        "work_schedule": "Regular 9-5"
    },
    {
        "title": "Research Scientist",
        "category": "Science and Research",
        "description": "Conduct research in various scientific fields",
        "skills": ["Research", "Analytical skills", "Technical skills"],
        "education": "Ph.D. in relevant field",
        "salary_range": "Mid-level to Senior level",
        "work_environment": "Laboratory",
        "work_schedule": "Flexible hours"
    }
]

def setup_collections():
    try:
        # Drop existing collections
        db.CareerAssessment.drop()
        db.CareerPath.drop()
        
        # Insert new data
        db.CareerAssessment.insert_many(career_assessment_data)
        db.CareerPath.insert_many(career_paths_data)
        
        print("Successfully set up career assessment and career paths collections!")
        
    except Exception as e:
        print(f"Error setting up collections: {str(e)}")

if __name__ == "__main__":
    setup_collections() 