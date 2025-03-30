import { useState, useEffect } from "react";
import { 
  Calculator,
  Timer,
  Calendar,
  Settings,
  Plus,
  Minus,
  Divide,
  RefreshCw,
  Circle,
  X,
  Minimize,
  Maximize
} from "lucide-react";

const BottomNav = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      }).catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="p-2 bg-[#50A8FF] dark:text-white dark:bg-gray-900 rounded-full shadow-lg flex items-center gap-2">
        <NavButton onClick={() => handleToolClick('calculator')}>
          <Calculator className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={() => handleToolClick('timer')}>
          <Timer className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={() => handleToolClick('calendar')}>
          <Calendar className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={() => handleToolClick('meditation')}>
          <Circle className="w-5 h-5 text-black dark:text-white" />
        </NavButton>
        <NavButton onClick={toggleFullScreen}>
          {isFullScreen ? (
            <Minimize className="w-5 h-5 text-black dark:text-white" />
          ) : (
            <Maximize className="w-5 h-5 text-black dark:text-white" />
          )}
        </NavButton>
      </div>

      {activeTool === 'calculator' && <CalculatorWidget />}
      {activeTool === 'timer' && <TimerWidget />}
      {activeTool === 'calendar' && <CalendarWidget />}
      {activeTool === 'settings' && <SettingsWidget />}
      {activeTool === 'meditation' && <MeditationWidget />}
    </div>
  );
};

const NavButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="p-3 rounded-full hover:bg-white dark:hover:bg-[#ADFF00] transition-colors"
  >
    {children}
  </button>
);

const WidgetContainer = ({ title, icon, children }) => (
  <div className="fixed bottom-20 w-68 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-3xl z-50 border border-[#FFD700] dark:border-[#ADFF00]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      {icon}
    </div>
    {children}
  </div>
);

