import React, { useState, useRef, useEffect } from 'react';

export function NFTCard({ nft }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Using refs to prevent unnecessary re-renders
  const cardRef = useRef(null);
  
  // Handle purchase button click
  const handlePurchase = () => {
    alert(`Thank you for supporting blood donation initiatives! Your purchase of "${nft.name}" for ${nft.price} is being processed.`);
  };
  
  // Handle like button click
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  // Handle card click to show modal
  const handleCardClick = () => {
    setIsModalOpen(true);
  };
  
  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (isModalOpen && cardRef.current && !cardRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  
  return (
    <>
      <div 
        ref={cardRef}
        className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img 
            src={nft.image} 
            alt={nft.name} 
            className={`w-full h-72 object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70"></div>
          
          {nft.isVerified && (
            <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/70 text-red-200 backdrop-blur-sm shadow-lg">
              <svg className="w-3 h-3 mr-1 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
          
          {/* Badge showing the category */}
          <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/70 text-white backdrop-blur-sm">
            {nft.category}
          </span>
          
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white drop-shadow-md">{nft.name}</h3>
              <div className="bg-slate-800/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg border border-slate-700/50">
                <div className="flex items-center">
                  {/* Blood drop icon instead of diamond */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2.5C10 2.5 5 8 5 12C5 16 7.5 18.5 10 18.5C12.5 18.5 15 16 15 12C15 8 10 2.5 10 2.5Z" />
                  </svg>
                  <span className="text-sm font-semibold text-white">{nft.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center overflow-hidden mr-2">
              <img 
                src={`https://avatars.dicebear.com/api/identicon/${nft.creator}.svg`} 
                alt={nft.creator} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-slate-400">By <span className="text-red-300 hover:text-red-200 cursor-pointer">{nft.creator}</span></p>
          </div>
          
          <p className="mt-2 text-sm text-slate-300 line-clamp-2 mb-4">{nft.description}</p>
          
          <div className="flex justify-between items-center">
            <button 
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-red-500/30"
              onClick={(e) => {
                e.stopPropagation();
                handlePurchase();
              }}
            >
              Support Now
            </button>
            <div className="flex items-center space-x-1">
              <button 
                className={`p-2 rounded-full hover:bg-slate-700/50 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
                onClick={handleLike}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700/50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Sharing ${nft.name} to support blood donation initiatives!`);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for NFT Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-slate-800 rounded-xl overflow-hidden max-w-3xl w-full max-h-90vh flex flex-col md:flex-row animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* NFT Image */}
            <div className="md:w-1/2 relative">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="w-full h-full object-cover" 
              />
              {nft.isVerified && (
                <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/70 text-red-200 backdrop-blur-sm shadow-lg">
                  <svg className="w-3 h-3 mr-1 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812a3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            
            {/* NFT Details */}
            <div className="md:w-1/2 p-6 overflow-auto">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{nft.name}</h2>
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/50 text-red-200 mr-2">
                      {nft.category}
                    </span>
                    <span className="text-slate-400 text-sm">
                      ID: #{nft.id}
                    </span>
                  </div>
                </div>
                <button 
                  className="text-slate-400 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center overflow-hidden mr-3">
                  <img 
                    src={`https://avatars.dicebear.com/api/identicon/${nft.creator}.svg`} 
                    alt={nft.creator} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">Created by</p>
                  <p className="text-red-300 hover:text-red-200 cursor-pointer">{nft.creator}</p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-white font-medium mb-2">Description</h3>
                <p className="text-slate-300 text-sm">{nft.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-medium mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Blood Type</p>
                    <p className="text-white font-medium">{nft.bloodType || "Universal"}</p>
                  </div>
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Donation Date</p>
                    <p className="text-white font-medium">{nft.donationDate || "N/A"}</p>
                  </div>
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Hospital</p>
                    <p className="text-white font-medium">{nft.hospital || "Community Blood Bank"}</p>
                  </div>
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Collection Location</p>
                    <p className="text-white font-medium">{nft.location || "Global"}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-medium">Current Price</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2.5C10 2.5 5 8 5 12C5 16 7.5 18.5 10 18.5C12.5 18.5 15 16 15 12C15 8 10 2.5 10 2.5Z" />
                    </svg>
                    <span className="text-lg font-bold text-white">{nft.price}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-4">100% of proceeds go directly to blood donation initiatives worldwide.</p>
                <button 
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-red-500/30"
                  onClick={handlePurchase}
                >
                  Support This Initiative
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    className={`p-2 rounded-full hover:bg-slate-700 transition-colors flex items-center ${isLiked ? 'text-red-500 bg-slate-700' : 'text-slate-400'}`}
                    onClick={handleLike}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Favorite</span>
                  </button>
                  <button 
                    className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors flex items-center"
                    onClick={() => alert(`Sharing ${nft.name} to support blood donation initiatives!`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-red-300 text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Redirecting to blood donation initiatives page...");
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}