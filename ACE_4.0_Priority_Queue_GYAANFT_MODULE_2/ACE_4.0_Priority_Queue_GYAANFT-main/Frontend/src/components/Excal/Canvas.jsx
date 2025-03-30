
import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const generator = rough.generator();

const Canvas = ({ canvasRef, ctx, color, setElements, elements, tool }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.height = window.innerHeight * 2;
      canvas.width = window.innerWidth * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.strokeStyle = color;
      context.lineWidth = 5;
      context.lineCap = "round";
      context.scale(2, 2);
      ctx.current = context;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    if (ctx.current) {
      ctx.current.strokeStyle = color;
    }
  }, [color]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          offsetX,
          offsetY,
          path: [{ x: offsetX, y: offsetY }],
          stroke: color,
          element: tool,
        },
      ]);
    } else {
      setElements((prevElements) => [
        ...prevElements,
        { offsetX, offsetY, stroke: color, element: tool },
      ]);
    }

    setIsDrawing(true);
  };

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    
    const roughCanvas = rough.canvas(canvasRef.current);
    
    if (elements.length > 0 && ctx.current) {
      ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    elements.forEach((ele) => {
      if (ele.element === "rect" && typeof ele.width === "number" && typeof ele.height === "number") {
        roughCanvas.draw(
          generator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth: 5,
          })
        );
      } else if (ele.element === "line" && typeof ele.width === "number" && typeof ele.height === "number") {
        roughCanvas.draw(
          generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth: 5,
          })
        );
      } else if (ele.element === "pencil" && ele.path) {
        const pathPoints = ele.path.map(point => [point.x, point.y]);
        roughCanvas.linearPath(pathPoints, {
          stroke: ele.stroke,
          roughness: 0,
          strokeWidth: 5,
        });
      }
    });
  }, [elements]);

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "rect" || tool === "line") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "pencil") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1 && ele.path
            ? { ...ele, path: [...ele.path, { x: offsetX, y: offsetY }] }
            : ele
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} className="bg-white dark:bg-gray-800 rounded-3xl" />
    </div>
  );
};

export default Canvas;