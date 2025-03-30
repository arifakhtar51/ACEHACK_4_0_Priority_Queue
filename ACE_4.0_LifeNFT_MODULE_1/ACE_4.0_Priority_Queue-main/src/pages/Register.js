import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { login } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Mock registration - in a real app, this would call an API
    try {
      // Simulate registration success
      login(role);
      
      // Redirect based on role
      switch(role) {
        case 'government':
          navigate('/gov-dashboard');
          break;
        case 'hospital':
          navigate('/hospital-dashboard');
          break;
        case 'user':
          navigate('/user-dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Register As</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="user">Regular User</option>
              <option value="hospital">Hospital Owner</option>
              <option value="government">Government/Authority</option>
            </select>
          </div>
          
          <div>
            <button 
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20"
            >
              Register
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <a href="/login" className="text-purple-400 hover:text-purple-300">Login here</a>
        </div>
      </div>
    </div>
  );
} 