const CalculatorWidget = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  const [isScientific, setIsScientific] = useState(false);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num.toString() : display + num);
    }
  };

  const handleOperation = (op) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  const handleScientificOperation = (operation) => {
    const number = parseFloat(display);
    let result;

    switch (operation) {
      case 'sin':
        result = Math.sin(number * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(number * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(number * Math.PI / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(number);
        break;
      case 'log':
        result = Math.log10(number);
        break;
      case 'ln':
        result = Math.log(number);
        break;
      case 'pow2':
        result = Math.pow(number, 2);
        break;
      case 'exp':
        result = Math.exp(number);
        break;
      default:
        return;
    }
    
    setDisplay(result.toString());
    setNewNumber(true);
  };

  const handleEqual = () => {
    const secondNumber = parseFloat(display);
    let result;

    switch (operation) {
      case '+': result = firstNumber + secondNumber; break;
      case '-': result = firstNumber - secondNumber; break;
      case '*': result = firstNumber * secondNumber; break;
      case '/': result = firstNumber / secondNumber; break;
      case 'pow': result = Math.pow(firstNumber, secondNumber); break;
      default: return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const scientificButtons = [
    { label: 'sin', action: () => handleScientificOperation('sin') },
    { label: 'cos', action: () => handleScientificOperation('cos') },
    { label: 'tan', action: () => handleScientificOperation('tan') },
    { label: '√', action: () => handleScientificOperation('sqrt') },
    { label: 'log', action: () => handleScientificOperation('log') },
    { label: 'ln', action: () => handleScientificOperation('ln') },
    { label: 'x²', action: () => handleScientificOperation('pow2') },
    { label: 'exp', action: () => handleScientificOperation('exp') },
  ];

  return (
    <WidgetContainer title="Calculator" >
      <div className="bg-gray-200 dark:bg-gray-900 p-3 rounded-2xl mb-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setIsScientific(!isScientific)}
            className="text-sm bg-[#FFD700] dark:bg-[#ADFF00] px-2 py-1 rounded-md"
          >
            {isScientific ? 'Basic' : 'Scientific'}
          </button>
          <span className="text-2xl font-bold dark:text-white">{display}</span>
        </div>
      </div>
      
      {isScientific && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {scientificButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover-bg-[#FFD700] dark:hover:bg-[#ADFF00] transition-colors text-black dark:text-white text-sm font-medium"
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={handleClear}
          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-bold"
        >
          C
        </button>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num)}
            className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-[#FFD700] dark:hover:bg-[#ADFF00] transition-colors text-black dark:text-white font-bold"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('+')} className="p-3 bg-[#FFD700] dark:bg-[#ADFF00] rounded-full">
          <Plus className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleOperation('-')} className="p-3 bg-[#FFD700] dark:bg-[#ADFF00] rounded-full">
          <Minus className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleOperation('*')} className="p-3 bg-[#FFD700] dark:bg-[#ADFF00] rounded-full">
          <X className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleOperation('/')} className="p-3 bg-[#FFD700] dark:bg-[#ADFF00] rounded-full">
          <Divide className="w-4 h-4 mx-auto" />
        </button>
        <button onClick={() => handleEqual()} className="p-3 cursor-pointer bg-[#FFD700] dark:bg-[#ADFF00] rounded-full">
          =
        </button>
      </div>
    </WidgetContainer>
  );
};

const MeditationWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [breathPhase, setBreathPhase] = useState('in');
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);

  // Initialize Audio Context
  useEffect(() => {
    if (isPlaying) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      return () => context.close();
    }
  }, [isPlaying]);

  // Handle sound generation
  const startSound = () => {
    if (audioContext) {
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      osc.frequency.setValueAtTime(800, audioContext.currentTime);
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set initial volume
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      osc.start();
      setOscillator(osc);
    }
  };

  const stopSound = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
  };

  // Handle meditation timer
  useEffect(() => {
    let timer;
    let breathTimer;

    if (isPlaying && timeLeft > 0) {
      // Main timer
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      // Breath phase timer
      breathTimer = setInterval(() => {
        setBreathPhase(prev => prev === 'in' ? 'out' : 'in');
      }, 4000); // 4 seconds per breath phase

      startSound();
    } else if (timeLeft === 0 || !isPlaying) {
      stopSound();
    }

    return () => {
      clearInterval(timer);
      clearInterval(breathTimer);
      if (oscillator) {
        stopSound();
      }
    };
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (!isPlaying && timeLeft === 0) {
      setTimeLeft(120); // Reset time when starting
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setTimeLeft(120); // Reset time when stopping
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <WidgetContainer title="Meditation">
      <div className="flex flex-col items-center justify-center p-6">
        {/* Expanding and contracting breathing animation */}
        <div className="relative mb-6">
          <div 
            className={`w-32 h-32 rounded-full bg-gray-100 absolute 
              ${breathPhase === 'out' ? 'animate-[ping_4s_ease-in-out_infinite]' : 'animate-[ping_4s_ease-in-out_infinite]'}`}
          />
          <div 
            className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center 
              transition-transform duration-1000 transform
              ${breathPhase === 'in' ? 'scale-100' : 'scale-90'}`}
          >
            <span className="text-black text-xl font-medium">
              Breathe
            </span>
          </div>
        </div>

        {/* Timer */}
        <div className="text-black dark:text-white text-2xl font-bold mb-4">
          {formatTime(timeLeft)}
        </div>

        {/* Start/Pause Button */}
        <button
          onClick={togglePlay}
          className="px-6 py-2 bg-[#FFD700] dark:bg-[#ADFF00] rounded-full text-black font-medium transition-colors"
        >
          {isPlaying ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}
        </button>

        {/* Stop Button */}
        
      </div>
    </WidgetContainer>
  );
};

const TimerWidget = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const presets = [
    { label: '1m', seconds: 60 },
    { label: '5m', seconds: 300 },
    { label: '10m', seconds: 600 },
    { label: '15m', seconds: 900 },
    { label: '30m', seconds: 1800 },
  ];

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const playAlarm = () => {
    // Create and play a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
  };

  const handlePresetClick = (seconds) => {
    setTimeLeft(seconds);
    setSelectedPreset(seconds);
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(selectedPreset || 0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <WidgetContainer title="Timer" icon={<Timer className="w-5 h-5 dark:text-white" />}>
      <div className="text-4xl font-mono text-center mb-4 dark:text-white">
        {formatTime(timeLeft)}
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset.seconds)}
            className={`p-2 rounded-full font-medium text-sm transition-colors ${
              selectedPreset === preset.seconds
                ? 'bg-[#FFD700] dark:bg-[#ADFF00]'
                : 'bg-white dark:bg-gray-900 dark:text-white hover:bg-[#FFD700] dark:hover:bg-[#ADFF00]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={timeLeft === 0}
          className={`flex-1 p-3 rounded-full ${
            isRunning 
              ? 'bg-red-500 text-white' 
              : timeLeft === 0 
                ? 'bg-gray-300 dark:bg-gray-700' 
                : 'bg-[#FFD700] dark:bg-[#ADFF00]'
          } font-bold transition-colors`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          disabled={!selectedPreset}
          className={`p-3 rounded-full transition-colors ${
            selectedPreset 
              ? 'bg-white dark:bg-gray-900 hover:bg-[#ADFF00]' 
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          <RefreshCw className="w-4 h-4 dark:text-white" />
        </button>
      </div>
    </WidgetContainer>
  );
};

const CalendarWidget = () => {
  return (
    <WidgetContainer title="Calendar" icon={<Calendar className="w-5 h-5 dark:text-white" />}>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-center font-bold dark:text-white">
            {day}
          </div>
        ))}
        {Array(31).fill(null).map((_, i) => (
          <div key={i} className="text-center p-2 hover:bg-[#ADFF00] rounded-full cursor-pointer transition-colors dark:text-white">
            {i + 1}
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

const SettingsWidget = () => {
  return (
    <WidgetContainer title="Settings" icon={<Settings className="w-5 h-5 dark:text-white" />}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="dark:text-white">Dark Mode</span>
          <button className="w-12 h-6 bg-white dark:bg-gray-900 rounded-full relative">
            <div className="w-4 h-4 bg-[#ADFF00] rounded-full absolute left-1 top-1" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="dark:text-white">Notifications</span>
          <button className="w-12 h-6 bg-[#ADFF00] rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
          </button>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default BottomNav;