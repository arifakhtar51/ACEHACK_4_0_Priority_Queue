import React, { useState, useEffect } from "react";
import Editor from "./Notion/Editor.jsx";
import { db, collection, addDoc, getDocs, updateDoc, doc } from "../../config/firebase.js";
import { Plus, FileText, Folder, FolderPlus, Edit, Save, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Notion = () => {
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [creatingFile, setCreatingFile] = useState(false);
  const [currData,setCurrData] = useState({
    time: Date.now(),
    blocks: [{ type: "header", data: { text: "Start typing here...", level: 2 } }],
    version: "2.11.10",
  })
  const [initialData, setInitialData] = useState({
    time: Date.now(),
    blocks: [{ type: "header", data: { text: "Start typing here...", level: 2 } }],
    version: "2.11.10",
  });

  /** 🔹 Fetch Notes from Firestore **/
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notionFiles"));
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  /** 🔹 Save Note to Firestore **/
  const saveNote = async (data) => {
    if (!selectedFile) {
      alert("Please create or select a file first.");
      return;
    }
    console.log(data);

    try {
      // Update the document in the "notionFiles" collection with the selected file ID
      const noteRef = doc(db, "notionFiles", selectedFileId);

      await updateDoc(noteRef, {
        data:data  // Update the 'data' field with the new content
      });

      console.log("Saved Note:", data);
      alert("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please try again.");
    }
  };

  /** 🔹 Create New Note File **/
  const createFile = async () => {
    if (!fileName.trim()) {
      alert("Please enter a valid file name.");
      return;
    }

    setCreatingFile(true);
    try {
      const docRef = await addDoc(collection(db, "notionFiles"), {
        fileName,
        data: initialData,
      });

      const newFile = { id: docRef.id, fileName, data: initialData };
      setNotes([...notes, newFile]);
      setSelectedFile(fileName);
      setSelectedFileId(docRef.id);
      setInitialData(initialData);
      setFileName("");
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Error creating file, please try again.");
    } finally {
      setCreatingFile(false);
    }
  };

  /** 🔹 Load a Note **/
  const handleNotionClick = (file) => {
    if (file.id === selectedFileId) return;
    setSelectedFile(file.fileName);
    setSelectedFileId(file.id);
    setInitialData(file.data);
  };

  const handleDeleteNotion = async(file) => {
    console.log("i am clicked");
    
    try{
      await deleteDoc(doc(db,'notionFiles',file.id));
      console.log(`deleted the file with ${file.id} id successfully`);

      const newNotes = notes.filter(note => note.id !== file.id)
      setNotes(newNotes)
      setSelectedFile('')
      setSelectedFileId('');
    }
    catch(err){
      console.log("Error in deleting the notion : ",err);
    }
  }

  return (
    <div className="w-full h-screen font-inter">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full bg-white dark:bg-gray-800 rounded-3xl p-4 md:p-6"
      >
        <div className="flex flex-col lg:flex-row h-full gap-4">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-80 flex flex-col bg-gray-200 dark:bg-gray-900 dark:text-white p-5 rounded-3xl shadow-lg"
          >
            <div className="mb-2 space-y-3">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2 mb-4"
              >
                <h2 className="text-xl font-bold text-black dark:text-white">My Notes</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="New note name..."
                  className="w-full p-3 bg-gray-100 dark:bg-[#364153] rounded-2xl shadow-sm focus:outline-none"
                />
                <button
                  onClick={createFile}
                  disabled={creatingFile}
                  className={`w-full mt-2 p-3 bg-[#FFD700] dark:bg-[#ADFF00] text-black rounded-2xl font-semibold flex items-center justify-center gap-2
                    ${creatingFile ? "cursor-not-allowed opacity-90" : "cursor-pointer active:scale-95 transition-transform"}`}
                >
                  {creatingFile ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Create New</>}
                </button>
              </motion.div>
            </div>

            {/* Notes List (Animated) */}
            <div className="flex-1 overflow-y-auto h-[calc(100vh-160px)] pr-2 scrollbar-hide">
              <h3 className="font-bold text-lg text-black dark:text-white mt-7 mb-3 flex items-center gap-2">
                <Folder className="w-5 h-5" /> Saved Files
              </h3>
              {notes.length === 0 ? (
                <div className="p-4 rounded-lg bg-black/10 text-center">
                  <FileText className="w-8 h-8 mb-2 text-black/50" />
                  <p className="text-black/60">No files created yet</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {notes.map((note) => (
                    <motion.li
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group p-3 cursor-pointer m-2 rounded-lg flex items-center gap-3 transition-all
                        ${selectedFileId === note.id ? "bg-black dark:bg-gray-950 shadow-lg text-[#FFD700] dark:text-[#ADFF00]" : "bg-white shadow-lg dark:bg-gray-800 "}`}
                      onClick={() => handleNotionClick(note)}
                    >
                      <FileText className={`w-5 h-5 ${selectedFileId === note.id ? "text-[#FFD700] dark:text-[#ADFF00]" : "text-black/60 dark:text-white/50"}`} />
                      <span className="truncate flex-1">{note.fileName}</span>
                      <Edit className="w-4 h-4 text-[#FFD700] dark:text-white/50" />
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Editor (Appears with Animation) */}
          <AnimatePresence>
            {selectedFile && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col gap-4 h-[60vh] lg:h-full"
              >
                <div className="bg-gray-200 dark:bg-gray-900 px-5 py-3 rounded-3xl flex items-center justify-between">
                  <h3 className="font-semibold text-black dark:text-white">{selectedFile}</h3>
                  
                </div>
                <Editor initialData={initialData} onSave={saveNote} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Notion;
