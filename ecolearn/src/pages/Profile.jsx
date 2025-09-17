// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import logo from "../assets/ecolearn logo.jpg";
import { Upload, Award } from "lucide-react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(logo);
  const userName = localStorage.getItem("username") || "EcoLearner";

  // Load profile image from localStorage on mount
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        localStorage.setItem("profileImage", imageData); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-20 items-center md:items-start justify-center h-full p-8">
      
      {/* Left: Profile Image */}
      <div className="relative group">
        <img
          src={profileImage}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <label className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition">
          <Upload className="w-8 h-8 text-white mb-1" />
          <span className="text-white text-sm font-medium">Upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Right: User Info */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {/* Username */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Username</h2>
          <p className="text-gray-600">{userName}</p>
        </div>

        {/* Badges Section */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Badges
          </h2>
          <div className="flex flex-wrap gap-3 mt-3">
            {/* Placeholder badges */}
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              Beginner
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Eco-Warrior
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Recycler
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
