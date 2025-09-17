// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Upload, X, Sun, Cloud, Zap, Star, Trophy, TrendingUp, Leaf, Award, BookOpen, Calendar } from "lucide-react";
import logo from "../assets/ecolearn logo.jpg";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(logo);
  const [isRaining, setIsRaining] = useState(true);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const userName = localStorage.getItem("username") || "EcoLearner";

  // Get real user data from localStorage (synced with Lessons.jsx)
  const [userStats, setUserStats] = useState({
    totalEcoPoints: 0,
    level: 1,
    lessonsCompleted: 0,
    streakDays: 0
  });

  const [lessons, setLessons] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadUserProgress = () => {
      // Load user stats from localStorage (same as Lessons.jsx)
      const savedStats = localStorage.getItem('userEcoStats');
      if (savedStats) {
        setUserStats(JSON.parse(savedStats));
      }

      // Load lessons progress from localStorage
      const savedLessons = localStorage.getItem('lessonsProgress');
      if (savedLessons) {
        setLessons(JSON.parse(savedLessons));
      }

      // Load saved profile image
      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    };

    loadUserProgress();

    // Listen for localStorage changes (when lessons are completed)
    const handleStorageChange = (e) => {
      if (e.key === 'userEcoStats' || e.key === 'lessonsProgress') {
        loadUserProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check for updates every 2 seconds (in case user is on same tab)
    const interval = setInterval(loadUserProgress, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Calculate derived stats
  const completedLessons = lessons.filter(l => l.completed).length;
  const totalLessons = lessons.length || 6;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const nextLevelPoints = 30 - (userStats.totalEcoPoints % 30);

  // Real achievements based on progress
  const achievements = [
    { 
      id: 1, 
      title: "First Steps", 
      desc: "Complete your first lesson", 
      icon: "🌱", 
      unlocked: completedLessons >= 1 
    },
    { 
      id: 2, 
      title: "Eco Warrior", 
      desc: "Earn 100 eco points", 
      icon: "⚡", 
      unlocked: userStats.totalEcoPoints >= 100 
    },
    { 
      id: 3, 
      title: "Sustainability Expert", 
      desc: "Complete 3 lessons", 
      icon: "🏆", 
      unlocked: completedLessons >= 3 
    },
    { 
      id: 4, 
      title: "Green Master", 
      desc: "Reach level 5", 
      icon: "👑", 
      unlocked: userStats.level >= 5 
    },
    { 
      id: 5, 
      title: "Environmental Champion", 
      desc: "Complete all lessons", 
      icon: "🎓", 
      unlocked: completedLessons >= 6 
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  // Toggle weather theme
  const toggleWeather = () => {
    setIsRaining(!isRaining);
  };

  // Handle profile image upload
  const handleUploadClick = () => {
    document.getElementById('profileUpload').click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile image removal
  const handleRemoveImage = () => {
    setProfileImage(logo);
    localStorage.removeItem('profileImage');
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-2000 ${
      isRaining ? 'bg-rainy-evening' : 'bg-clear-evening'
    }`}>
      
      {/* Rain Animation Overlay */}
      {isRaining && (
        <div className="rain-overlay">
          <div className="rain-drop rain-drop-1"></div>
          <div className="rain-drop rain-drop-2"></div>
          <div className="rain-drop rain-drop-3"></div>
          <div className="rain-drop rain-drop-4"></div>
          <div className="rain-drop rain-drop-5"></div>
        </div>
      )}

      {/* Floating Clouds */}
      <div className="floating-clouds">
        <Cloud className="cloud cloud-1 w-16 h-16 text-white opacity-20" />
        <Cloud className="cloud cloud-2 w-12 h-12 text-white opacity-15" />
        <Cloud className="cloud cloud-3 w-20 h-20 text-white opacity-10" />
      </div>

      {/* Weather Toggle Button */}
      <button
        onClick={toggleWeather}
        className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
      >
        {isRaining ? <Sun className="w-5 h-5" /> : <Cloud className="w-5 h-5" />}
        {isRaining ? 'Clear Sky' : 'Make it Rain'}
      </button>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        
        {/* Profile Header */}
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <button
                  onClick={handleUploadClick}
                  className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-5xl font-bold text-white mb-3 animate-glow">{userName}</h1>
              <p className="text-2xl text-yellow-300 mb-4">Environmental Champion</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/70">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Green Journey Started
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Level {userStats.level} Eco Champion
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card bg-gradient-to-br from-green-600/80 to-green-700/80">
            <Zap className="w-12 h-12 text-green-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-2">{userStats.totalEcoPoints}</h3>
            <p className="text-green-200">Total Eco Points</p>
            <div className="mt-4 bg-black/20 rounded-full h-2">
              <div 
                className="bg-green-300 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((userStats.totalEcoPoints % 30) / 30) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-green-200 mt-2">{nextLevelPoints} points to next level</p>
          </div>

          <div className="stat-card bg-gradient-to-br from-blue-600/80 to-blue-700/80">
            <Award className="w-12 h-12 text-blue-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-bold text-white mb-2">{userStats.level}</h3>
            <p className="text-blue-200">Current Level</p>
          </div>

          <div className="stat-card bg-gradient-to-br from-purple-600/80 to-purple-700/80">
            <BookOpen className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">{completedLessons}/{totalLessons}</h3>
            <p className="text-purple-200">Lessons Completed</p>
          </div>

          <div className="stat-card bg-gradient-to-br from-orange-600/80 to-orange-700/80">
            <TrendingUp className="w-12 h-12 text-orange-300 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">{progress}%</h3>
            <p className="text-orange-200">Overall Progress</p>
          </div>
        </div>

        {/* Progress Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Progress Chart */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
              Your Learning Journey
            </h2>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-600"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                    className="text-green-400 animate-pulse"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white animate-glow">{progress}%</span>
                </div>
              </div>
              <p className="text-gray-300 font-medium">Course Completion</p>
            </div>

            {/* Mini Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                <p className="text-2xl font-bold text-green-400">{userStats.totalEcoPoints}</p>
                <p className="text-sm text-green-300">Eco Points</p>
              </div>
              <div className="text-center p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <p className="text-2xl font-bold text-blue-400">{userStats.level}</p>
                <p className="text-sm text-blue-300">Level</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
              Achievements ({unlockedAchievements.length}/{achievements.length})
            </h2>
            
            <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/50 shadow-lg' 
                      : 'bg-gray-700/50 border-gray-600/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`text-4xl transition-all duration-300 ${achievement.unlocked ? 'animate-bounce' : ''}`}>
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                        {achievement.desc}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Star className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Progress */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-blue-400" />
            Lesson Progress
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl animate-bounce-subtle">{lesson.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white">{lesson.title}</h3>
                      <p className="text-sm text-gray-300">{lesson.difficulty} • {lesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.completed ? (
                      <div className="flex items-center text-green-400">
                        <Award className="w-5 h-5 mr-1 animate-pulse" />
                        <span className="text-sm font-medium">+{lesson.ecoReward}</span>
                      </div>
                    ) : lesson.unlocked ? (
                      <span className="text-sm text-blue-400 font-medium">Available</span>
                    ) : (
                      <span className="text-sm text-gray-500">Locked</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-2 text-center">No lesson data available</p>
            )}
          </div>
        </div>

        {/* Learning Stats */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Leaf className="w-6 h-6 mr-3 text-green-400" />
            Environmental Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30">
              <div className="text-4xl font-bold text-green-400 mb-2 animate-pulse">{userStats.streakDays}</div>
              <div className="text-white font-medium">Day Streak</div>
              <div className="text-sm text-gray-300 mt-2">Keep the momentum!</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
              <div className="text-4xl font-bold text-purple-400 mb-2 animate-bounce">{nextLevelPoints}</div>
              <div className="text-white font-medium">Points to Next Level</div>
              <div className="text-sm text-gray-300 mt-2">Almost there!</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-400/30">
              <div className="text-4xl font-bold text-orange-400 mb-2">{Math.round((userStats.totalEcoPoints / 10) * 2.3)}</div>
              <div className="text-white font-medium">CO₂ Saved (kg)</div>
              <div className="text-sm text-gray-300 mt-2">Environmental hero!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-rainy-evening {
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          color: white;
        }
        
        .bg-clear-evening {
          background: linear-gradient(135deg, #667db6 0%, #0082c8 50%, #667db6 100%);
          color: white;
        }
        
        .rain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 5;
        }
        
        .rain-drop {
          position: absolute;
          background: linear-gradient(transparent, rgba(255,255,255,0.6), transparent);
          width: 2px;
          animation: rainFall linear infinite;
        }
        
        .rain-drop-1 {
          left: 10%;
          height: 100px;
          animation-duration: 1s;
          animation-delay: 0s;
        }
        
        .rain-drop-2 {
          left: 25%;
          height: 80px;
          animation-duration: 0.8s;
          animation-delay: 0.2s;
        }
        
        .rain-drop-3 {
          left: 50%;
          height: 120px;
          animation-duration: 1.2s;
          animation-delay: 0.5s;
        }
        
        .rain-drop-4 {
          left: 75%;
          height: 90px;
          animation-duration: 0.9s;
          animation-delay: 0.3s;
        }
        
        .rain-drop-5 {
          left: 90%;
          height: 110px;
          animation-duration: 1.1s;
          animation-delay: 0.7s;
        }
        
        @keyframes rainFall {
          0% { top: -100px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
        
        .floating-clouds {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
        }
        
        .cloud {
          position: absolute;
          animation: float linear infinite;
        }
        
        .cloud-1 {
          top: 20%;
          left: -100px;
          animation-duration: 20s;
        }
        
        .cloud-2 {
          top: 40%;
          left: -80px;
          animation-duration: 25s;
          animation-delay: 5s;
        }
        
        .cloud-3 {
          top: 60%;
          left: -120px;
          animation-duration: 30s;
          animation-delay: 10s;
        }
        
        @keyframes float {
          0% { transform: translateX(0px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        
        .stat-card {
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          transform: perspective(1000px) rotateX(0deg);
        }
        
        .stat-card:hover {
          transform: perspective(1000px) rotateX(10deg) translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(255,255,255,0.5); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
};

export default Profile;
