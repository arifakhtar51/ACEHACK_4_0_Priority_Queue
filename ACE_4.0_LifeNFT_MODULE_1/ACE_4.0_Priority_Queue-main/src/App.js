import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explore } from './pages/Explore';
import { GovDashboard } from './pages/GovDashboard';
import { HospitalDashboard } from './pages/HospitalDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { VerifyDonation } from './pages/VerifyDonation';
import { RedeemNFT } from './pages/RedeemNFT';
import { ManageHospitals } from './pages/ManageHospitals';
import { RoleContext } from './contexts/RoleContext';
import AppBar from './components/AppBar';
import ParticleBackground from './components/ParticleBackground';
import { DonationProvider } from './contexts/DonationContext';

function App() {
  const [userRole, setUserRole] = useState(() => {
    // Try to get role from localStorage on initial load
    return localStorage.getItem('userRole') || null;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/'; // Redirect to home page after logout
  };

  // Helper function to get dashboard based on role
  const getDashboardPath = () => {
    switch(userRole) {
      case 'government': return '/gov-dashboard';
      case 'hospital': return '/hospital-dashboard';
      case 'user': return '/user-dashboard';
      default: return '/';
    }
  };

  return (
    <DonationProvider>
      <RoleContext.Provider value={{ userRole, isLoggedIn, login, logout }}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white relative">
            <div className="absolute inset-0 bg-noise"></div>
            <div className="absolute inset-0 bg-gradient-mesh"></div>
            <div className="relative z-10">
              {/* Use the new AppBar */}
              <AppBar />

              {/* Routes */}
              <div className="py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/gov-dashboard" element={<GovDashboard />} />
                  <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/verify-donation" element={<VerifyDonation />} />
                  <Route path="/redeem-nft" element={<RedeemNFT />} />
                  <Route path="/manage-hospitals" element={<ManageHospitals />} />
                </Routes>
              </div>

              {/* Footer */}
              <footer className="bg-slate-900 mt-12 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gradient mb-4">BloodDonorNFT</h3>
                      <p className="text-slate-400">Rewarding blood donors with NFTs, connecting hospitals and donors for a healthier community.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                      <ul className="space-y-2">
                        <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/explore" className="text-slate-400 hover:text-white transition-colors">Explore</Link></li>
                        <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors">Login</Link></li>
                        <li><Link to="/register" className="text-slate-400 hover:text-white transition-colors">Register</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
                      <p className="text-slate-400">info@blooddonornft.com</p>
                      <p className="text-slate-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 mt-8 pt-8 text-center">
                    <p className="text-slate-500">© 2023 BloodDonorNFT. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
            <ParticleBackground />
          </div>
        </Router>
      </RoleContext.Provider>
    </DonationProvider>
  );
}

export default App;