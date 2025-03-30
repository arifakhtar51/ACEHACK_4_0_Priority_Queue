import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn, UserPlus, LayoutDashboard, LogOut, Compass } from 'lucide-react';
import { Logo } from './Logo'; // Ensure this path is correct
import { RoleContext } from '../contexts/RoleContext'; // Ensure this path is correct

const AppBar = () => {
  const { userRole, isLoggedIn, logout } = useContext(RoleContext);

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
    <div className="relative z-50">
      {/* Main App Bar */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Logo />
              <span className="ml-3 text-xl font-bold text-gradient">BloodDonorNFT</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center">
                <Home className="mr-2" /> Home
              </Link>
              <Link to="/explore" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center">
                <Compass className="mr-2" /> Explore
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to={getDashboardPath()} className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center">
                    <LayoutDashboard className="mr-2" /> Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="ml-4 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow-lg flex items-center"
                  >
                    <LogOut className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center">
                    <LogIn className="mr-2" /> Login
                  </Link>
                  <Link to="/register" className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg flex items-center">
                    <UserPlus className="mr-2" /> Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;