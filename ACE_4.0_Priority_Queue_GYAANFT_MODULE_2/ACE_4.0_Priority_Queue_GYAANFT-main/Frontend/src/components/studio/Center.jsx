import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import Playlist from "./Playlist";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser, setUrl, clearUrl } from '../../store/userSlice';

function Center({ playlist }) {
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) => state.user.url);

  const playVideo = (url) => {
    dispatch(setUrl(url));
  };

  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-900 rounded-xl overflow-hidden">
      {/* Video Player Section */}
      <div className="w-full p-6 flex-grow flex flex-col">
        {currentVideo ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <ReactPlayer
              url={currentVideo}
              width="100%"
              height="100%"
              controls
              playing
              config={{
                youtube: {
                  playerVars: { showinfo: 1 }
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full aspect-video rounded-xl bg-gradient-to-br bg-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4">
                <svg 
                  className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Select a video to start learning
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                Choose from the playlist below
              </p>
            </div>
          </div>
        )}

        {/* Playlist Section */}
        <div className="mt-6 flex-grow overflow-y-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Course Content
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {playlist.length} lessons
            </span>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-3rem)] pr-2 custom-scrollbar hide-scrollbar">
          <Playlist playlist={playlist} playVideo={playVideo} completedVideos={["https://youtube.com/watch?v=abc123"]} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Center;