import React, { useState, useEffect } from 'react';
import { Timer, X, Play, PauseCircle, Coins, Maximize, Minimize } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
import { setNft } from '../../store/userSlice';

const FocusTimer = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  // const [coins, setCoins] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [sessionCount, setSessionCount] = useState(0);

  const dispatch = useDispatch();
  const coins = useSelector((state) => state.user.nft);

  const durations = [
    { minutes: 25, coins: 50 },
    { minutes: 45, coins: 100 },
    { minutes: 60, coins: 150 },
  ];

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleSessionComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDurationSelect = (minutes) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const handleSessionComplete = () => {
    const reward = durations.find(d => d.minutes === selectedDuration)?.coins || 0;
    dispatch(setCoins(prev => prev + reward));
    setSessionCount(prev => prev + 1);
    setIsRunning(false);
    playCompletionSound();
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(selectedDuration * 60);
    setIsRunning(false);
  };

  const playCompletionSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1XVWVudH2Oi5KQio2UmZaRiYF7eHyBhpCYn6elm5KMhX13eHqAipOZoqWopKCblY2FgHx9goeRmqOoq6mmo5yWj4iBfX6Dh5GZoqeoqqmmopuVj4h0SzQwNj9HT1daX2NmaGpra2tjW1FOSUVBPTo3NTM0NTg8QUZLUVVbX2VqcHV2gZB6j4vJ/v///+/08vnWz9XR1dPF0djk6P///////////////v///vz9/f7+/v7+/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+');
    audio.play();
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <div className={`transition-all duration-300 ${isFullscreen ? 'fixed inset-0 bg-black/95 flex items-center justify-center' : ''}`}>
      <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-900 rounded-lg  overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-bold dark:text-white">Focus Timer</h2>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-full"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl dark:text-white font-bold mb-4">{formatTime(timeLeft)}</div>
              <div className="w-full bg-black dark:bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#FFD700] dark:bg-[#ADFF00] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {durations.map(({ minutes, coins }) => (
                <button
                  key={minutes}
                  onClick={() => handleDurationSelect(minutes)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors
                    ${selectedDuration === minutes 
                      ? 'bg-[#FFD700] dark:bg-[#ADFF00] text-black' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  {minutes}m ({coins} coins)
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={toggleTimer}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-colors"
              >
                {isRunning ? (
                  <>
                    <PauseCircle className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 " />
                    Start
                  </>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-red-600 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
                Reset
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Sessions</div>
                <div className="text-xl font-bold">{sessionCount}</div>
              </div>
              <div className="text-center flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Coins Earned</div>
                  <div className="text-xl font-bold">{coins}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;