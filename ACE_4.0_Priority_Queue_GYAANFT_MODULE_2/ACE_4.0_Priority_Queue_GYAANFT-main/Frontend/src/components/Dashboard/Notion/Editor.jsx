import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

const Editor = ({ initialData, onSave }) => {
  const editorInstance = useRef(null);

  console.log(initialData);

  useEffect(() => {
    const initEditor = async () => {
      const Header = (await import("@editorjs/header")).default;
      const Checklist = (await import("@editorjs/checklist")).default;
      const List = (await import("@editorjs/list")).default;

      // Destroy the existing editor if it already exists
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }

      // Create a new editor instance with the updated initialData
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        data: initialData,
        placeholder: "Start typing here...",
        tools: {
          header: { class: Header, inlineToolbar: true },
          checklist: { class: Checklist, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
        },
      });
    };

    // Initialize or re-initialize the editor whenever initialData changes
    if (initialData) {
      initEditor();
    }

    return () => {
      // Clean up the editor instance on component unmount
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, [initialData]);  // Re-run when initialData changes

  useEffect(() => {
    console.log("hello");

  }, [initialData])

  const handleSave = async () => {
    if (editorInstance.current) {
      const data = await editorInstance.current.save();
      console.log(data);

      onSave(data);
    }
  };

  const saveNote = async() => {
    if (editorInstance.current) {
      const data = await editorInstance.current.save();
      console.log(data);
      
      onSave(data);
    }
  }

  return (
    <div className="w-full h-full p-8 bg-gray-200 dark:bg-gray-900 rounded-3xl shadow-lg flex flex-col overflow-hidden">
      {/* Editor */}
      <div
        id="editorjs"
        className="flex-1 min-h-[300px]  rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 dark:text-white overflow-auto"
      ></div>

      {/* Save Button (Stays Inside the Box) */}
      <button onClick={() => saveNote(initialData)} className="px-4 mt-4 py-2 bg-[#FFD700] dark:bg-[#ADFF00] text-black rounded-full hover:bg-[#c0d32a]">
        Save
      </button>
      <div className="p-2 flex justify-end">
      </div>
    </div>
  );
};

export default Editor;