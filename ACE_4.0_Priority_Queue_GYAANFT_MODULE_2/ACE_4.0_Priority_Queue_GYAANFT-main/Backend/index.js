import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/career-path", async (req, res) => {
  const { questions, responses } = req.body;

  if (!questions || !responses || questions.length !== 6 || responses.length !== 6) {
    return res.status(400).json({ error: "Exactly 6 questions and responses are required." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Based on the following questions and responses, generate a detailed career path recommendation in JSON format. Include a title, description, and an array of milestones. Each milestone should have a title, description, timeframe, and relevant learning resources (including URLs to real courses, books, or tutorials).

Questions and Responses:
${questions.map((q, i) => `Q: ${q}\nA: ${responses[i]}`).join("\n\n")}

Response Format:
{
  "title": "Career Path Title",
  "description": "Detailed description of the career path",
  "milestones": [
    {
      "title": "Milestone Title",
      "description": "Detailed description of the milestone",
      "timeframe": "Expected duration or timeline",
      "resources": [
        {
          "title": "Resource Title",
          "url": "Resource URL",
          "type": "Course/Book/Tutorial/etc"
        }
      ]
    }
  ]
}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Validate JSON structure
    JSON.parse(text);

    res.json({ career_path: text });
  } catch (error) {
    console.error("Error generating career path:", error);
    res.status(500).json({ error: "Failed to generate career path. Please try again." });
  }
});

app.post("/next-question", async (req, res) => {
  const { questions, responses } = req.body;

  if (!questions || !responses || questions.length !== responses.length) {
    return res.status(400).json({ error: "Questions and responses should have equal length." });
  }

  if (questions.length >= 6) {
    return res.status(400).json({ error: "Maximum of 6 questions allowed." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Based on these previous questions and responses:
${questions.map((q, i) => `Q: ${q}\nA: ${responses[i]}`).join("\n\n")}

Generate the next career-focused question that will help understand the user's:
- Skills and experience
- Work preferences
- Learning style
- Career goals
- Values and motivations

Make the question specific and thought-provoking. Format it as a complete question (not fill-in-the-blank).`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const nextQuestion = response.text();

    const updatedQuestions = [...questions, nextQuestion];
    const updatedResponses = [...responses, ""];

    res.json({
      next_question: nextQuestion,
      questions: updatedQuestions,
      responses: updatedResponses
    });
  } catch (error) {
    console.error("Error generating next question:", error);
    res.status(500).json({ error: "Failed to generate next question. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
