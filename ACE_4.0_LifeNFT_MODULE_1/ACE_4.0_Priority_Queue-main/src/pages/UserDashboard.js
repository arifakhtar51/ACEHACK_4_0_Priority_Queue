import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';
import * as hiveTx from "hive-tx";
import HiveTransactions from "./HiveTransactions";
import HiveKeychainLogin from "./HiveKeychainLogin";
import BroadcastTransaction from "./BroadcastTransaction";
import { PINATA_API } from '../config/api';

// Mock data for user's NFTs
const mockNFTs = [
  { 
    id: 1, 
    name: 'Blood Donation #1', 
    image: 'https://drive.google.com/file/d/1GrwFQTXWF6P7KIe2rwN2-dlCSgHayVQe/view?usp=drive_link',
    bloodType: 'O+',
    donationDate: '2023-01-15',
    hospital: 'City General Hospital',
    redeemed: false,
    benefits: ['10% discount at MedPharm', 'Free health checkup at City General']
  },
  { 
    id: 2, 
    name: 'Blood Donation #2', 
    image: 'https://drive.google.com/file/d/1YEwmOzey4iDHOQfwL-F6TzotGKdlbF7F/view?usp=drive_link',
    bloodType: 'O+',
    donationDate: '2023-02-20',
    hospital: 'Memorial Medical Center',
    redeemed: true,
    benefits: ['15% discount at HealthStore', 'Priority appointment at Memorial Medical']
  },
  { 
    id: 3, 
    name: 'Blood Donation #3', 
    image: 'https://drive.google.com/file/d/1D-EEJ6_p3eTP9uRd8tXBoYXkxIIAcgL5/view?usp=drive_link',
    bloodType: 'O+',
    donationDate: '2023-03-10',
    hospital: 'University Health System',
    redeemed: false,
    benefits: ['Free wellness package', '25% off at University Pharmacy']
  }
];

// Array of NFT images from Google Drive
const NFT_IMAGES = [
  "https://drive.google.com/file/d/1GrwFQTXWF6P7KIe2rwN2-dlCSgHayVQe/view?usp=drive_link",
  "https://drive.google.com/file/d/1YEwmOzey4iDHOQfwL-F6TzotGKdlbF7F/view?usp=drive_link",
  "https://drive.google.com/file/d/1D-EEJ6_p3eTP9uRd8tXBoYXkxIIAcgL5/view?usp=drive_link",
  "https://drive.google.com/file/d/1lDk4nizY1JQC1XwGmWesgWrGbSaZA-7M/view?usp=drive_link",
  "https://drive.google.com/file/d/1ZBNY-obVwRIBZAS_PSX7J7oYfz2QtuyG/view?usp=drive_link"
];

