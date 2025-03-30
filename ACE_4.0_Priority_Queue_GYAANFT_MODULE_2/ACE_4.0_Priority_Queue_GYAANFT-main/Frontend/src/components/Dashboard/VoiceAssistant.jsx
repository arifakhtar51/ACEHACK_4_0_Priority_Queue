import { useState, useEffect } from 'react';

const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setScale(s => s === 1 ? 1.2 : 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex flex-col items-center justify-center h-32 w-32">
      <div 
        className="relative w-20 h-20 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        {/* Main circle */}
        <div 
          className={`absolute inset-0 rounded-full bg-blue-500 transition-transform duration-1000 ease-in-out`}
          style={{ 
            transform: `scale(${scale})`,
            opacity: 0.8 
          }}
        />
        
        {/* Inner circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-20 h-20 rounded-full bg-blue-400 ${isActive ? 'animate-pulse' : ''}`} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full bg-blue-300 ${isActive ? 'animate-pulse' : ''}`} />
        </div>
        
        {/* Center circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-4 h-4 rounded-full bg-white ${isActive ? 'animate-pulse' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;