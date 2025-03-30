import React from 'react';
import { NFTCard } from '../components/NFTCard';

// Sample collection data
const myNFTs = [
  {
    id: 2,
    name: "Abstract Harmony #08",
    creator: "DigitalMaster",
    description: "An abstract composition of shapes and colors creating a harmonious visual experience.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
    price: "0.8 ETH",
    isVerified: false
  },
  {
    id: 5, 
    name: "Crypto Punk #5238",
    creator: "PunkWorks",
    description: "One of the original NFT collectibles. This punk features rare attributes and unique styling.",
    image: "https://images.unsplash.com/photo-1643101809037-a7462f07d342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    price: "18.5 ETH",
    isVerified: true
  }
];

// Sample created NFTs
const createdNFTs = [
  {
    id: 7,
    name: "Celestial Dreams #12",
    creator: "You",
    description: "A cosmic journey through dreams and celestial bodies, exploring the vastness of imagination.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    price: "1.5 ETH",
    isVerified: true
  }
];

export function MyCollection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Collection</h1>
      
      {/* Collection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-1">Total Value</p>
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
            <h3 className="text-2xl font-bold">19.3 ETH</h3>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-1">NFTs Owned</p>
          <h3 className="text-2xl font-bold">2</h3>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-1">NFTs Created</p>
          <h3 className="text-2xl font-bold">1</h3>
        </div>
      </div>
      
      {/* Collected NFTs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">NFTs You Own</h2>
        {myNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-medium text-slate-300 mb-2">No NFTs in your collection yet</h3>
            <p className="text-slate-400 mb-4">Start building your collection by purchasing your first NFT</p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/20">
              Explore NFTs
            </button>
          </div>
        )}
      </div>
      
      {/* Created NFTs */}
      <div>
        <h2 className="text-2xl font-bold mb-6">NFTs You Created</h2>
        {createdNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-xl font-medium text-slate-300 mb-2">You haven't created any NFTs yet</h3>
            <p className="text-slate-400 mb-4">Start creating and listing your digital assets</p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/20">
              Create NFT
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 