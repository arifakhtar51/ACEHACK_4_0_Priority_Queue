import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, Sparkles, BookOpen, GraduationCap } from "lucide-react";

const CareerPathApp = () => {
  const [questions, setQuestions] = useState(["What are your key interests?"]);
  const [responses, setResponses] = useState([""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResponseChange = (value) => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = value;
    setResponses(updatedResponses);
  };

  const handleNextQuestion = async () => {
    if (!responses[currentIndex].trim()) {
      setError("Please fill in your response before proceeding.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (questions.length < 6) {
        const res = await axios.post("http://localhost:8001/career-assessment/answer/", {
          questionId: currentIndex + 1,
          answer: responses[currentIndex]
        });

        if (res.data.nextQuestion) {
          setQuestions([...questions, res.data.nextQuestion.question]);
          setResponses([...responses, ""]);
          setCurrentIndex(currentIndex + 1);
        }

        if (res.data.careers) {
          setCareerPath(res.data.careers[0]);
        }
      }

      if (questions.length === 6) {
        const careerRes = await axios.post("http://localhost:8001/career-assessment/answer/", {
          questionId: currentIndex + 1,
          answer: responses[currentIndex]
        });

        if (careerRes.data.careers) {
          setCareerPath(careerRes.data.careers[0]);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white rounded-3xl dark:bg-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#FFD700] dark:text-[#ADFF00] mr-2" />
            <h1 className="text-3xl font-bold text-black dark:text-white">Career Path Generator</h1>
          </div>
          <p className="dark:text-gray-400 text-gray-600">Discover your ideal career path through AI-powered guidance</p>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-3xl shadow-lg p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {careerPath ? (
              <motion.div
                key="career-path"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2 text-[#FFD700] dark:text-[#ADFF00]" />
                    {careerPath.title || "Your Career Path"}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-400">{careerPath.description || "AI-generated career guidance based on your responses."}</p>
                </div>

                {/* Career Milestones */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-black dark:text-gray-300 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-[#FFD700] dark:text-[#ADFF00]" />
                    Career Milestones
                  </h3>
                  {Array.isArray(careerPath.milestones) &&
                    careerPath.milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white rounded-lg p-6"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-700 mb-4">{milestone.description}</p>
                        <div className="text-sm text-gray-500 mb-4">Timeline: {milestone.timeframe || "Varies"}</div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-black dark:text-white">Question {currentIndex + 1} of 6</h2>
                  <p className="dark:text-gray-400 text-gray-700">{questions[currentIndex]}</p>
                </div>

                {/* Input Box */}
                <motion.textarea
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  value={responses[currentIndex]}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-4 bg-gray-50 text-gray-900 rounded-3xl border border-gray-200 focus:ring-2 focus:border-transparent transition-all resize-none"
                  placeholder="Type your response..."
                  rows={4}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Next Button */}
                <motion.button
                  key={`btn-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleNextQuestion}
                  disabled={loading}
                  className="w-full flex items-center justify-center text-black px-6 py-3 bg-[#FFD700] dark:bg-[#ADFF00] rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Next</span>
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerPathApp;
