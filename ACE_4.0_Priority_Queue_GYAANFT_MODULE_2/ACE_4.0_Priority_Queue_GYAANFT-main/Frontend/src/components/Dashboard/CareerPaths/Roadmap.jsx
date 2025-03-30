import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from "./Card";
import { Search, ChevronDown, ChevronUp, Play, CheckCircle, Clock, Lock } from 'lucide-react';

const MilestoneCard = ({ milestone, index, isCompleted, isOngoing, isLocked, shouldShow }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(milestone.videoProgress || 0);

  const getStatusColor = () => {
    if (isCompleted) return "bg-green-500";
    if (isOngoing) return "bg-blue-500";
    if (isLocked) return "bg-gray-400";
    return "bg-yellow-500";
  };


  const getStatusText = () => {
    if (isCompleted) return "Completed";
    if (isOngoing) return "In Progress";
    if (isLocked) return "Locked";
    return "Available";
  };

  return (
    <Card className={`transform transition-all duration-500 hover:scale-105 
      ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} 
      ${isLocked ? 'opacity-95' : ''}`}>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{milestone.milestone}</h3>
              {isLocked && <Lock size={16} className="text-gray-400" />}
            </div>
            <p className="text-sm text-gray-600">{milestone.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Video Progress Section */}
        {!isLocked && milestone.videoUrl && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Play size={16} className="text-blue-500" />
              <span className="text-sm font-medium">Course Video</span>
              <span className="text-xs text-gray-500">
                ({Math.round(videoProgress)}% completed)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 rounded-full h-2 transition-all duration-1000"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Basic Details */}
        <div className="space-y-2 overflow-y-auto max-h-[200px] pr-2 scrollbar-hide">
          {milestone.details.slice(0, isExpanded ? undefined : 2).map((detail, i) => (
            <p key={i} className="text-sm flex items-start gap-2">
              <span className="mt-1">
                {isCompleted ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Clock size={16} className="text-blue-500" />
                )}
              </span>
              {detail}
            </p>
          ))}
        </div>

        {/* Expandable Content */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mt-4 space-y-4 overflow-y-auto max-h-[300px] pr-2 scrollbar-hide">
            <div>
              <h4 className="font-medium mb-2">Resources:</h4>
              <div className="flex flex-wrap gap-2">
                {milestone.resources.map((resource, i) => (
                  <span key={i} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                    {resource}
                  </span>
                ))}
              </div>
            </div>
            
            {milestone.assignments && (
              <div>
                <h4 className="font-medium mb-2">Assignments:</h4>
                <ul className="space-y-2">
                  {milestone.assignments.map((assignment, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className={isCompleted ? "text-green-500" : "text-gray-300"} />
                      {assignment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp size={16} /></>
          ) : (
            <>Show More <ChevronDown size={16} /></>
          )}
        </button>
      </CardContent>
    </Card>
  );
};

const Roadmap = ({ path, title }) => {
  const totalMilestones = path.roadmap.length;
  const completedMilestones = 2;
  const upcomingMilestones = totalMilestones - completedMilestones;
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    setVisibleCards([]);
    path.roadmap.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 500);
    });
  }, [path]);

  const getImageNumber = (index) => {
    // Cycle through 1-9 based on index
    return (index % 9) + 1;
  };

  return (
    <div className="w-full max-w-6xl h-auto p-4 md:p-6 mx-auto">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
      `}</style>
      
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2" />

        {path.roadmap.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            
            <p className="text-gray-500">No milestones available.</p>
          </div>
        ) : (
          path.roadmap.map((milestone, index) => {
            const imageNumber = getImageNumber(index);
            const isCompleted = index < completedMilestones;
            const isOngoing = index === completedMilestones;
            const isLocked = index > completedMilestones + 1;
            const shouldShow = visibleCards.includes(index);

            return (
              <div key={milestone.milestone} className="relative mb-8">
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Milestone Card */}
                  <div className={`w-full md:w-5/12 p-4 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <MilestoneCard 
                      milestone={milestone}
                      index={index}
                      isCompleted={isCompleted}
                      isOngoing={isOngoing}
                      isLocked={isLocked}
                      shouldShow={shouldShow}
                    />
                  </div>

                  {/* Timeline Node */}
                  <div className="w-full md:w-2/12 flex justify-center my-4 md:my-0">
                    <div className={`w-4 h-4 rounded-full relative z-10 transition-all duration-500
                      ${shouldShow ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                      ${isCompleted ? 'bg-green-500' : 
                      isOngoing ? 'bg-blue-500' : 
                      isLocked ? 'bg-gray-400' : 'bg-yellow-500'}`} 
                    />
                  </div>

                  {/* Image Container */}
                  <div className={`w-5/12 p-4 hidden md:block ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    {(
                      <div className={`relative h-full flex justify-center items-center transform transition-all duration-500 delay-300 ${
                        shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                      }`}>
                        <img 
                          src={`/${imageNumber}.png`}  
                          alt={milestone.milestone} 
                          className="w-48 object-contain "
                        />
                        {milestone.imageCaption && (
                          <p className="mt-2 text-sm text-gray-600 text-center">
                            {milestone.imageCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Roadmap