// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Generate floating particles for background
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 3
  }));

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Attempting login for:", username);
      
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/login/",
        { username, password },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          withCredentials: false
        }
      );

      console.log("Login response:", res.data);

      // Save tokens & username
      if (res.data.access) {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        localStorage.setItem("username", username); // Use the entered username
        
        // Show success message briefly before redirect
        setError("");
        setTimeout(() => {
          navigate("/welcome");
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.non_field_errors) {
          errorMessage = err.response.data.non_field_errors.join(', ');
        }
      } else if (err.response?.status === 401) {
        errorMessage = "Invalid username or password";
      } else if (err.response?.status === 403) {
        errorMessage = "Account access denied. Check your credentials.";
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        errorMessage = "Cannot connect to server. Is Django running?";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-emerald-50 to-green-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-emerald-300/40 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}

        {/* Nature elements with different positions */}
        <div className="absolute top-16 left-8 text-emerald-300/40 animate-bounce text-5xl" style={{ animationDuration: '3s' }}>
          🌿
        </div>
        <div className="absolute top-24 right-16 text-teal-400/30 animate-bounce text-3xl" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>
          🍀
        </div>
        <div className="absolute bottom-28 left-1/5 text-green-300/35 animate-bounce text-4xl" style={{ animationDuration: '3.5s', animationDelay: '0.8s' }}>
          🌱
        </div>
        <div className="absolute top-1/3 right-8 text-emerald-400/25 animate-bounce text-2xl" style={{ animationDuration: '5s', animationDelay: '2s' }}>
          💚
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-emerald-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-teal-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        
        {/* Subtle wave animation */}
        <div className="absolute bottom-0 w-full opacity-20">
          <svg viewBox="0 0 1440 120" className="w-full h-24 text-green-300">
            <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-emerald-100/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
            <span className="text-emerald-600 text-2xl animate-pulse">🌍</span>
            <span className="text-emerald-800 font-bold text-sm tracking-widest">ECO LEARNING</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Welcome Back</h1>
          <p className="text-gray-600 text-lg">Continue your sustainable learning journey</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/85 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/60 space-y-6 animate-slide-up transform hover:shadow-3xl transition-all duration-300"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Username Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block flex items-center gap-2">
              <span className="text-emerald-600">👤</span>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-4 rounded-xl focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 hover:border-gray-300 bg-white/70 text-gray-800 placeholder-gray-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block flex items-center gap-2">
              <span className="text-emerald-600">🔒</span>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-200 px-4 py-4 rounded-xl focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 hover:border-gray-300 bg-white/70 text-gray-800 placeholder-gray-500 pr-12"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !username.trim() || !password.trim()}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white py-4 px-6 rounded-xl font-bold text-lg
              hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 
              hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/25
              active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100
              transition-all duration-300 flex items-center justify-center gap-3 group"
            style={{
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            }}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span className="group-hover:animate-bounce"></span>
                <span>Sign In</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50/90 backdrop-blur-sm border-l-4 border-red-400 rounded-xl animate-shake shadow-lg">
              <div className="flex items-start">
                <span className="text-red-400 mr-3 text-lg">⚠️</span>
                <div>
                  <p className="text-red-700 text-sm font-semibold">{error}</p>
                  <p className="text-red-600 text-xs mt-1">
                    Double-check your credentials and try again
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Features */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors duration-200">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline transition-colors duration-200 font-medium"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 text-sm mb-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-emerald-600 hover:text-emerald-800 font-bold hover:underline transition-colors duration-200"
              disabled={isLoading}
            >
              Create one here
            </button>
          </p>
          
          {/* Quick Demo Button */}
          <button
            onClick={() => {
              setUsername("demo");
              setPassword("demo123");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-gray-200/80 hover:text-gray-800 transition-all duration-200 text-sm font-medium"
            disabled={isLoading}
          >
            <span>⚡</span>
            Quick Demo
          </button>
        </div>

        {/* Environment Stats */}
        
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}