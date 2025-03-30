import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';

export function RedeemNFT() {
  const { userRole } = useContext(RoleContext);
  const [nftId, setNftId] = useState('');
  const [redemptionType, setRedemptionType] = useState('discount');
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'verifying', 'success', 'error'
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setVerificationStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      if (nftId.trim().length >= 6) {
        setVerificationStatus('success');
        setVerificationMessage('NFT successfully redeemed! Your benefits have been applied.');
      } else {
        setVerificationStatus('error');
        setVerificationMessage('Invalid NFT ID. Please check and try again.');
      }
    }, 2000);
  };

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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Redeem NFT Benefits</h1>
        <p className="mt-2 text-slate-400">Use your Blood Donation NFT to claim benefits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30 shadow-lg text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Healthcare Discounts</h3>
          <p className="text-sm text-slate-300">Get discounts on medical services and products</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30 shadow-lg text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Priority Access</h3>
          <p className="text-sm text-slate-300">Skip the queue at participating hospitals</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-green-700/30 shadow-lg text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Health Checkup</h3>
          <p className="text-sm text-slate-300">Free annual health checkup at partner clinics</p>
        </div>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">NFT ID / Token ID</label>
            <input 
              type="text"
              value={nftId}
              onChange={(e) => setNftId(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your NFT ID (e.g., BLOOD-NFT-12345)"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Benefit Type</label>
            <select
              value={redemptionType}
              onChange={(e) => setRedemptionType(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="discount">Healthcare Discount</option>
              <option value="priority">Priority Access</option>
              <option value="checkup">Free Health Checkup</option>
              <option value="all">All Benefits</option>
            </select>
          </div>
          
          {verificationStatus && (
            <div className={`p-4 rounded-lg mt-6 ${
              verificationStatus === 'verifying' ? 'bg-blue-500/10 border border-blue-500/50' :
              verificationStatus === 'success' ? 'bg-green-500/10 border border-green-500/50' :
              'bg-red-500/10 border border-red-500/50'
            }`}>
              {verificationStatus === 'verifying' ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-blue-400">Verifying your NFT...</span>
                </div>
              ) : (
                <div className="flex items-start">
                  {verificationStatus === 'success' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className={verificationStatus === 'success' ? 'text-green-400' : 'text-red-400'}>
                    {verificationMessage}
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Link
              to="/user-dashboard"
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
            >
              Back to Dashboard
            </Link>
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20 flex items-center"
              disabled={verificationStatus === 'verifying'}
            >
              {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify & Redeem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 