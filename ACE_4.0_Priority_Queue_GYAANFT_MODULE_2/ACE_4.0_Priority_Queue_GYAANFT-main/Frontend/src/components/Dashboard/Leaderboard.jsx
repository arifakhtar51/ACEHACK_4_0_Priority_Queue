import React, { useEffect, useState } from 'react';
import leaderboardIcon from '../../../../public/stocks.png'

const Leaderboard = () => {
  const [animate, setAnimate] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const leaderboardData = [
    { id: 1, name: 'Ajay Bansal', points: 1200 },
    { id: 2, name: 'Shreyan Sharma', points: 1100 },
    { id: 3, name: 'Karan Chowdhary', points: 950 },
    { id: 4, name: 'Stanzin Odzer', points: 800 },
    { id: 5, name: 'Amisha Bhardwaj', points: 750 },
  ];

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 rounded-3xl shadow-lg p-6 mb-6 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4"
        style={{
          animation: animate ? 'fadeIn 0.5s ease-out forwards' : 'none',
          opacity: 0,
        }}>
        <div className='flex gap-2'>
          <img src={leaderboardIcon} alt="" className='w-10 h-10' />
          Leaderboard
        </div>

      </h2>
      <div className="space-y-4">
        {leaderboardData.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 
              rounded-2xl p-3 transition-all duration-300 hover:shadow-md relative overflow-hidden"
            style={{
              animation: animate ? `slideIn 0.5s ease-out ${index * 0.1}s forwards` : 'none',
              opacity: 0,
              transform: hoveredId === user.id ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={() => setHoveredId(user.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Animated highlight effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              style={{
                animation: hoveredId === user.id ? 'shimmer 1.5s infinite' : 'none',
              }}
            />

            {/* Position indicator and name */}
            <div className="flex items-center gap-3">
              <span
                className="dark:text-[#ADFF00] text-[#FFD700] font-bold w-6"
                style={{
                  animation: animate ? `bounceIn 0.5s ease-out ${index * 0.1 + 0.3}s forwards` : 'none',
                  opacity: 0,
                }}
              >
                #{index + 1}
              </span>
              <span className="text-gray-800 dark:text-white">{user.name}</span>
            </div>

            {/* Points */}
            <span
              className="dark:text-[#ADFF00] text-[#FFD700] font-semibold ml-4"
              style={{
                animation: animate ? `slideUp 0.5s ease-out ${index * 0.1 + 0.3}s forwards` : 'none',
                opacity: 0,
              }}
            >
              {user.points} pts
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(2rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
          80% {
            opacity: 1;
            transform: scale(0.89);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;