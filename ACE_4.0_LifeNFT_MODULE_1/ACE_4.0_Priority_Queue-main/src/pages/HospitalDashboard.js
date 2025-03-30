import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';
import { useDonations } from '../contexts/DonationContext';

// Mock data for donations
const mockDonations = [
  { id: 1, donorName: 'John Smith', bloodType: 'O+', donationDate: '2023-03-15', nftIssued: true, verifiedBy: 'Dr. Wilson' },
  { id: 2, donorName: 'Sarah Johnson', bloodType: 'A-', donationDate: '2023-03-18', nftIssued: true, verifiedBy: 'Dr. Anderson' },
  { id: 3, donorName: 'Michael Brown', bloodType: 'B+', donationDate: '2023-03-20', nftIssued: false, verifiedBy: 'Dr. Wilson' },
  { id: 4, donorName: 'Emily Davis', bloodType: 'AB+', donationDate: '2023-03-22', nftIssued: false, verifiedBy: 'Dr. Anderson' },
];

export function HospitalDashboard() {
  const { userRole } = useContext(RoleContext);
  const { donations } = useDonations();
  const [issuingNft, setIssuingNft] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Function to add a new donation
  const addDonation = (newDonation) => {
    // This function is now handled by the useDonations context
  };

  // Issue NFT (mock function)
  const handleIssueNFT = (donationId) => {
    const updatedDonations = donations.map(donation => 
      donation.id === donationId ? { ...donation, nftIssued: true } : donation
    );
    // This function is now handled by the useDonations context
    setIssuingNft(false);
    setSelectedDonation(null);
  };

  if (userRole !== 'hospital') {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
        <Link 
          to="/verify-donation"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg"
        >
          Verify New Donation
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Total Donations</h3>
          <p className="text-3xl font-bold">{donations.length}</p>
          <div className="mt-2 text-sm text-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>+8% this week</span>
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">NFTs Issued</h3>
          <p className="text-3xl font-bold">{donations.filter(d => d.nftIssued).length}</p>
          <div className="mt-2 text-sm text-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>+12% this week</span>
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Pending NFTs</h3>
          <p className="text-3xl font-bold">{donations.filter(d => !d.nftIssued).length}</p>
          <div className="mt-2 text-sm text-yellow-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Requires action</span>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Recent Blood Donations</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Donor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Donation Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">NFT Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{donation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{donation.donorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{donation.bloodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{donation.donationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donation.nftIssued 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {donation.nftIssued ? 'Issued' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button 
                      className={`text-purple-400 hover:text-purple-300 ${donation.nftIssued ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        if (!donation.nftIssued) {
                          setSelectedDonation(donation);
                          setIssuingNft(true);
                        }
                      }}
                      disabled={donation.nftIssued}
                    >
                      {donation.nftIssued ? 'NFT Issued' : 'Issue NFT'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue NFT Modal */}
      {issuingNft && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80">
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Issue NFT for Donation</h3>
            <div className="mb-6">
              <p className="text-slate-300 mb-2">You are about to issue an NFT for:</p>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p><span className="text-slate-400">Donor:</span> <span className="font-medium">{selectedDonation.donorName}</span></p>
                <p><span className="text-slate-400">Blood Type:</span> <span className="font-medium">{selectedDonation.bloodType}</span></p>
                <p><span className="text-slate-400">Donation Date:</span> <span className="font-medium">{selectedDonation.donationDate}</span></p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setIssuingNft(false);
                  setSelectedDonation(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleIssueNFT(selectedDonation.id)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg"
              >
                Confirm & Issue NFT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 