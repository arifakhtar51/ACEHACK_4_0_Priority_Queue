import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import { FaSave, FaUndo, FaExpand, FaCompress } from "react-icons/fa";
import { Spinner } from "./Spinner"; // You can use any spinner component or library

const EditableContent = ({ initialData, onSave }) => {
  const editorInstance = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const initEditor = async () => {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        data: initialData,
        placeholder: "Start typing here...",
        tools: {
          header: { class: Header, inlineToolbar: true },
          checklist: { class: Checklist, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          embed: { class: Embed, inlineToolbar: true },
          code: { class: Code, inlineToolbar: true },
          inlineCode: { class: InlineCode, inlineToolbar: true },
          linkTool: { class: LinkTool, inlineToolbar: true },
          image: { class: ImageTool, inlineToolbar: true },
        },
        onReady: () => {
          setIsEditorReady(true);
        },
      });
    };

    initEditor();

    return () => {
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, [initialData]);

  const handleSave = async () => {
    if (editorInstance.current) {
      setIsSaving(true);
      const data = await editorInstance.current.save();
      await onSave(data); // Pass the updated data back to the parent
      setIsSaving(false);
    }
  };

  const handleDiscard = async () => {
    if (editorInstance.current) {
      editorInstance.current.clear();
      editorInstance.current.render(initialData);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    const editorElement = document.getElementById("editorjs");
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      editorElement.requestFullscreen();
    }
  };

  if (!isEditorReady) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner /> {/* Replace with your spinner component */}
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-800 p-6 rounded-lg ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition flex items-center"
          >
            {isSaving ? <Spinner /> : <FaSave className="mr-2" />}
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleDiscard}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition flex items-center"
          >
            <FaUndo className="mr-2" />
            Discard Changes
          </button>
        </div>
        <button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition flex items-center"
        >
          {isFullscreen ? (
            <FaCompress className="mr-2" />
          ) : (
            <FaExpand className="mr-2" />
          )}
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>

      <div
        id="editorjs"
        className={`min-h-[300px] p-4 bg-black rounded-lg text-white ${
          isFullscreen ? "h-[calc(100vh-150px)]" : ""
        }`}
      ></div>
    </div>
  );
};

export default EditableContent;