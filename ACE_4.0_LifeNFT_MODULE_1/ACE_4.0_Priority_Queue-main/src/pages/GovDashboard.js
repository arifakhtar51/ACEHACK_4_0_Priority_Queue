import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';

// Mock data for hospitals
const mockHospitals = [
  { id: 1, name: 'City General Hospital', address: '123 Main St, Metropolis', registrationDate: '2023-01-15', status: 'active' },
  { id: 2, name: 'Memorial Medical Center', address: '456 Oak Ave, Gotham', registrationDate: '2023-02-20', status: 'active' },
  { id: 3, name: 'University Health System', address: '789 Pine Rd, Central City', registrationDate: '2023-03-10', status: 'pending' },
];

export function GovDashboard() {
  const { userRole } = useContext(RoleContext);
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
    email: '',
    password: ''
  });

  // Add new hospital (mock function)
  const handleAddHospital = (e) => {
    e.preventDefault();
    const hospital = {
      id: hospitals.length + 1,
      ...newHospital,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    setHospitals([...hospitals, hospital]);
    setNewHospital({ name: '', address: '', email: '', password: '' });
    setShowAddHospital(false);
  };

  // Handle input change for new hospital form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({ ...newHospital, [name]: value });
  };

  if (userRole !== 'government') {
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
        <h1 className="text-3xl font-bold">Government Authority Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Total Hospitals</h3>
          <p className="text-3xl font-bold">{hospitals.length}</p>
          <div className="mt-2 text-sm text-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>+15% this month</span>
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Total Donations</h3>
          <p className="text-3xl font-bold">583</p>
          <div className="mt-2 text-sm text-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>+23% this month</span>
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">NFTs Issued</h3>
          <p className="text-3xl font-bold">412</p>
          <div className="mt-2 text-sm text-green-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>+18% this month</span>
          </div>
        </div>
      </div>

      {/* Manage Hospitals Section */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg overflow-hidden mb-8">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Registered Hospitals</h2>
          <button 
            onClick={() => setShowAddHospital(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg"
          >
            Add Hospital
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Hospital Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {hospitals.map(hospital => (
                <tr key={hospital.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{hospital.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{hospital.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{hospital.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{hospital.registrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hospital.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {hospital.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button className="text-purple-400 hover:text-purple-300">View</button>
                    <span className="mx-2 text-slate-600">|</span>
                    <button className="text-red-400 hover:text-red-300">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Hospital Modal */}
      {showAddHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80">
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Hospital</h3>
            <form onSubmit={handleAddHospital} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Hospital Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={newHospital.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={newHospital.address}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={newHospital.email}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={newHospital.password}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddHospital(false)}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg"
                >
                  Add Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 