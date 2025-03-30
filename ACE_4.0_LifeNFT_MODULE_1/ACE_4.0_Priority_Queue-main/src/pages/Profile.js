import React, { useState } from 'react';

export function Profile() {
  // User state would typically come from authentication system
  const [user, setUser] = useState({
    username: "CryptoExplorer",
    name: "Alex Johnson",
    bio: "Digital art collector and blockchain enthusiast. Always looking for the next innovative NFT project.",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    coverImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    walletAddress: "0x1a2b...3c4d",
    joined: "May 2023"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: formData.name,
      username: formData.username,
      bio: formData.bio
    }));
    setIsEditing(false);
  };

  // Tabs
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div>
      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover Image */}
        <div className="h-64 w-full rounded-xl overflow-hidden">
          <img 
            src={user.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Profile Info */}
        <div className="absolute -bottom-16 left-8 flex items-end">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-slate-900 bg-slate-800">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 border border-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 px-8">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="mt-16 px-8">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/20"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
            <div className="flex items-center mb-4">
              <p className="text-slate-400">@{user.username}</p>
              <span className="mx-2 text-slate-600">•</span>
              <div className="flex items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Joined {user.joined}
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-2xl">{user.bio}</p>
            
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6 max-w-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M10 2L17.5 10L10 18L2.5 10L10 2Z" fill="url(#paint0_linear)" />
                    <defs>
                      <linearGradient id="paint0_linear" x1="2.5" y1="2" x2="17.5" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A855F7" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-medium">Wallet Address</span>
                </div>
                <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-sm font-mono bg-slate-900 p-2 rounded">{user.walletAddress}</p>
            </div>
            
            {/* Settings Tabs */}
            <div className="mt-10">
              <div className="border-b border-slate-700 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "settings"
                        ? "border-purple-500 text-purple-500"
                        : "border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "security"
                        ? "border-purple-500 text-purple-500"
                        : "border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "notifications"
                        ? "border-purple-500 text-purple-500"
                        : "border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    Notifications
                  </button>
                </nav>
              </div>
              
              {/* Tab content */}
              <div>
                {activeTab === "settings" && (
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">Display NSFW Content</p>
                          <p className="text-sm text-slate-400">Show content that may be intended for mature audiences</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">Show Profile in Search Results</p>
                          <p className="text-sm text-slate-400">Allow others to find your profile through search</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-slate-400">Receive emails about activity related to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "security" && (
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium mb-2">Change Password</p>
                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700">
                          Update Password
                        </button>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-400 mb-2">Add an extra layer of security to your account</p>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                          Enable 2FA
                        </button>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Connected Accounts</p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              <span>Twitter</span>
                            </div>
                            <button className="text-slate-400 hover:text-white">Disconnect</button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.949 14.9c-.215.338-.611.48-.989.312a8.215 8.215 0 01-3.471-2.201A8.133 8.133 0 1111 12.17a8.217 8.217 0 012.208 3.472c.17.378.025.773-.312.989l-1.151.732c-.34.215-.777.095-.989-.247-.125-.186-.25-.368-.375-.534-.126-.226-.154-.297-.28-.54-.125-.242-.266-.43-.406-.63-.281-.323-.594-.607-.922-.866a8.046 8.046 0 00-1.065-.687 4.992 4.992 0 00-.894-.374c-.248-.08-.392-.134-.62-.259a1.558 1.558 0 01-.534-.374c-.343-.343-.514-.939-.188-1.262l.732-1.151z"/>
                              </svg>
                              <span>Discord</span>
                            </div>
                            <button className="text-purple-400 hover:text-purple-300">Connect</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "notifications" && (
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">New NFT Sale</p>
                          <p className="text-sm text-slate-400">Get notified when your NFTs are sold</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">Price Alerts</p>
                          <p className="text-sm text-slate-400">Receive notifications about significant price changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">New Followers</p>
                          <p className="text-sm text-slate-400">Get notified when someone follows your profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-slate-700">
                        <div>
                          <p className="font-medium">Featured Drops</p>
                          <p className="text-sm text-slate-400">Stay updated on new and featured NFT drops</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      
                      <div className="mt-6">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/20">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 