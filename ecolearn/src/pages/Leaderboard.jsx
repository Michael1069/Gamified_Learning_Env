import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, Snowflake, Crown, Target, Zap, Gift, Users, TrendingUp, TreePine, Shield, Flame, User, Calendar, Sparkles, Gem, Sun, Moon } from "lucide-react";

const topics = [
  { label: "Eco Warriors", value: "topic1" },
  { label: "Green Champions", value: "topic2" },
  { label: "Planet Guardians", value: "topic3" },
];

const years = [
  "2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020",
  "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"
];

// Enhanced sample users with detailed stats
const sampleUsers = [
  {
    id: 1,
    name: "Ananya Sharma",
    username: "@ananya_eco",
    points: 2850,
    level: 25,
    streak: 45,
    achievements: 12,
    ecoPoints: 850,
    color: "from-emerald-400 to-teal-500",
    joinDate: "Jan 2023",
    completedChallenges: 156,
    treesPlanted: 23,
    carbonReduced: 450,
    badges: ["Master Eco Warrior", "Green Pioneer", "Carbon Crusher"],
    achievements_data: [
      { name: "Eco Warrior", icon: Shield, color: "text-green-400", rarity: "legendary" },
      { name: "Green Pioneer", icon: TreePine, color: "text-emerald-400", rarity: "epic" },
      { name: "Carbon Crusher", icon: Flame, color: "text-red-400", rarity: "rare" }
    ]
  },
  {
    id: 2,
    name: "Rahul Patel",
    username: "@rahul_green",
    points: 2720,
    level: 24,
    streak: 38,
    achievements: 10,
    ecoPoints: 720,
    color: "from-blue-400 to-cyan-500",
    joinDate: "Mar 2023",
    completedChallenges: 142,
    treesPlanted: 19,
    carbonReduced: 380,
    badges: ["Tree Planter", "Energy Saver", "Water Guardian"],
    achievements_data: [
      { name: "Tree Planter", icon: TreePine, color: "text-green-400", rarity: "epic" },
      { name: "Energy Saver", icon: Zap, color: "text-yellow-400", rarity: "rare" },
      { name: "Water Guardian", icon: Shield, color: "text-blue-400", rarity: "rare" }
    ]
  },
  {
    id: 3,
    name: "Priya Singh",
    username: "@priya_planet",
    points: 2680,
    level: 23,
    streak: 42,
    achievements: 11,
    ecoPoints: 680,
    color: "from-purple-400 to-pink-500",
    joinDate: "Feb 2023",
    completedChallenges: 138,
    treesPlanted: 21,
    carbonReduced: 420,
    badges: ["Solar Champion", "Recycling Pro"],
    achievements_data: [
      { name: "Solar Champion", icon: Star, color: "text-yellow-400", rarity: "epic" },
      { name: "Recycling Pro", icon: Trophy, color: "text-green-400", rarity: "rare" }
    ]
  },
  {
    id: 4,
    name: "Arjun Kumar",
    username: "@arjun_eco",
    points: 2590,
    level: 22,
    streak: 35,
    achievements: 9,
    ecoPoints: 590,
    color: "from-orange-400 to-red-500",
    joinDate: "Apr 2023",
    completedChallenges: 125,
    treesPlanted: 15,
    carbonReduced: 350,
    badges: ["Composting King", "Waste Warrior"],
    achievements_data: [
      { name: "Composting King", icon: Award, color: "text-brown-400", rarity: "rare" },
      { name: "Waste Warrior", icon: Shield, color: "text-gray-400", rarity: "common" }
    ]
  },
  {
    id: 5,
    name: "Kavya Reddy",
    username: "@kavya_green",
    points: 2480,
    level: 21,
    streak: 40,
    achievements: 8,
    ecoPoints: 480,
    color: "from-pink-400 to-rose-500",
    joinDate: "May 2023",
    completedChallenges: 118,
    treesPlanted: 17,
    carbonReduced: 320,
    badges: ["Plastic Free", "Green Chef"],
    achievements_data: [
      { name: "Plastic Free", icon: Shield, color: "text-blue-400", rarity: "epic" },
      { name: "Green Chef", icon: Star, color: "text-green-400", rarity: "rare" }
    ]
  },
  {
    id: 6,
    name: "Dev Gupta",
    username: "@dev_sustain",
    points: 2350,
    level: 20,
    streak: 28,
    achievements: 7,
    ecoPoints: 350,
    color: "from-indigo-400 to-purple-500",
    joinDate: "Jun 2023",
    completedChallenges: 105,
    treesPlanted: 12,
    carbonReduced: 280,
    badges: ["Tech Innovator"],
    achievements_data: [
      { name: "Tech Innovator", icon: Zap, color: "text-blue-400", rarity: "rare" }
    ]
  },
  {
    id: 7,
    name: "Riya Jain",
    username: "@riya_earth",
    points: 2280,
    level: 19,
    streak: 33,
    achievements: 8,
    ecoPoints: 280,
    color: "from-teal-400 to-green-500",
    joinDate: "Jul 2023",
    completedChallenges: 98,
    treesPlanted: 14,
    carbonReduced: 260,
    badges: ["Garden Master"],
    achievements_data: [
      { name: "Garden Master", icon: TreePine, color: "text-green-400", rarity: "epic" }
    ]
  },
  {
    id: 8,
    name: "Karan Mehta",
    username: "@karan_eco",
    points: 2150,
    level: 18,
    streak: 25,
    achievements: 6,
    ecoPoints: 150,
    color: "from-yellow-400 to-orange-500",
    joinDate: "Aug 2023",
    completedChallenges: 89,
    treesPlanted: 11,
    carbonReduced: 220,
    badges: ["Upcycling Pro"],
    achievements_data: [
      { name: "Upcycling Pro", icon: Trophy, color: "text-purple-400", rarity: "rare" }
    ]
  },
  {
    id: 9,
    name: "Sneha Agarwal",
    username: "@sneha_planet",
    points: 2080,
    level: 17,
    streak: 30,
    achievements: 7,
    ecoPoints: 80,
    color: "from-cyan-400 to-blue-500",
    joinDate: "Sep 2023",
    completedChallenges: 82,
    treesPlanted: 9,
    carbonReduced: 200,
    badges: ["Water Saver"],
    achievements_data: [
      { name: "Water Saver", icon: Shield, color: "text-blue-400", rarity: "rare" }
    ]
  },
  {
    id: 10,
    name: "Vikram Das",
    username: "@vikram_green",
    points: 1950,
    level: 16,
    streak: 22,
    achievements: 5,
    ecoPoints: 950,
    color: "from-lime-400 to-green-500",
    joinDate: "Oct 2023",
    completedChallenges: 75,
    treesPlanted: 8,
    carbonReduced: 180,
    badges: ["Solar Advocate"],
    achievements_data: [
      { name: "Solar Advocate", icon: Star, color: "text-yellow-400", rarity: "common" }
    ]
  }
];

