// src/components/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    userType: '' // 'user', 'hospital', or 'government'
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Simulate registration and redirection after 2 seconds
    setTimeout(() => {
      if (formData.userType) {
        switch(formData.userType) {
          case 'user':
            navigate('/user-dashboard');
            break;
          case 'hospital':
            navigate('/hospital-dashboard');
            break;
          case 'government':
            navigate('/gov-dashboard');
            break;
          default:
            break;
        }
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 rounded-full p-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                <path d="M12 2L8 6H12L10 10L16 4H12L14 2H12Z" />
                <path d="M12 7.5C12 10.5 9 14 6 17C9 17 12 17 14 15C16 13 17 10 12 7.5Z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-700 mb-4">Blood Donation NFT</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Join our revolutionary platform connecting blood donors with recipients through blockchain technology.
            Receive unique NFTs for each donation and help save lives.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-red-700 mb-6">Key Benefits</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Receive unique collectible NFTs for each donation</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Track your donation history securely on the blockchain</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Connect with recipients and see your real-world impact</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Join a community of donors making a difference</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            {!submitted ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-red-700 mb-6">Register Now</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Details</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">I am registering as a:</label>
                    <select
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select user type</option>
                      <option value="user">Blood Donor/Recipient</option>
                      <option value="hospital">Hospital</option>
                      <option value="government">Government/Authority</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-md transition duration-150 ease-in-out"
                  >
                    Register for Early Access
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-4">Your registration has been received. Redirecting you to the appropriate dashboard...</p>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center text-gray-600 text-sm">
          <p className="mb-2">© 2025 Blood Donation NFT. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-red-600">Privacy Policy</a>
            <a href="#" className="hover:text-red-600">Terms of Service</a>
            <a href="#" className="hover:text-red-600">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
