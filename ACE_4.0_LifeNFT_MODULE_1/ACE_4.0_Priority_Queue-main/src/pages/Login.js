import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../contexts/RoleContext";
import HiveKeychainLogin from "./HiveKeychainLogin";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { login } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      login(role);
      switch (role) {
        case "government":
          navigate("/gov-dashboard");
          break;
        case "hospital":
          navigate("/hospital-dashboard");
          break;
        case "user":
          navigate("/user-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {//arif
      setError("Login failed. Please try again.");
    }
  };

  const handleHiveLogin = () => {
    if (!window.hive_keychain) {
      alert("Hive Keychain is not installed.");
      return;
    }

    const message = "Login to LifeNFT at " + new Date().toISOString();

    window.hive_keychain.requestSignBuffer(
      null, // Automatically fetch the username
      message,
      "Posting",
      function (response) {
        if (response.success) {
          const username = response.data.username; // Extract username from response
          console.log("Hive Keychain Login Successful:", username);
          
          login("user"); // Set role to "user" after successful login
          navigate("/user-dashboard");
        } else {
          alert("Login failed: " + response.message);
          console.error("Hive Keychain Login Error:", response);
        }
      }
    );
  
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-sm font-medium text-slate-300 mb-1">Login As</label>
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
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <a href="/register" className="text-purple-400 hover:text-purple-300">Register here</a>
        </div>

        <div className="mt-6 text-center">
          <button onClick={handleHiveLogin} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20">
            Login with Hive Keychain
          </button>
        </div>
      </div>
    </div>
  );
}