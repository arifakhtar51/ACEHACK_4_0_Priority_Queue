import React, { useState } from "react";
import EditorComponent from "./EditorComponent";
import Notions from "../../../assets/Notions.json";

// Notion List Component
const NotionList = () => {
  const [notions, setNotions] = useState(Notions);
  const [selectedNotionId, setSelectedNotionId] = useState(null);

  // Function to handle editing a notion
  const handleEditNotion = (updatedNotion) => {
    const updatedNotions = notions.map((notion) =>
      notion.id === updatedNotion.id ? updatedNotion : notion
    );
    setNotions(updatedNotions);
    setSelectedNotionId(null); // Hide editor after saving
  };

  // Function to create a new blank notion
  const handleCreateNewNotion = () => {
    const newNotion = {
      id: Date.now().toString(),
      type: "header",
      data: { text: "New Notion", level: 2 },
    };
    setNotions((prevNotions) => [...prevNotions, newNotion]);
    setSelectedNotionId(newNotion.id);
  };

  const handleSave = (data) => {
    // setNotes([...notes, data]);
    // console.log("Saved Note:", data); 
    // call api to send data in backend
  };

  return (
    <div className="w-full h-full p-4 bg-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Notions</h2>

      {/* List of Notions */}
      <div className="space-y-4 mb-6">
        {notions.map((notion) => (
          <div className="p-4 bg-black rounded-lg">
            {selectedNotionId === notion.id ? (
              // Show Editor if notion is selected
              <EditorComponent initialData={notion} onSave={handleSave} />
            ) : (
              // Show notion as clickable item
              <h3
                className="text-xl font-semibold cursor-pointer hover:bg-gray-700 p-2 rounded"
                onClick={() => setSelectedNotionId(notion.id)}
              >
                {notion.data?.text || "Untitled"}
              </h3>
            )}
          </div>
        ))}
      </div>

      {/* Button to Create a New Notion */}
      <button
        onClick={handleCreateNewNotion}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
      >
        Create New Notion
      </button>
    </div>
  );
};

export default NotionList;
