import React from "react";
import { Play, CheckCircle, Circle } from "lucide-react";
import { useSelector } from "react-redux";

function Playlist({ playlist, playVideo, completedVideos }) {
  const currentVideo = useSelector((state) => state.user.url);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-3xl shadow-md w-full max-h-103 overflow-y-auto flex flex-col">
      {/* Playlist Header */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto pr-2 scrollbar-hide">
          {playlist && playlist.length > 0 ? (
            playlist.map((item, index) => {
              const videoId = new URL(item.url).searchParams.get("v");
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
              const isPlaying = item.url === currentVideo;
              const isCompleted = completedVideos.includes(item.url);
              const progress = isCompleted ? 100 : Math.floor(Math.random() * 80); // Simulated progress

              return (
                <div
                  key={index}
                  onClick={() => playVideo(item.url)}
                  className={`flex flex-col p-3 rounded-lg transition cursor-pointer
                    ${isPlaying ? "bg-blue-100 dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  {/* Video Row */}
                  <div className="flex items-center">
                    {/* Thumbnail */}
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail"
                      className="w-16 h-10 rounded-md mr-3"
                    />

                    {/* Video Info */}
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {item.title || `Lesson ${index + 1}`}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {videoId}
                      </span>
                    </div>

                    {/* Completion Status */}
                    <span className={`p-2 rounded-full transition-all 
                      ${isCompleted ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}
                    >
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-md mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#ADFF00] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 py-4">
              <Circle className="w-10 h-10 mb-2" />
              <p className="text-sm">No videos added yet.</p>
            </div>
          )}
        </div>

        {/* Fade Gradient at Bottom for Better UI */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-900 pointer-events-none" />
      </div>
    </div>
  );
}

export default Playlist;