export function UserDashboard() {
  const { userRole } = useContext(RoleContext);
  const [nfts, setNfts] = useState([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const [username, setUsername] = useState("");
  const [hoverCard, setHoverCard] = useState(null);
  const [showBlockchainSection, setShowBlockchainSection] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redeem NFT function
  const handleRedeemNFT = (nftId) => {
    const updatedNfts = nfts.map(nft => 
      nft.id === nftId ? { ...nft, redeemed: true } : nft
    );
    setNfts(updatedNfts);
    setShowRedeemModal(false);
    setSelectedNft(null);
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setIsLoading(true);
        // Fetch NFTs from Hive blockchain
        const response = await fetch(`https://api.hive.blog`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'condenser_api.get_account_history',
            params: [username, -1, 1000],
          }),
        });

        const data = await response.json();
        
        // Filter and process NFT transactions
        const nftTransactions = data.result
          .filter(tx => tx[1].op[0] === 'custom_json' && tx[1].op[1].id === 'life_nft')
          .map(tx => {
            const jsonData = JSON.parse(tx[1].op[1].json);
            console.log("NFT transaction data:", jsonData);
            
            // Check if IPFS hash is valid
            if (jsonData.ipfs_hash && jsonData.ipfs_hash !== 'undefined') {
              const pinataUrl = `https://gray-worried-otter-123.mypinata.cloud/ipfs/${jsonData.ipfs_hash}`;
              console.log("Pinata URL:", pinataUrl);
              console.log("CID:", jsonData.ipfs_hash);
              
              fetch(pinataUrl)
                .then(res => res.json())
                .then(metadata => {
                  console.log("Metadata from Pinata:", metadata);
                  // Update the NFT with metadata from Pinata
                  const updatedNfts = nfts.map(nft => {
                    if (nft.id === jsonData.tx_id) {
                      return {
                        ...nft,
                        image: metadata.image || nft.image,
                        bloodType: metadata.attributes.bloodType || nft.bloodType,
                        donorName: metadata.attributes.donorName,
                        timestamp: metadata.attributes.timestamp
                      };
                    }
                    return nft;
                  });
                  setNfts(updatedNfts);
                })
                .catch(err => console.error("Error fetching from Pinata:", err));
            } else {
              console.warn("No valid IPFS hash found for transaction:", jsonData);
            }
            
            return {
              id: jsonData.tx_id,
              name: `Blood Donation #${jsonData.tx_id.slice(0, 8)}`,
              image: jsonData.image_url || process.env.PUBLIC_URL + '/NFT_IMAGES/1.png',
              bloodType: jsonData.blood_type,
              donationDate: new Date(jsonData.timestamp).toLocaleDateString(),
              hospital: jsonData.hospital || 'Verified Hospital',
              redeemed: false,
              benefits: jsonData.benefits || ['10% discount at MedPharm', 'Free health checkup at City General'],
              ipfsHash: jsonData.ipfs_hash
            };
          });

        console.log("Processed NFT transactions:", nftTransactions);
        setNfts(nftTransactions);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        // If there's an error, set some mock data for testing
        setNfts(mockNFTs);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchNFTs();
    }
  }, [username]);

  useEffect(() => {
    const storedUser = localStorage.getItem("hive_username");
    if (storedUser) {
      setUsername(storedUser);
    }
    else{

    }
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    localStorage.setItem("hive_username", user);
  };

  // Access control
  if (userRole !== 'user') {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-slate-400 mb-6">You don't have permission to access this page.</p>
        <Link to="/" className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  // Add an error handler for images
  const handleImageError = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/NFT_IMAGES/1.png'; // Fallback to default image
  };

  // Add a function to convert Google Drive URL to direct image URL
  const getDirectImageUrl = (driveUrl) => {
    if (!driveUrl) return process.env.PUBLIC_URL + '/NFT_IMAGES/1.png';
    
    // If it's not a Google Drive URL, return as is
    if (!driveUrl.includes('drive.google.com')) {
      return driveUrl;
    }
    
    // Extract file ID from Google Drive URL
    const fileId = driveUrl.match(/\/d\/(.*?)\/view/)?.[1];
    console.log("Processing Drive URL:", driveUrl);
    console.log("Extracted File ID:", fileId);
    
    if (!fileId) {
      console.warn("Could not extract file ID from URL:", driveUrl);
      return process.env.PUBLIC_URL + '/NFT_IMAGES/1.png';
    }
    
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          My Blood Donation NFTs
        </h1>
        <p className="mt-2 text-slate-400">Manage your donation NFTs and redeem benefits</p>
      </div>

      {/* Blockchain Integration Section */}
      <div className="mb-10 relative overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur opacity-70"></div>
        <div className="relative bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
          {/* Section Header with Toggle */}
          <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              LifeNFT Transactions
            </h2>
            <button 
              onClick={() => setShowBlockchainSection(!showBlockchainSection)}
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              {showBlockchainSection ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>  
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Collapsible Content */}
          {showBlockchainSection && (
            <div className="p-6">
              {/* Keychain Login Component - Only show if not logged in */}
              {!username && <HiveKeychainLogin onLogin={handleLogin} />}
              
              {/* User Logged In Status */}
              {username && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">Logged in as <span className="text-blue-400 font-semibold">{username}</span></h3>
                    <p className="text-sm text-slate-300">You can now see all your transactions</p>
                  </div>
                </div>
              )}

              {/* Transaction Components - Only show if logged in */}
              {username && (
                <div className="space-y-6">
                  <HiveTransactions username={username} />
                </div>
              )}

              {/* Info Section */}
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-900/30 rounded-lg">
                <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Blockchain Information
                </h3>
                <p className="text-sm text-slate-300">
                  Your blood donation NFTs are securely stored on the Hive blockchain. Each NFT represents a verified 
                  blood donation and can be redeemed for benefits at participating healthcare providers.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NFT Gallery */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          My NFT Collection
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : nfts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No NFTs found. Your blood donation NFTs will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div 
                key={nft.id}
                className="relative group"
                onMouseEnter={() => setHoverCard(nft.id)}
                onMouseLeave={() => setHoverCard(null)}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${nft.redeemed ? 'from-gray-600/30 to-gray-400/30' : 'from-pink-600/30 to-purple-600/30'} rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300`}></div>
                <div className="relative bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
                  {/* NFT Image and Status */}
                  <div 
                    className="relative cursor-pointer aspect-square" 
                    onClick={() => {
                      setSelectedImage(getDirectImageUrl(nft.image));
                      setShowImageModal(true);
                    }}
                  >
                    <img 
                      src={getDirectImageUrl(nft.image)} 
                      alt={nft.name} 
                      className="w-full h-full object-cover"
                      style={{ transform: 'translateZ(0)' }}
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm">
                        Click to view
                      </span>
                    </div>
                    {nft.redeemed && (
                      <div className="absolute top-0 right-0 m-2 bg-slate-800/80 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-xs font-semibold border border-gray-600/50">
                        Redeemed
                      </div>
                    )}
                  </div>
                  
                  {/* NFT Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{nft.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-sm font-medium mr-2">
                        {nft.bloodType}
                      </span>
                      <span className="text-xs text-slate-400">{nft.donationDate}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{nft.hospital}</p>
                    
                    {/* Action Button */}
                    {!nft.redeemed ? (
                      <button
                        onClick={() => {
                          setSelectedNft(nft);
                          setShowRedeemModal(true);
                        }}
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:outline-none"
                      >
                        Redeem Benefits
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 px-4 bg-slate-700 text-slate-400 rounded-lg font-medium cursor-not-allowed"
                      >
                        Already Redeemed
                      </button>
                    )}
                  </div>
                  
                  {/* Hover Card with Benefits */}
                  {hoverCard === nft.id && !nft.redeemed && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800/95 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg z-10">
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">Available Benefits:</h4>
                      <ul className="space-y-1">
                        {nft.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-slate-300 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Redemption History */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Redemption History
        </h2>
        
        {nfts.filter(nft => nft.redeemed).length > 0 ? (
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead className="bg-slate-800/80">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">NFT Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Donation Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Hospital</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Benefits Redeemed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {nfts.filter(nft => nft.redeemed).map((nft) => (
                  <tr key={nft.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{nft.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{nft.donationDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{nft.hospital}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      <ul className="list-disc pl-5">
                        {nft.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm">{benefit}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-300 mb-2">No Redeemed NFTs</h3>
            <p className="text-sm text-slate-400">You haven't redeemed any of your blood donation NFTs yet.</p>
          </div>
        )}
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && selectedNft && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setShowRedeemModal(false)}></div>
            
            <div className="relative bg-slate-800 rounded-xl max-w-lg w-full mx-auto shadow-xl overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600/30 to-purple-600/30 rounded-xl blur opacity-70"></div>
              <div className="relative bg-slate-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white">Redeem NFT Benefits</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <img 
                      src={getDirectImageUrl(selectedNft.image)} 
                      alt={selectedNft.name} 
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={handleImageError}
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-white">{selectedNft.name}</h4>
                      <p className="text-sm text-slate-300">{selectedNft.hospital}</p>
                      <p className="text-sm text-slate-400">{selectedNft.donationDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-purple-400 mb-3">Available Benefits:</h4>
                    <ul className="space-y-2">
                      {selectedNft.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-slate-700/40 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Important Information
                    </h4>
                    <p className="text-sm text-slate-300">
                      Once redeemed, you'll receive a confirmation code that can be used at participating locations. 
                      This action cannot be undone and the NFT will be marked as redeemed on the blockchain.
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowRedeemModal(false)}
                      className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRedeemNFT(selectedNft.id)}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      Confirm Redemption
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setShowImageModal(false)}></div>
            
            <div className="relative max-w-4xl w-full mx-auto">
              <div className="relative bg-slate-800 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4">
                  <img 
                    src={getDirectImageUrl(selectedImage)} 
                    alt=""
                    className="w-full h-auto rounded-lg shadow-xl"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}