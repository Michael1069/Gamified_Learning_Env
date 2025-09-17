// src/components/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logo from "../assets/ecolearn logo.jpg"; 
import navbarBg from "../assets/banner.jpg";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  const handleLogout = () => {
    // Clear only login/session data
    localStorage.removeItem("username");
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  // Generate floating elements for background
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 25; i++) {
      elements.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        size: 15 + Math.random() * 25,
        emoji: ['🌱', '🌿', '💚', '🍃', '🌳', '🌍', '⚡', '💡', '🎯', '⭐'][Math.floor(Math.random() * 10)]
      });
    }
    setFloatingElements(elements);
  }, []);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      {/* Animated Background for Dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100"></div>
        
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-20 animate-float select-none"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
              fontSize: `${element.size}px`,
            }}
          >
            {element.emoji}
          </div>
        ))}

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 right-16 w-24 h-24 bg-emerald-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-green-300/50"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header
        className="relative flex items-center justify-between px-7 py-8 shadow-lg text-white backdrop-blur-md border-b border-white/20 font-retroBody z-50 overflow-visible"
        style={{
          backgroundImage: `url(${navbarBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-teal-800/20 to-green-900/30 animate-gradient"></div>
        
        {/* Floating Particles in Navbar */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300/40 rounded-full animate-float-navbar"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        {/* Cartoon Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Energy Waves */}
          <div className="absolute top-4 left-1/4 w-8 h-1 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-wave-move"></div>
          <div className="absolute bottom-4 right-1/3 w-12 h-1 bg-gradient-to-r from-transparent via-green-300/30 to-transparent animate-wave-move" style={{ animationDelay: '1s', animationDirection: 'reverse' }}></div>
          
          {/* Pulsing Orbs */}
          <div className="absolute top-1/2 left-16 w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse-glow" style={{ animationDuration: '2s' }}></div>
          <div className="absolute bottom-6 right-24 w-2 h-2 bg-green-400/50 rounded-full animate-pulse-glow" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          
          {/* Floating Sparkles */}
          <div className="absolute top-3 right-1/2 animate-twinkle">✨</div>
          <div className="absolute bottom-3 left-1/3 animate-twinkle" style={{ animationDelay: '1.5s' }}>✨</div>
        </div>

        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-2 relative z-10">
          <div className="relative group">
            <img
              src={logo}
              alt="EcoLearn"
              className="h-10 w-10 rounded-full border-2 border-white/80 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl"
            />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-yellow-300/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
          </div>
          <span className="text-2xl text-white font-['Press_Start_2P'] drop-shadow-lg hover:text-yellow-200 transition-colors duration-300 cursor-default select-none">
            EcoLearn
          </span>
        </div>

        {/* Middle: Nav Links */}
        <nav className="hidden md:flex space-x-7 text-2xl font-retroBody -ml-35 -mb-10 relative z-10">
          {[
            { name: "Profile", path: "profile" },
            { name: "Lessons", path: "lessons" },
            { name: "Challenges", path: "challenges" },
            { name: "Leaderboard", path: "leaderboard" },
            { name: "Live Data", path: "livedata" },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition duration-300 font-['VT323'] relative group hover:scale-105 px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-yellow-400 font-bold bg-white/15 backdrop-blur-sm shadow-lg"
                    : "hover:text-yellow-200 hover:bg-white/10"
                }`
              }
            >
              <span className="relative z-10">{link.name}</span>
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </NavLink>
          ))}
        </nav>

        {/* Right: Profile + Mobile Menu */}
        <div className="flex items-center space-x-4 relative z-[60]">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center transition duration-300 p-3 rounded-full hover:bg-white/15 hover:scale-110 relative ${
                dropdownOpen ? "text-yellow-400 bg-white/15 scale-110" : "hover:text-yellow-300"
              }`}
            >
              <User className="w-7 h-7" />
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full bg-yellow-300/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-[70]" 
                  onClick={() => setDropdownOpen(false)}
                ></div>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-4 w-56 bg-white/98 backdrop-blur-lg text-gray-800 rounded-2xl shadow-2xl overflow-hidden z-[80] border border-white/30 animate-dropdown-appear">
                  <div className="p-2">
                    <button
                      className="block w-full text-left px-4 py-3 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-3 rounded-xl group"
                      onClick={() => {
                        navigate("/dashboard/profile");
                        setDropdownOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-emerald-600 text-sm">⚙</span>
                      </div>
                      <span className="font-medium">Customize Profile</span>
                    </button>
                    <button
                      className="block w-full text-left px-4 py-3 hover:bg-yellow-50 transition-all duration-200 flex items-center gap-3 rounded-xl group"
                      onClick={() => {
                        navigate("/dashboard/achievements");
                        setDropdownOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-yellow-600 text-sm">🏅</span>
                      </div>
                      <span className="font-medium">Achievements</span>
                    </button>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <button
                      className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-all duration-200 flex items-center gap-3 rounded-xl group"
                      onClick={handleLogout}
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-red-600 text-sm">→</span>
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-3 rounded-full hover:bg-white/15 transition-all duration-300 hover:scale-110 relative group"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-8 h-8 rotate-180 transition-transform duration-300" />
            ) : (
              <Menu className="w-8 h-8 hover:rotate-180 transition-transform duration-300" />
            )}
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md text-white px-6 py-4 space-y-4 font-retroBody relative z-40 animate-slide-down border-b border-white/10">
          {["profile", "lessons", "challenges", "leaderboard", "livedata"].map(
            (path, index) => (
              <NavLink
                key={path}
                to={path}
                className="block hover:text-yellow-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 p-2 rounded-lg hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </NavLink>
            )
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-transparent overflow-y-auto font-retroBody relative z-10">
        <div className="relative z-10 bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50 min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-navbar {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 0.8; }
        }
        
        @keyframes wave-move {
          0% { transform: translateX(-50px) scaleX(0.5); opacity: 0; }
          50% { transform: translateX(0px) scaleX(1); opacity: 1; }
          100% { transform: translateX(50px) scaleX(0.5); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes dropdown-appear {
          0% { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }
        
        @keyframes slide-down {
          0% { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-navbar {
          animation: float-navbar 3s ease-in-out infinite;
        }
        
        .animate-wave-move {
          animation: wave-move 4s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background: linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.2), rgba(34, 197, 94, 0.3));
          background-size: 400% 400%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-dropdown-appear {
          animation: dropdown-appear 0.3s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
