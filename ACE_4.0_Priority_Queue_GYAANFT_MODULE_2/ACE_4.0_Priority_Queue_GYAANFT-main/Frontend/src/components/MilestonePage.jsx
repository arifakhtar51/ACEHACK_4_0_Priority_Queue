import React from 'react';

const Leaderboard = () => {
  // Static leaderboard data
  const leaderboardData = [
    { id: 1, name: 'Alice Johnson', points: 1200 },
    { id: 2, name: 'Bob Smith', points: 1100 },
    { id: 3, name: 'Charlie Brown', points: 950 },
    { id: 4, name: 'Diana Prince', points: 800 },
    { id: 5, name: 'Evan Wright', points: 750 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Leaderboard</h2>
      <div className="space-y-4">
        {leaderboardData.map((user) => (
          <div key={user.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 hover:shadow-md transition-shadow">
            <span className="text-gray-800 dark:text-white">{user.name}</span>
            <span className="text-[#ADFF00] font-semibold">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MilestonePage = ({ milestones }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Leaderboard on the left */}
      <div className="lg:w-1/4">
        <Leaderboard />
      </div>

      {/* Milestones on the right */}
      <div className="lg:w-3/4 bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Milestones</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md p-4 transition-all hover:shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{milestone.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Due Date: {milestone.dueDate}</p>
              <button className="mt-4 bg-[#ADFF00] text-black rounded-2xl px-4 py-2 hover:bg-green-600 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default {MilestonePage, Leaderboard};