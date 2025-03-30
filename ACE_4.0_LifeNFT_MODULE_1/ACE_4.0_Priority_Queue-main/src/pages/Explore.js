import React, { useState, useEffect } from 'react';
import { NFTCard } from '../components/NFTCard';

// Blood donation themed NFT data
const allNFTs = [
  {
    id: 1,
    name: "Blood Donation NFT #1",
    creator: "BloodBank",
    description: "A unique NFT representing a blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "2.0 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 2,
    name: "Blood Donation NFT #2",
    creator: "HealthOrg",
    description: "Commemorating the importance of blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "1.5 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 3,
    name: "Blood Donation NFT #3",
    creator: "Charity",
    description: "Supporting blood donation initiatives.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "3.0 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 4,
    name: "Blood Donation NFT #4",
    creator: "Community",
    description: "Recognizing community efforts in blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "2.5 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 5,
    name: "Blood Donation NFT #5",
    creator: "MedicalAlliance",
    description: "Honoring medical professionals involved in blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "3.5 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 6,
    name: "Community Drive Success #12",
    creator: "NeighborhoodHeroes",
    description: "Celebrating successful community blood drives that exceeded donation targets by over 200% and saved countless lives.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "1.8 ETH",
    isVerified: true,
    category: "Community"
  }
];

// Initial donation requests data
const initialRequests = [
  {
    id: 1,
    title: "Urgent A+ Blood Needed",
    content: "My father needs A+ blood for emergency surgery at City Hospital.",
    author: "Robert Chen",
    bloodGroup: "A+",
    date: "2025-03-09T14:30:00",
    location: "City Hospital",
    isUrgent: true
  },
  {
    id: 2,
    title: "Regular Donation Drive",
    content: "Monthly blood donation drive at Community Center. All blood types welcome.",
    author: "Blood Bank Association",
    bloodGroup: "All",
    date: "2025-03-15T10:00:00",
    location: "Community Center",
    isUrgent: false
  }
];

// Get unique categories
const categories = ["All", ...new Set(allNFTs.map(nft => nft.category))];

