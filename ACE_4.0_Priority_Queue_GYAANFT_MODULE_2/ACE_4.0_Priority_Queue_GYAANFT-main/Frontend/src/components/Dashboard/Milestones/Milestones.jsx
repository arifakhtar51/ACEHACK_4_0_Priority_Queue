import React, { useState } from "react";
import Milestone from "../../../assets/Milestone.json";
import { format, addDays, isBefore, isToday, isAfter } from "date-fns";
import {useDispatch} from 'react-redux'
import { setUrl } from "../../../store/userSlice";
import { setActiveItem } from "../../../store/navigationSlice";
import { motion } from 'framer-motion';

function Milestones() {
  const startDate = new Date(); // Today's Date
  const today = new Date(); // Current Date

  const dispatch = useDispatch();
  
  const [hoveredMilestone, setHoveredMilestone] = useState(null); // State to track hovered milestone

  const handleMilestoneClick = (url) => {
    console.log("url : ",url);
    
     dispatch(setUrl(url));
     dispatch(setActiveItem('studio'))
    //  navigate('/dashboard')
  }

  return (
    <div className="w-full h-full p-4 border bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg flex flex-col overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
        Software Developer Roadmap
      </h1>
      <div className="space-y-6 overflow-y-auto h-full scrollbar-hide">
        {Milestone.map((milestone, index) => {
          const milestoneDate = addDays(startDate, index * 7);

          let status = "";
          if (isBefore(milestoneDate, today)) {
            status = "Completed";
          } else if (isToday(milestoneDate)) {
            status = "Current";
          } else if (isAfter(milestoneDate, today)) {
            status = "Upcoming";
          }

          return (
            <motion.div 
              key={index} 
              className="flex items-center space-x-6 cursor-pointer"
              onClick={() => handleMilestoneClick(milestone.link)}
              initial={{ opacity: 0, y: 20 }} // Initial state for animation
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              transition={{ duration: 0.3, delay: index * 0.1 }} // Delay for staggered loading
            >
              {/* Date Card */}
              <div className="flex-shrink-0 text-center text-black dark:text-white w-24">
                <p className="text-lg font-bold">{format(milestoneDate, "dd")}</p>
                <p className="text-sm uppercase">{format(milestoneDate, "MMM yyyy")}</p>
              </div>

              {/* Milestone Details Banner */}
              <motion.div
                className={`flex-1 p-4 border-l-4 rounded-3xl shadow-sm transition-transform duration-300 ${
                  status === "Completed"
                    ? "border-green-600 bg-green-100"
                    : status === "Current"
                    ? "border-yellow-600 bg-yellow-100"
                    : "border-blue-600 bg-blue-100"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-xl font-semibold">{milestone.milestone}</h2>
                <p className="text-gray-700">{milestone.description}</p>
                <p className="font-bold text-sm mt-2">
                  {status === "Completed" && (
                    <span className="text-green-700">✔ Completed</span>
                  )}
                  {status === "Current" && (
                    <span className="text-yellow-700">⏳ Current Milestone</span>
                  )}
                  {status === "Upcoming" && (
                    <span className="text-blue-700">🔜 Upcoming</span>
                  )}
                </p>
              </motion.div>

              {/* Tooltip for extra details */}
              {hoveredMilestone === milestone && (
                <div className="absolute bg-gray-200 dark:bg-gray-800 text-white text-sm rounded-lg p-2 shadow-lg z-10">
                  <p>{milestone.extraDetails}</p> {/* Assuming extraDetails is a property in your milestone object */}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Milestones;