const Leaderboard = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].value);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [leaderboard, setLeaderboard] = useState(sampleUsers);
  const [selectedUser, setSelectedUser] = useState(sampleUsers[0]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [santaElements, setSantaElements] = useState([]);

  // Generate enhanced snowflakes and santa elements for winter animation
  useEffect(() => {
    const generateSnowflakes = () => {
      const newSnowflakes = [];
      for (let i = 0; i < 100; i++) {
        newSnowflakes.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 6 + 4,
          opacity: Math.random() * 0.9 + 0.3,
          size: Math.random() * 8 + 2,
          delay: Math.random() * 6
        });
      }
      setSnowflakes(newSnowflakes);
    };

    const generateSantaElements = () => {
      const elements = [];
      for (let i = 0; i < 8; i++) {
        elements.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 8 + 5,
          delay: Math.random() * 10,
          type: ['🎄', '🎅', '⭐', '❄️'][Math.floor(Math.random() * 4)]
        });
      }
      setSantaElements(elements);
    };

    generateSnowflakes();
    generateSantaElements();
  }, []);

  const getPodiumHeight = (rank) => {
    switch(rank) {
      case 0: return "h-32"; // 1st place
      case 1: return "h-24"; // 2nd place
      case 2: return "h-20"; // 3rd place
      default: return "h-16";
    }
  };

  const getPodiumColor = (rank) => {
    switch(rank) {
      case 0: return "from-yellow-300 via-yellow-400 to-yellow-500"; // Gold
      case 1: return "from-gray-200 via-gray-300 to-gray-400"; // Silver
      case 2: return "from-orange-300 via-orange-400 to-orange-500"; // Bronze
      default: return "from-blue-300 to-blue-400";
    }
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 0: return <Crown className="w-8 h-8 text-yellow-600" />;
      case 1: return <Medal className="w-8 h-8 text-gray-600" />;
      case 2: return <Award className="w-8 h-8 text-orange-600" />;
      default: return <Trophy className="w-6 h-6 text-blue-600" />;
    }
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'border-yellow-400 bg-yellow-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const getThemeStyles = () => {
    if (isDarkTheme) {
      return {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 15%, #334155 30%, #475569 45%, #64748b 60%, #334155 75%, #1e293b 90%, #0f172a 100%)',
        textPrimary: 'text-cyan-300',
        textSecondary: 'text-cyan-100',
        cardBg: 'bg-slate-800/60',
        borderColor: 'border-cyan-500/30',
        snowColor: 'text-cyan-300',
        gradientFrom: 'from-cyan-400',
        gradientTo: 'to-blue-500'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #e1f4fd 0%, #d4edda 15%, #f8f9fa 30%, #e9ecef 45%, #f1f8ff 60%, #e3f2fd 75%, #f0f8ff 90%, #ffffff 100%)',
        textPrimary: 'text-blue-800',
        textSecondary: 'text-blue-600',
        cardBg: 'bg-white/60',
        borderColor: 'border-blue-200',
        snowColor: 'text-blue-200',
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-purple-600'
      };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{
           background: themeStyles.background,
           fontFamily: "'VT323', monospace"
         }}>
      
      {/* Theme Switch Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 ${themeStyles.cardBg} backdrop-blur-sm rounded-full border-2 ${themeStyles.borderColor} hover:scale-110 transition-all duration-300 shadow-lg`}
        >
          {isDarkTheme ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className={`w-6 h-6 ${themeStyles.textPrimary}`} />
          )}
        </button>
      </div>

      {/* Enhanced Winter Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div style={{
          backgroundImage: isDarkTheme 
            ? `radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.3) 3px, transparent 3px),
               radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.2) 4px, transparent 4px),
               radial-gradient(circle at 40% 80%, rgba(103, 232, 249, 0.15) 2px, transparent 2px)`
            : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 3px, transparent 3px),
               radial-gradient(circle at 80% 70%, rgba(147, 197, 253, 0.15) 4px, transparent 4px),
               radial-gradient(circle at 40% 80%, rgba(191, 219, 254, 0.1) 2px, transparent 2px)`,
          backgroundSize: '120px 120px, 80px 80px, 150px 150px'
        }} className="w-full h-full"></div>
      </div>

      {/* Enhanced Animated Snowflakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-snow-fall"
            style={{
              left: `${flake.left}%`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.delay}s`,
              opacity: flake.opacity,
            }}
          >
            <Snowflake 
              size={flake.size} 
              className={themeStyles.snowColor}
              style={{ 
                filter: isDarkTheme 
                  ? 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.6))' 
                  : 'drop-shadow(0 0 3px rgba(59, 130, 246, 0.4))',
                transform: 'rotate(45deg)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Santa Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {santaElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-float-gentle text-2xl"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDuration: `${element.animationDuration}s`,
              animationDelay: `${element.delay}s`,
            }}
          >
            {element.type}
          </div>
        ))}
      </div>

      {/* Winter Frost Pattern Overlay */}
      <div className="absolute inset-0 opacity-8" style={{
        backgroundImage: isDarkTheme 
          ? `repeating-linear-gradient(
              30deg,
              rgba(6, 182, 212, 0.08) 0px,
              rgba(6, 182, 212, 0.08) 2px,
              transparent 2px,
              transparent 25px
            )`
          : `repeating-linear-gradient(
              30deg,
              rgba(59, 130, 246, 0.05) 0px,
              rgba(59, 130, 246, 0.05) 2px,
              transparent 2px,
              transparent 25px
            )`
      }}></div>

      {/* Icy Crystal Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        {[...Array(20)].map((_, i) => (
          <div
            key={`crystal-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div 
              className={isDarkTheme ? "w-3 h-3 bg-cyan-300" : "w-2 h-2 bg-blue-300"}
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                transform: 'rotate(45deg)'
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${themeStyles.gradientFrom} ${themeStyles.gradientTo} bg-clip-text text-transparent`} 
              style={{ 
                fontFamily: "'VT323', monospace", 
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '0.1em'
              }}>
            LEADERBOARD
          </h1>
          <div className={`flex items-center justify-center gap-2 ${themeStyles.textSecondary} text-lg md:text-xl font-bold`}>
            <Sparkles className="w-6 h-6" />
            <span style={{ 
              fontFamily: "'VT323', monospace",
              letterSpacing: '0.05em'
            }}>
              COMPETE • ACHIEVE • DOMINATE
            </span>
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className={`px-6 py-3 rounded-xl border-2 ${themeStyles.borderColor} ${themeStyles.cardBg} backdrop-blur-sm font-bold ${themeStyles.textPrimary} focus:border-blue-400 transition-all text-sm md:text-lg`}
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {topics.map(topic => (
              <option key={topic.value} value={topic.value}>{topic.label}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={`px-6 py-3 rounded-xl border-2 ${themeStyles.borderColor} ${themeStyles.cardBg} backdrop-blur-sm font-bold ${themeStyles.textPrimary} focus:border-blue-400 transition-all text-sm md:text-lg`}
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            {/* Top 3 Podium */}
            <div className={`${themeStyles.cardBg} backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 ${themeStyles.borderColor} shadow-xl`}>
              <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 ${themeStyles.textPrimary}`} style={{ 
                fontFamily: "'VT323', monospace",
                letterSpacing: '0.05em'
              }}>
                CHAMPIONS PODIUM
              </h2>
              <div className="flex items-end justify-center gap-4 mb-6">
                {leaderboard.slice(0, 3).map((user, index) => (
                  <div key={user.id} className="flex flex-col items-center cursor-pointer group" onClick={() => setSelectedUser(user)}>
                    <div className={`bg-gradient-to-b ${getPodiumColor(index)} ${getPodiumHeight(index)} w-20 md:w-24 rounded-t-xl flex flex-col items-center justify-end p-2 shadow-lg group-hover:scale-105 transition-transform`}>
                      <div className="text-center mb-2">
                        {getRankIcon(index)}
                        <div className="text-sm font-bold text-gray-700 mt-1" style={{ fontFamily: "'VT323', monospace" }}>
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                    <div className={`${themeStyles.cardBg} rounded-xl p-3 mt-2 shadow-lg border ${themeStyles.borderColor} group-hover:bg-white transition-all`}>
                      <div className="text-center">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg md:text-xl" 
                             style={{ background: `linear-gradient(135deg, ${user.color.split(' ')[1]}, ${user.color.split(' ')[3]})` }}>
                          {user.name.charAt(0)}
                        </div>
                        <div className={`font-bold ${themeStyles.textPrimary} text-sm md:text-base`} style={{ fontFamily: "'VT323', monospace" }}>
                          {user.name.split(' ')[0]}
                        </div>
                        <div className={`text-sm ${themeStyles.textSecondary} font-bold`} style={{ fontFamily: "'VT323', monospace" }}>
                          {user.points} PTS
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Rankings List */}
            <div className={`${themeStyles.cardBg} backdrop-blur-sm rounded-2xl border-2 ${themeStyles.borderColor} shadow-xl overflow-hidden`}>
              <div className={`bg-gradient-to-r ${themeStyles.gradientFrom} ${themeStyles.gradientTo} p-4`}>
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center" style={{ 
                  fontFamily: "'VT323', monospace",
                  letterSpacing: '0.05em'
                }}>
                  GLOBAL RANKINGS
                </h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 border-b ${themeStyles.borderColor} cursor-pointer transition-all hover:bg-blue-50 ${
                      selectedUser?.id === user.id ? `bg-blue-100 border-l-4 ${isDarkTheme ? 'border-l-cyan-400' : 'border-l-blue-500'}` : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`font-bold text-xl md:text-2xl ${themeStyles.textPrimary} w-10`} style={{ fontFamily: "'VT323', monospace" }}>
                          #{index + 1}
                        </div>
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r ${user.color} flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg`}>
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-bold ${themeStyles.textPrimary} truncate text-sm md:text-lg`} style={{ fontFamily: "'VT323', monospace" }}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${themeStyles.textSecondary}`} style={{ fontFamily: "'VT323', monospace" }}>
                            Level {user.level}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${themeStyles.textPrimary} text-lg md:text-xl`} style={{ fontFamily: "'VT323', monospace" }}>
                          {user.points}
                        </div>
                        <div className={`text-sm ${themeStyles.textSecondary}`} style={{ fontFamily: "'VT323', monospace" }}>Points</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-green-800 text-lg md:text-xl`} style={{ fontFamily: "'VT323', monospace" }}>
                          {user.streak}
                        </div>
                        <div className={`text-sm text-green-600`} style={{ fontFamily: "'VT323', monospace" }}>Streak</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile Panel */}
          <div className="lg:col-span-1">
            <div className={`${themeStyles.cardBg} backdrop-blur-sm rounded-2xl border-2 ${themeStyles.borderColor} shadow-xl overflow-hidden sticky top-6`}>
              {selectedUser ? (
                <>
                  {/* Profile Header */}
                  <div className={`bg-gradient-to-br ${selectedUser.color} p-6 text-white`}>
                    <div className="text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center text-3xl md:text-4xl font-bold">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-1" style={{ 
                        fontFamily: "'VT323', monospace",
                        letterSpacing: '0.02em'
                      }}>
                        {selectedUser.name}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                        {selectedUser.username}
                      </p>
                      <div className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-sm md:text-base font-bold" style={{ 
                        fontFamily: "'VT323', monospace",
                        letterSpacing: '0.02em'
                      }}>
                        LEVEL {selectedUser.level} CHAMPION
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="p-4 md:p-6">
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="bg-blue-50 rounded-xl p-3 md:p-4 text-center border border-blue-200">
                        <div className="font-bold text-lg md:text-2xl text-blue-800" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.points}
                        </div>
                        <div className="text-sm text-blue-600 font-bold" style={{ fontFamily: "'VT323', monospace" }}>
                          TOTAL POINTS
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3 md:p-4 text-center border border-green-200">
                        <div className="font-bold text-lg md:text-2xl text-green-800" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.streak}
                        </div>
                        <div className="text-sm text-green-600 font-bold" style={{ fontFamily: "'VT323', monospace" }}>
                          DAY STREAK
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-3 md:p-4 text-center border border-purple-200">
                        <div className="font-bold text-lg md:text-2xl text-purple-800" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.achievements}
                        </div>
                        <div className="text-sm text-purple-600 font-bold" style={{ fontFamily: "'VT323', monospace" }}>
                          ACHIEVEMENTS
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-3 md:p-4 text-center border border-orange-200">
                        <div className="font-bold text-lg md:text-2xl text-orange-800" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.treesPlanted}
                        </div>
                        <div className="text-sm text-orange-600 font-bold" style={{ fontFamily: "'VT323', monospace" }}>
                          TREES PLANTED
                        </div>
                      </div>
                    </div>

                    {/* Detailed Stats */}
                    <div className="space-y-3 md:space-y-4 mb-6">
                      <div className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-700 font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                          Joined:
                        </span>
                        <span className="text-gray-800 font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.joinDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-700 font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                          Challenges:
                        </span>
                        <span className="text-gray-800 font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.completedChallenges}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-700 font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                          Carbon Reduced:
                        </span>
                        <span className="text-gray-800 font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                          {selectedUser.carbonReduced}kg
                        </span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className={`font-bold ${themeStyles.textPrimary} mb-3 text-center text-sm md:text-base`} style={{ fontFamily: "'VT323', monospace" }}>
                        EPIC ACHIEVEMENTS
                      </h4>
                      <div className="space-y-2">
                        {selectedUser.achievements_data.map((achievement, index) => (
                          <div key={index} className={`p-3 md:p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)} transition-all hover:scale-105`}>
                            <div className="flex items-center gap-3 md:gap-4">
                              <achievement.icon className={`w-6 h-6 md:w-8 md:h-8 ${achievement.color}`} />
                              <div>
                                <div className="font-bold text-sm md:text-base" style={{ fontFamily: "'VT323', monospace" }}>
                                  {achievement.name}
                                </div>
                                <div className="text-sm text-gray-600 font-bold uppercase" style={{ fontFamily: "'VT323', monospace" }}>
                                  {achievement.rarity}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="mt-6">
                      <h4 className={`font-bold ${themeStyles.textPrimary} mb-3 text-center text-sm md:text-base`} style={{ fontFamily: "'VT323', monospace" }}>
                        HONOR BADGES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.badges.map((badge, index) => (
                          <div key={index} className={`px-3 py-1 bg-gradient-to-r ${themeStyles.gradientFrom} ${themeStyles.gradientTo} text-white text-sm font-bold rounded-full`} style={{ fontFamily: "'VT323', monospace" }}>
                            {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <User className={`w-16 h-16 ${themeStyles.textSecondary} mx-auto mb-4`} />
                  <h3 className={`text-xl md:text-2xl font-bold ${themeStyles.textPrimary} mb-2`} style={{ fontFamily: "'VT323', monospace" }}>
                    SELECT A CHAMPION
                  </h3>
                  <p className={`${themeStyles.textSecondary} text-sm md:text-base`} style={{ fontFamily: "'VT323', monospace" }}>
                    Click on any player to view their epic achievements and stats!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        
        @keyframes snow-fall {
          0% {
            transform: translateY(-100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(150px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-10px) translateX(5px) rotate(45deg); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-15px) translateX(-5px) rotate(90deg); 
            opacity: 0.5;
          }
          75% { 
            transform: translateY(-5px) translateX(-10px) rotate(135deg); 
            opacity: 0.8;
          }
        }
        
        .animate-snow-fall {
          animation: snow-fall linear infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
