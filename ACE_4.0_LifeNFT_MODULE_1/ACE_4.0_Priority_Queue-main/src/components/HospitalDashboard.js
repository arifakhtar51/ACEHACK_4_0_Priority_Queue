
// src/components/HospitalDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
  const [donors, setDonors] = useState([
    { id: 1, name: 'John Doe', bloodType: 'A+', donationDate: '2025-02-15', nftIssued: true, nftId: 'NFT-001' },
    { id: 2, name: 'Jane Smith', bloodType: 'O-', donationDate: '2025-02-28', nftIssued: false, nftId: null },
    { id: 3, name: 'Robert Johnson', bloodType: 'B+', donationDate: '2025-03-01', nftIssued: true, nftId: 'NFT-002' }
  ]);
  const [newDonor, setNewDonor] = useState({ name: '', bloodType: '', donationDate: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonor(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDonor = (e) => {
    e.preventDefault();
    const donor = {
      id: donors.length + 1,
      ...newDonor,
      nftIssued: false,
      nftId: null
    };
    setDonors([...donors, donor]);
    setNewDonor({ name: '', bloodType: '', donationDate: '' });
  };

  const handleIssueNFT = (id) => {
    setDonors(donors.map(donor => 
      donor.id === id ? { ...donor, nftIssued: true, nftId: `NFT-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}` } : donor
    ));
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                <path d="M12 2L8 6H12L10 10L16 4H12L14 2H12Z" />
                <path d="M12 7.5C12 10.5 9 14 6 17C9 17 12 17 14 15C16 13 17 10 12 7.5Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Blood Donation NFT - Hospital Portal</h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-800 rounded-md hover:bg-red-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blood Donors</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation Date</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NFT Status</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {donors.map((donor) => (
                      <tr key={donor.id}>
                        <td className="py-3 px-4">{donor.name}</td>
                        <td className="py-3 px-4">{donor.bloodType}</td>
                        <td className="py-3 px-4">{donor.donationDate}</td>
                        <td className="py-3 px-4">
                          {donor.nftIssued ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Issued: {donor.nftId}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {!donor.nftIssued && (
                            <button
                              onClick={() => handleIssueNFT(donor.id)}
                              className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                            >
                              Issue NFT
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-red-800">Total Donations</h3>
                  <p className="text-3xl font-bold text-red-600">{donors.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-green-800">NFTs Issued</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {donors.filter(d => d.nftIssued).length}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-800">Pending NFTs</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {donors.filter(d => !d.nftIssued).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Record New Donation</h2>
            <form onSubmit={handleAddDonor} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newDonor.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={newDonor.bloodType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
                <input
                  type="date"
                  id="donationDate"
                  name="donationDate"
                  value={newDonor.donationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Record Donation
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;
