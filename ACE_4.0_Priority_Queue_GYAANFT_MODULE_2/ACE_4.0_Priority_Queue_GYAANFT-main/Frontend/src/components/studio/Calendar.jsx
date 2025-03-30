import React, { useState } from "react";
import { Calendar, X } from "lucide-react";

const CalendarComponent = ({ date, setDate }) => {
  const [notes, setNotes] = useState({});  // Store notes by date string
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [selectedDateForNote, setSelectedDateForNote] = useState(null);

  const handleCalendar = (selectedDate) => {
    setSelectedDateForNote(selectedDate);
    setDate(selectedDate);
    // If there's an existing note, load it
    const dateString = selectedDate.toDateString();
    if (notes[dateString]) {
      setCurrentNote(notes[dateString]);
    } else {
      setCurrentNote("");
    }
    setShowNoteModal(true);
  };

  const handleSaveNote = () => {
    if (selectedDateForNote && currentNote.trim()) {
      const dateString = selectedDateForNote.toDateString();
      setNotes(prev => ({
        ...prev,
        [dateString]: currentNote
      }));
    }
    setShowNoteModal(false);
  };

  const WidgetContainer = ({ title, icon, children }) => (
    <div className="w-68 right-0 bg-gray-200 dark:bg-gray-800 shadow-lg p-4 rounded-3xl z-50 border border-[#FFD700] dark:border-[#ADFF00]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">{title}</h2>
        {icon}
      </div>
      {children}
    </div>
  );

  // Function to check if a date has a note
  const hasNote = (dayNumber) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const checkDate = new Date(currentYear, currentMonth, dayNumber).toDateString();
    return notes[checkDate] ? true : false;
  };

  return (
    <div className="bg-gray-200 w-full h-full flex flex-col justify-center items-center dark:bg-gray-900 rounded-3xl p-6 transition-all hover:shadow-2xl 
      backdrop-blur-md bg-opacity-80 dark:bg-opacity-60 border border-gray-200 dark:border-gray-700">

      <h2 className="text-xl font-bold text-black dark:text-white mb-4 text-center">
        Mark your date
      </h2>

      <WidgetContainer title="Calendar" icon={<Calendar className="w-5s h-5 dark:text-white" />}>
        <div className="grid grid-cols-7 gap-1 w-full">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center font-bold dark:text-white">
              {day}
            </div>
          ))}
          {Array(31).fill(null).map((_, i) => (
            <div 
              key={i} 
              className="relative text-center p-2 hover:bg-[#FFD700] dark:hover:bg-[#ADFF00] rounded-full cursor-pointer transition-colors dark:text-white"
              onClick={() => handleCalendar(new Date(date.getFullYear(), date.getMonth(), i + 1))}
            >
              {i + 1}
              {hasNote(i + 1) && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </WidgetContainer>

      {/* Selected Date Display */}
      <p className="mt-4 text-center font-semibold text-gray-700 dark:text-gray-300">
        Selected Date: <span className="text-blue-500">{date.toDateString()}</span>
      </p>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl w-96 max-w-full border border-[#FFD700] dark:border-[#ADFF00]">
            <div className="flex justify-between items-center mb-4 ">
              <h3 className="text-lg font-semibold dark:text-white">
                Note for {selectedDateForNote?.toDateString()}
              </h3>
              <button 
                onClick={() => setShowNoteModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="w-full h-32 p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Write your note here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display existing note for selected date */}
      {/* {notes[date.toDateString()] && !showNoteModal && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2 dark:text-white">Note:</h3>
          <p className="text-gray-700 dark:text-gray-300">{notes[date.toDateString()]}</p>
        </div>
      )} */}
    </div>
  );
};

export default CalendarComponent;