
// src/components/GovDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GovDashboard = () => {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'City General Hospital', address: '123 Main St', username: 'citygeneral', status: 'active' },
    { id: 2, name: 'Memorial Hospital', address: '456 Oak Ave', username: 'memorial', status: 'pending' }
  ]);
  const [newHospital, setNewHospital] = useState({ name: '', address: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleAddHospital = (e) => {
    e.preventDefault();
    const hospital = {
      id: hospitals.length + 1,
      ...newHospital,
      status: 'pending'
    };
    setHospitals([...hospitals, hospital]);
    setNewHospital({ name: '', address: '', username: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHospital(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (id, newStatus) => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === id ? { ...hospital, status: newStatus } : hospital
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
            <h1 className="text-xl font-bold">Blood Donation NFT - Government Portal</h1>
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registered Hospitals</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {hospitals.map((hospital) => (
                      <tr key={hospital.id}>
                        <td className="py-3 px-4">{hospital.name}</td>
                        <td className="py-3 px-4">{hospital.address}</td>
                        <td className="py-3 px-4">{hospital.username}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            hospital.status === 'active' ? 'bg-green-100 text-green-800' : 
                            hospital.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {hospital.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {hospital.status === 'pending' && (
                              <button
                                onClick={() => handleStatusChange(hospital.id, 'active')}
                                className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs"
                              >
                                Approve
                              </button>
                            )}
                            {hospital.status === 'active' && (
                              <button
                                onClick={() => handleStatusChange(hospital.id, 'suspended')}
                                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                              >
                                Suspend
                              </button>
                            )}
                            {hospital.status === 'suspended' && (
                              <button
                                onClick={() => handleStatusChange(hospital.id, 'active')}
                                className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                              >
                                Reactivate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">System Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-800">Total Hospitals</h3>
                  <p className="text-3xl font-bold text-blue-600">{hospitals.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-green-800">Active Hospitals</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {hospitals.filter(h => h.status === 'active').length}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-purple-800">Total NFTs Issued</h3>
                  <p className="text-3xl font-bold text-purple-600">1,245</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Hospital</h2>
            <form onSubmit={handleAddHospital} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newHospital.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newHospital.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newHospital.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newHospital.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Add Hospital
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovDashboard;
