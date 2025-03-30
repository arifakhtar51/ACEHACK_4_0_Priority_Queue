import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';

// Mock data for hospitals
const mockHospitals = [
  { id: 1, name: 'City General Hospital', address: '123 Main St, Metropolis', registrationDate: '2023-01-15', status: 'active', verificationCount: 156 },
  { id: 2, name: 'Memorial Medical Center', address: '456 Oak Ave, Gotham', registrationDate: '2023-02-20', status: 'active', verificationCount: 89 },
  { id: 3, name: 'University Health System', address: '789 Pine Rd, Central City', registrationDate: '2023-03-10', status: 'pending', verificationCount: 0 },
  { id: 4, name: 'Metro Healthcare', address: '101 Elm St, Star City', registrationDate: '2023-04-05', status: 'active', verificationCount: 42 },
  { id: 5, name: 'Riverside Medical', address: '202 River Dr, Coast City', registrationDate: '2023-05-12', status: 'inactive', verificationCount: 23 },
];

export function ManageHospitals() {
  const { userRole } = useContext(RoleContext);
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
    email: '',
    password: ''
  });

  // Handle input change for new hospital form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({ ...newHospital, [name]: value });
  };

  // Add new hospital (mock function)
  const handleAddHospital = (e) => {
    e.preventDefault();
    const hospital = {
      id: hospitals.length + 1,
      ...newHospital,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'active',
      verificationCount: 0
    };
    
    setHospitals([...hospitals, hospital]);
    setNewHospital({ name: '', address: '', email: '', password: '' });
    setShowAddHospital(false);
  };

  // Change hospital status (mock function)
  const handleStatusChange = (id, newStatus) => {
    const updatedHospitals = hospitals.map(hospital => 
      hospital.id === id ? { ...hospital, status: newStatus } : hospital
    );
    setHospitals(updatedHospitals);
  };

  // Filter hospitals based on search term and status filter
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || hospital.status === filter;
    return matchesSearch && matchesFilter;
  });

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
        <h1 className="text-3xl font-bold">Manage Hospitals</h1>
        <button 
          onClick={() => setShowAddHospital(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg"
        >
          Add New Hospital
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Total Hospitals</h3>
          <p className="text-3xl font-bold">{hospitals.length}</p>
          <div className="mt-2 text-sm text-green-400">
            Network is growing
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Active Hospitals</h3>
          <p className="text-3xl font-bold">{hospitals.filter(h => h.status === 'active').length}</p>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Pending Approval</h3>
          <p className="text-3xl font-bold">{hospitals.filter(h => h.status === 'pending').length}</p>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Total Verifications</h3>
          <p className="text-3xl font-bold">{hospitals.reduce((sum, hospital) => sum + hospital.verificationCount, 0)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <label className="text-sm text-slate-300 mr-2">Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Hospital List */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Hospital Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Registered</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Verifications</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/50 divide-y divide-slate-700">
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{hospital.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-400">{hospital.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {hospital.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hospital.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : hospital.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {hospital.verificationCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-3">
                    {hospital.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(hospital.id, 'active')}
                        className="text-green-400 hover:text-green-300"
                      >
                        Approve
                      </button>
                    )}
                    {hospital.status === 'active' && (
                      <button 
                        onClick={() => handleStatusChange(hospital.id, 'inactive')}
                        className="text-red-400 hover:text-red-300"
                      >
                        Deactivate
                      </button>
                    )}
                    {hospital.status === 'inactive' && (
                      <button 
                        onClick={() => handleStatusChange(hospital.id, 'active')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Reactivate
                      </button>
                    )}
                    <Link to={`/hospital/${hospital.id}`} className="text-purple-400 hover:text-purple-300">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredHospitals.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    No hospitals found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
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