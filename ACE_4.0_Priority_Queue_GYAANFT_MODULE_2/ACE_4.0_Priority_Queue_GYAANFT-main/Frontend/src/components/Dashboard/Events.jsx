import React from "react";
import { events } from '../../data/mockData';
import { Clock } from "lucide-react";
import eventIcon from '../../../public/7.png'

const Events = () => {

  // Define EventCard inside Events
  const EventCard = ({ type, description, time, date, icon: Icon }) => {
    return (
      <div className="transition-all transform hover:scale-105 hover:shadow-lg bg-white hover:dark:bg-gray-[#364153] dark:bg-gray-800 rounded-3xl p-4 cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Icon className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-black dark:text-white">{type}</div>
            <div className="text-sm text-gray-500">{description}</div>
            {time && (
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{time}</span>
              </div>
            )}
            <div className="text-xs text-gray-400 mt-1">{date}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-lg p-4 md:p-6 px-auto h-fit lg:h-[63%] max-w-2xl">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img src={eventIcon} alt="" className="w-10 h-10" />
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            My Events
          </h2>
        </div>

        <div className="hover:scale-110 transition-transform cursor-pointer">
          <Clock />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
