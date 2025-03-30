import React, { useState, useEffect } from 'react';
import { Gift, Activity, Award, Calendar, Droplet } from 'lucide-react';

const UserDashboard = () => {
  const [nfts, setNfts] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('nfts');

  useEffect(() => {
    const timer = setTimeout(() => {
      setNfts([
        { id: 'nft001', hospital: 'City Hospital', date: '2025-02-10', status: 'active' },
        { id: 'nft002', hospital: 'Central Medical Center', date: '2024-12-05', status: 'active' },
        { id: 'nft003', hospital: 'Memorial Hospital', date: '2024-09-15', status: 'redeemed' }
      ]);
      
      setBenefits([
        { id: 'ben001', title: 'Free Health Checkup', provider: 'City Hospital', expiry: '2025-06-30', redeemed: false },
        { id: 'ben002', title: 'Medical Lab Discount', provider: 'National Labs', expiry: '2025-05-15', redeemed: false },
        { id: 'ben003', title: 'Hospital Cafeteria Voucher', provider: 'Central Medical Center', expiry: '2025-04-20', redeemed: true }
      ]);
      
      setDonationHistory([
        { id: 'don001', date: '2025-02-10', hospital: 'City Hospital', type: 'Whole Blood', nftIssued: 'nft001' },
        { id: 'don002', date: '2024-12-05', hospital: 'Central Medical Center', type: 'Plasma', nftIssued: 'nft002' },
        { id: 'don003', date: '2024-09-15', hospital: 'Memorial Hospital', type: 'Platelets', nftIssued: 'nft003' },
        { id: 'don004', date: '2024-06-22', hospital: 'City Hospital', type: 'Whole Blood', nftIssued: 'nft004' }
      ]);
      
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading your donation information...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Blood Donation Dashboard</h1>
      <div className="mt-4 flex gap-3">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded flex items-center gap-1">
          <Droplet size={16} /> {donationHistory.length} Donations
        </span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded flex items-center gap-1">
          <Award size={16} /> {nfts.filter(nft => nft.status === 'active').length} Active NFTs
        </span>
      </div>

      <div className="mt-6 flex gap-4 border-b">
        <button onClick={() => setActiveTab('nfts')} className={`py-2 px-4 ${activeTab === 'nfts' ? 'border-b-2 border-black' : ''}`}>My NFTs</button>
        <button onClick={() => setActiveTab('benefits')} className={`py-2 px-4 ${activeTab === 'benefits' ? 'border-b-2 border-black' : ''}`}>Available Benefits</button>
        <button onClick={() => setActiveTab('history')} className={`py-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-black' : ''}`}>Donation History</button>
      </div>
      
      <div className="mt-6">
        {activeTab === 'nfts' && nfts.map(nft => (
          <div key={nft.id} className="p-4 border rounded mb-4">
            <h2 className="text-lg">Blood Donation NFT</h2>
            <p>ID: {nft.id}</p>
            <p>Hospital: {nft.hospital}</p>
            <p>Issued: {nft.date}</p>
            <p>Status: {nft.status}</p>
          </div>
        ))}

        {activeTab === 'benefits' && benefits.map(benefit => (
          <div key={benefit.id} className="p-4 border rounded mb-4">
            <h2 className="text-lg">{benefit.title}</h2>
            <p>Provider: {benefit.provider}</p>
            <p>Expires: {benefit.expiry}</p>
            <p>Status: {benefit.redeemed ? 'Redeemed' : 'Available'}</p>
          </div>
        ))}

        {activeTab === 'history' && donationHistory.map(donation => (
          <div key={donation.id} className="p-4 border rounded mb-4">
            <p>Date: {donation.date}</p>
            <p>Hospital: {donation.hospital}</p>
            <p>Type: {donation.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
