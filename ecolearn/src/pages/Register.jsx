// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Generate floating particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      console.log("Attempting registration with:", { username, email, role });
      
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          username,
          password,
          email,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // Add CSRF token if needed
            ...(document.cookie.includes('csrftoken') && {
              'X-CSRFToken': document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1]
            })
          },
          withCredentials: false, // Try without credentials first
        }
      );

      console.log("Registration response:", res);
      
      if (res.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Registration error details:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error headers:", err.response?.headers);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response?.data) {
        // Handle specific error messages from backend
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.username) {
          errorMessage = `Username: ${err.response.data.username.join(', ')}`;
        } else if (err.response.data.email) {
          errorMessage = `Email: ${err.response.data.email.join(', ')}`;
        } else if (err.response.data.password) {
          errorMessage = `Password: ${err.response.data.password.join(', ')}`;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      } else if (err.response?.status === 403) {
        errorMessage = "CORS or permission error. Check Django CORS settings.";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Check Django backend logs.";
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        errorMessage = "Cannot connect to server. Is Django running on port 8000?";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-3 h-3 bg-green-200/40 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}

        {/* Subtle nature elements */}
        <div className="absolute top-20 left-10 text-green-300/30 animate-bounce text-4xl" style={{ animationDuration: '4s' }}>
          🌱
        </div>
        <div className="absolute top-32 right-20 text-green-400/30 animate-bounce text-3xl" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          🍃
        </div>
        <div className="absolute bottom-32 left-1/4 text-teal-300/30 animate-bounce text-2xl" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>
          💚
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-teal-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-green-100/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="text-green-600 text-xl">🌿</span>
            <span className="text-green-800 font-semibold text-sm tracking-wide">ECO LEARNING</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Join Our Community</h1>
          <p className="text-gray-600">Start your sustainable learning journey</p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 space-y-6 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Username Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Username</label>
            <input
              type="text"
              placeholder="Choose a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/50"
              required
              disabled={isLoading}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/50"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/50"
              required
              disabled={isLoading}
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">I am a</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/50"
              disabled={isLoading}
            >
              <option value="STUDENT">🎓 Student</option>
              <option value="UNIVERSITY">🏫 University</option>
              <option value="ADMIN">👤 Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold
              hover:from-green-600 hover:to-emerald-700 hover:scale-[1.02] hover:shadow-lg
              active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
              transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                <span></span>
                Create Account
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg animate-shake">
              <div className="flex">
                <span className="text-red-400 mr-2">⚠️</span>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                  Troubleshooting tips
                </summary>
                <ul className="text-xs text-red-600 mt-1 space-y-1">
                  <li>• Make sure Django server is running on port 8000</li>
                  <li>• Check if CORS is properly configured in Django settings</li>
                  <li>• Verify the API endpoint URL is correct</li>
                  <li>• Check browser console for detailed error messages</li>
                </ul>
              </details>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg animate-bounce">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✅</span>
                <p className="text-green-700 text-sm font-medium">{success}</p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 hover:text-green-800 font-semibold hover:underline transition-colors duration-200"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Custom CSS - Add this to your global CSS file or use styled-components */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}