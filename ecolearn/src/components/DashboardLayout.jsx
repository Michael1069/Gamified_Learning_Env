// src/components/DashboardLayout.jsx
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logo from "../assets/ecolearn logo.jpg"; 
import navbarBg from "../assets/banner.jpg";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
  // Clear only login/session data
  localStorage.removeItem("username");
  localStorage.removeItem("token"); 
  navigate("/login");
};


  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header
        className="relative flex items-center justify-between px-7 py-8 shadow-lg text-white backdrop-blur-md border-b border-white/20 font-retroBody"
        style={{
          backgroundImage: `url(${navbarBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="EcoLearn"
            className="h-10 w-10 rounded-full border-2 border-white/80 shadow-md"
          />
          <span className="text-2xl text-white-900 font-['Press_Start_2P'] drop-shadow-lg">
            EcoLearn
          </span>
        </div>


        {/* Middle: Nav Links */}
        <nav className="hidden md:flex space-x-7 text-2xl font-retroBody -ml-35 -mb-10">
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
                `transition duration-300 font-['VT323'] ${
                  isActive
                    ? "text-yellow-400 white-bold"
                    : "hover:text-yellow-200"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right: Profile + Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center transition ${
                dropdownOpen ? "text-yellow-400" : "hover:text-yellow-300"
              }`}
            >
              <User className="w-7 h-7" />
            </button>


            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden z-50 transition-all font-retroBody">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setDropdownOpen(false);
                  }}
                >
                  Customize Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/dashboard/achievements");
                    setDropdownOpen(false);
                  }}
                >
                  Achievements
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-4 space-y-4 font-retroBody">
          {["profile", "lessons", "challenges", "leaderboard", "livedata"].map(
            (path) => (
              <NavLink
                key={path}
                to={path}
                className="block hover:text-yellow-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </NavLink>
            )
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto font-retroBody">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
