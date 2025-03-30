import React from 'react'
import Leaderboard from '../Leaderboard';
import NFTStore from '../NFTStore';

// const Leaderboard = () => {
//   // Static leaderboard data
//   const leaderboardData = [
//     { id: 1, name: 'Alice Johnson', points: 1200 },
//     { id: 2, name: 'Bob Smith', points: 1100 },
//     { id: 3, name: 'Charlie Brown', points: 950 },
//     { id: 4, name: 'Diana Prince', points: 800 },
//     { id: 5, name: 'Evan Wright', points: 750 },
//   ];

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 mb-6 overflow-hidden">
//       <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Leaderboard</h2>
//       <div className="space-y-4">
//         {leaderboardData.map((user) => (
//           <div key={user.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 hover:shadow-md transition-shadow">
//             <span className="text-gray-800 dark:text-white">{user.name}</span>
//             <span className="text-[#ADFF00] font-semibold">{user.points} pts</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Sidebar = () => {
  return (
    <div className=''>
      <Leaderboard/>
      <div className='max-h-64'>
      <NFTStore/>
      </div>
    </div>
  )
}

export default Sidebar