export function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("price-low-high");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("nfts"); // New state for tab selection

  // New states for "Create New Post" modal
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  
  // New states for user details
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [formErrors, setFormErrors] = useState({});
  
  // Location field for blood requests
  const [location, setLocation] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  
  // State for donation requests/posts
  const [donationRequests, setDonationRequests] = useState(initialRequests);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Simulated loading state - shorter for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle success alert timeout
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  // Filter and sort NFTs
  const filteredNFTs = allNFTs
    .filter(nft => 
      (selectedCategory === "All" || nft.category === selectedCategory) &&
      (nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       nft.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
       nft.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      
      if (sortOption === "price-low-high") {
        return priceA - priceB;
      } else if (sortOption === "price-high-low") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });
    
  // Filter donation requests
  const filteredRequests = donationRequests
    .filter(request => 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Validate user details form
  const validateUserForm = () => {
    const errors = {};
    
    if (!userName.trim()) errors.userName = "Name is required";
    if (!userEmail.trim()) {
      errors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.userEmail = "Email is invalid";
    }
    if (!bloodGroup) errors.bloodGroup = "Blood group is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle user details submission
  const handleUserDetailsSubmit = () => {
    if (validateUserForm()) {
      // Proceed to post creation after user details are collected
      setShowUserDetailsModal(false);
      setShowCreatePostModal(true);
    }
  };

  // Handle new post submission
  const handleSubmitPost = () => {
    if (!postTitle.trim()) {
      alert("Please enter a post title");
      return;
    }
    
    // Create new request object
    const newRequest = {
      id: donationRequests.length + 1,
      title: postTitle,
      content: postContent,
      author: userName,
      bloodGroup: bloodGroup,
      date: new Date().toISOString(),
      location: location,
      isUrgent: isUrgent,
      email: userEmail,
      phone: userPhone
    };
    
    // Add new request to the list
    setDonationRequests([newRequest, ...donationRequests]);
    
    // Reset form values
    setPostTitle("");
    setPostContent("");
    setLocation("");
    setIsUrgent(false);
    setShowCreatePostModal(false);
    
    // Show success notification
    setShowSuccessAlert(true);
    
    // Switch to requests tab to show the new post
    setActiveTab("requests");
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="w-10 h-10 absolute top-3 left-3 rounded-full border-4 border-t-transparent border-r-red-400 border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <div className="ml-4 text-xl font-semibold text-red-500">Loading Blood Donation Platform...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Post submitted successfully! Thank you for contributing to our blood donation community.</span>
        </div>
      )}
    
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Blood Donation Platform
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Support blood donation initiatives by collecting unique NFTs and connecting with donors and recipients in our community.
        </p>
      </div>

      {/* Create New Post Button */}
      <div className="sticky top-4 z-10 mb-8 flex justify-center">
        <button
          onClick={() => setShowUserDetailsModal(true)}
          className="py-3 px-6 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-medium text-lg shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 animate-pulse"
        >
          <span className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Blood Request
          </span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-slate-700">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'requests'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('requests')}
          >
            Blood Donation Requests
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'nfts'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('nfts')}
          >
            NFT Collection
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={activeTab === 'nfts' ? "Search NFTs or creators" : "Search blood requests"}
            className="w-full p-4 pl-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => setSearchTerm("")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle Button - Only show for NFTs tab */}
      {activeTab === 'nfts' && (
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-700/80 transition-all duration-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {showFilters ? "▲" : "▼"}
          </button>
        </div>
      )}

      {/* Filter and Sort - Only show for NFTs tab */}
      {activeTab === 'nfts' && showFilters && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-white">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-white">Sort & View</h3>
              <div className="flex flex-wrap gap-4">
                <select
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
                
                <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                  <button 
                    className={`px-3 py-2 flex items-center ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    className={`px-3 py-2 flex items-center ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      {activeTab === 'nfts' ? (
        <div className="mb-6 text-slate-400">
          Found {filteredNFTs.length} {filteredNFTs.length === 1 ? 'item' : 'items'}
          {selectedCategory !== "All" ? ` in ${selectedCategory}` : ''}
          {searchTerm ? ` matching "${searchTerm}"` : ''}
        </div>
      ) : (
        <div className="mb-6 text-slate-400">
          Found {filteredRequests.length} {filteredRequests.length === 1 ? 'blood request' : 'blood requests'}
          {searchTerm ? ` matching "${searchTerm}"` : ''}
        </div>
      )}

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'nfts' ? (
        /* NFT Gallery */
        filteredNFTs.length > 0 ? (
          <div className={viewMode === 'grid' ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
            "flex flex-col gap-6"
          }>
            {filteredNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 my-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-slate-400">No NFTs found</h3>
            <p className="text-slate-500 mt-2 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium rounded-lg transition-all shadow-lg"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )
      ) : (
        /* Blood Donation Requests List */
        <div className="space-y-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <div 
                key={request.id} 
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        {request.isUrgent && (
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mr-2 uppercase">
                            Urgent
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-white">{request.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400 mb-4">
                        Posted by <span className="text-white">{request.author}</span> on {formatDate(request.date)}
                      </p>
                    </div>
                    <div className="bg-slate-700 px-3 py-1 rounded text-white font-bold">
                      {request.bloodGroup}
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{request.content}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    {request.location && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {request.location}
                      </div>
                    )}
                    {request.phone && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {request.phone}
                      </div>
                    )}
                    {request.email && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {request.email}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-slate-700 px-6 py-4">
                  <div className="flex justify-end">
                    <button 
                      className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-2 px-4 rounded transition-all"
                      onClick={() => alert(`Contact initiated with ${request.author} for ${request.bloodGroup} blood donation.`)}
                    >
                      Contact Donor
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 my-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-slate-400">No blood donation requests found</h3>
              <p className="text-slate-500 mt-2 mb-6">Try adjusting your search criteria or create a new request</p>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium rounded-lg transition-all shadow-lg"
                onClick={() => setShowUserDetailsModal(true)}
              >
                Create Blood Request
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8">
        <button
          className="p-4 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-110"
          onClick={() => alert("Donate Blood Today! Click confirmed.")}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* User Details Modal */}
      {showUserDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white">Your Details</h2>
            <p className="text-slate-400 mb-6">Please provide your information to create a blood donation request.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className={`w-full p-3 bg-slate-700 border ${formErrors.userName ? 'border-red-500' : 'border-slate-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                />
                {formErrors.userName && <p className="mt-1 text-sm text-red-500">{formErrors.userName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className={`w-full p-3 bg-slate-700 border ${formErrors.userEmail ? 'border-red-500' : 'border-slate-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {formErrors.userEmail && <p className="mt-1 text-sm text-red-500">{formErrors.userEmail}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Blood Group</label>
                <select 
                  className={`w-full p-3 bg-slate-700 border ${formErrors.bloodGroup ? 'border-red-500' : 'border-slate-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="All">All Types</option>
                </select>
                {formErrors.bloodGroup && <p className="mt-1 text-sm text-red-500">{formErrors.bloodGroup}</p>}
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                onClick={() => setShowUserDetailsModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition-colors"
                onClick={handleUserDetailsSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white">Create Blood Request</h2>
            <p className="text-slate-400 mb-6">Please provide details about your blood donation request.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="E.g., Urgent B+ Blood Needed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="E.g., City Hospital, Downtown"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea 
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Provide details about your blood request..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  id="urgentCheck"
                  className="w-4 h-4 text-red-600 bg-slate-700 border-slate-600 rounded focus:ring-red-500"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                />
                <label htmlFor="urgentCheck" className="ml-2 text-sm font-medium text-slate-300">
                  Mark as urgent
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                onClick={() => setShowCreatePostModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition-colors"
                onClick={handleSubmitPost}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}