import { useState, useEffect } from "react";
import { Calculator, Plus, Minus, X, Divide, Delete, RotateCcw, Superscript } from "lucide-react";
import { WidgetContainer } from "@/components/ui/widget-container";

const CalculatorWidget = () => {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  // Handle number input
  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num.toString() : display + num);
    }
  };

  // Handle operations
  const handleOperation = (op) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  // Handle Equals
  const handleEqual = () => {
    const secondNumber = parseFloat(display);
    if (firstNumber === null || isNaN(secondNumber)) return;

    let result;
    switch (operation) {
      case "+": result = firstNumber + secondNumber; break;
      case "-": result = firstNumber - secondNumber; break;
      case "*": result = firstNumber * secondNumber; break;
      case "/": result = secondNumber !== 0 ? firstNumber / secondNumber : "Error"; break;
      case "^": result = Math.pow(firstNumber, secondNumber); break;
      default: return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  // Handle Scientific Functions
  const handleScientific = (func) => {
    let num = parseFloat(display);
    let result;
    switch (func) {
      case "sin": result = Math.sin(num); break;
      case "cos": result = Math.cos(num); break;
      case "tan": result = Math.tan(num); break;
      case "sqrt": result = Math.sqrt(num); break;
      case "log": result = Math.log10(num); break;
      default: return;
    }
    setDisplay(result.toString());
  };

  // Handle Clear & Delete
  const handleClear = () => setDisplay("0");
  const handleDelete = () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0");

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (!isNaN(key)) handleNumber(key);
      else if (["+", "-", "*", "/", "^"].includes(key)) handleOperation(key);
      else if (key === "Enter") handleEqual();
      else if (key === "Backspace") handleDelete();
      else if (key === "Escape") handleClear();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display, firstNumber, operation]);

  return (
    <WidgetContainer title="Scientific Calculator" icon={<Calculator className="w-5 h-5 dark:text-white" />}>
      <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl mb-4 text-right">
        <span className="text-2xl font-bold dark:text-white">{display}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {["sin", "cos", "tan", "sqrt", "log"].map((func) => (
          <button key={func} onClick={() => handleScientific(func)} className="p-3 bg-gray-700 text-white rounded-full hover:bg-[#ADFF00] transition">
            {func}
          </button>
        ))}
        
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button key={num} onClick={() => handleNumber(num)} className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-[#ADFF00] transition text-black dark:text-white font-bold">
            {num}
          </button>
        ))}
        
        <button onClick={() => handleOperation("+")} className="p-3 bg-[#ADFF00] rounded-full"><Plus className="w-4 h-4 mx-auto" /></button>
        <button onClick={() => handleOperation("-")} className="p-3 bg-[#ADFF00] rounded-full"><Minus className="w-4 h-4 mx-auto" /></button>
        <button onClick={() => handleOperation("*")} className="p-3 bg-[#ADFF00] rounded-full"><X className="w-4 h-4 mx-auto" /></button>
        <button onClick={() => handleOperation("/")} className="p-3 bg-[#ADFF00] rounded-full"><Divide className="w-4 h-4 mx-auto" /></button>
        <button onClick={() => handleOperation("^")} className="p-3 bg-[#ADFF00] rounded-full"><Superscript className="w-4 h-4 mx-auto" /></button>

        <button onClick={handleEqual} className="p-3 bg-[#ADFF00] rounded-full col-span-2 font-bold">=</button>
        <button onClick={handleClear} className="p-3 bg-red-500 rounded-full"><RotateCcw className="w-4 h-4 mx-auto text-white" /></button>
        <button onClick={handleDelete} className="p-3 bg-gray-500 rounded-full"><Delete className="w-4 h-4 mx-auto text-white" /></button>
      </div>
    </WidgetContainer>
  );
};

export default CalculatorWidget;
