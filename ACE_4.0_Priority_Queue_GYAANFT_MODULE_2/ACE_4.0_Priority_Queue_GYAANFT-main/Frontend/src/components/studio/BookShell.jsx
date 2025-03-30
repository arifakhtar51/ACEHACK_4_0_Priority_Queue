import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Maximize2, Minimize2, X } from 'lucide-react';

const PDFViewer = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isFrameMaximized, setIsFrameMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const fileInputRef = useRef(null);
  const frameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0 });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const newPdf = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file)
      };
      setPdfs([...pdfs, newPdf]);
    }
  };

  const handlePdfSelect = (pdf) => {
    setSelectedPdf(pdf);
    setIsFrameMaximized(false);
  };

  const handleFrameClose = () => {
    setSelectedPdf(null);
  };

  const toggleFrameSize = () => {
    setIsFrameMaximized(!isFrameMaximized);
  };

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('drag-handle')) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleResizeMouseDown = (e) => {
    isResizingRef.current = true;
    resizeStartRef.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    };
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      setPosition({ x: newX, y: newY });
    }
    
    if (isResizingRef.current) {
      const deltaWidth = e.clientX - resizeStartRef.current.x;
      const deltaHeight = e.clientY - resizeStartRef.current.y;
      setSize({
        width: Math.max(300, resizeStartRef.current.width + deltaWidth),
        height: Math.max(200, resizeStartRef.current.height + deltaHeight)
      });
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    isResizingRef.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className='text-xl pl-2 dark:text-white font-bold'>Bookshell</h1>
      <div className="mb-6">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </div>

      <div className="bg-gray-100 dark:bg-[#2B3646] rounded-2xl border border-white p-4">
        <div>
          {pdfs.length === 0 ? (
            <p className="text-gray-500">No PDFs uploaded yet</p>
            
          ) : (
            <ul className="space-y-2">
              {pdfs.map((pdf) => (
                <li key={pdf.id}>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer dark:text-white rounded text-left"
                    onClick={() => handlePdfSelect(pdf)}
                  >
                    <FileText size={16} />
                    {pdf.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button 
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] dark:bg-[#ADFF00] text-black rounded-xl mt-3"
        >
          <Upload size={16} />
          Upload PDF
        </button>

      {selectedPdf && (
        <div
          ref={frameRef}
          className="fixed bg-white dark:bg-[#2B3646] rounded-lg shadow-lg overflow-hidden border"
          style={{
            left: isFrameMaximized ? 0 : position.x,
            top: isFrameMaximized ? 0 : position.y,
            width: isFrameMaximized ? '100%' : size.width,
            height: isFrameMaximized ? '100%' : size.height,
            zIndex: 50
          }}
        >
          <div 
            className="drag-handle bg-gray-100 p-2 cursor-move flex justify-between items-center border-b"
            onMouseDown={handleMouseDown}
          >
            <span className="font-medium">{selectedPdf.name}</span>
            <div className="flex gap-2">
              <button
                className="p-1 hover:bg-gray-200 rounded"
                onClick={toggleFrameSize}
              >
                {isFrameMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                className="p-1 hover:bg-gray-200 rounded"
                onClick={handleFrameClose}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <iframe
            src={selectedPdf.url}
            className="w-full h-full"
            style={{ height: 'calc(100% - 40px)' }}
            title={selectedPdf.name}
          />
          
          {!isFrameMaximized && (
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={handleResizeMouseDown}
              style={{
                background: 'linear-gradient(135deg, transparent 50%, #666 50%)'
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;