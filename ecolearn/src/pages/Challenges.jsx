// src/pages/Challenges.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Trophy, Camera, CheckCircle, Clock, Star, Leaf, Target, Award } from "lucide-react";

const Challenges = () => {
  const navigate = useNavigate();
  
  const [completedChallenges, setCompletedChallenges] = useState({
    daily: [],
    monthly: [],
    yearly: []
  });

  const [userStats, setUserStats] = useState({
    ecoPoints: 0,
    streakDays: 5,
    treesPlanted: 2,
    totalCompleted: 0
  });

  const dailyChallenges = [
    {
      id: 1,
      title: "Use Reusable Water Bottle",
      description: "Avoid single-use plastic bottles for the entire day",
      ecoPoints: 25,
      difficulty: "Easy",
      category: "Waste Reduction",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Walk or Bike Short Distances",
      description: "Choose walking or cycling for trips under 2km",
      ecoPoints: 35,
      difficulty: "Medium",
      category: "Transportation",
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Turn Off Lights When Leaving",
      description: "Switch off all lights when leaving a room",
      ecoPoints: 20,
      difficulty: "Easy",
      category: "Energy",
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Collect Rainwater",
      description: "Set up a container to collect rainwater for plants",
      ecoPoints: 40,
      difficulty: "Medium",
      category: "Water Conservation",
      icon: <Trophy className="w-6 h-6" />
    }
  ];

  const monthlyChallenges = [
    {
      id: 5,
      title: "Zero Food Waste Week",
      description: "Plan meals to avoid throwing away any food for 7 consecutive days",
      ecoPoints: 200,
      difficulty: "Hard",
      category: "Food Sustainability",
      icon: <Award className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Public Transport Challenge",
      description: "Use only public transport, walking, or cycling for all trips this month",
      ecoPoints: 300,
      difficulty: "Hard",
      category: "Transportation",
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Plastic-Free Shopping",
      description: "Complete all grocery shopping without using plastic bags or packaging",
      ecoPoints: 150,
      difficulty: "Medium",
      category: "Waste Reduction",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Energy Audit & Reduction",
      description: "Reduce household energy consumption by 20% compared to last month",
      ecoPoints: 250,
      difficulty: "Hard",
      category: "Energy",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const yearlyChallenges = [
    {
      id: 9,
      title: "Carbon Footprint Reduction",
      description: "Reduce personal carbon footprint by 30% through lifestyle changes",
      ecoPoints: 1000,
      difficulty: "Expert",
      category: "Climate Action",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      id: 10,
      title: "Community Garden Project",
      description: "Start or participate in a community garden project",
      ecoPoints: 800,
      difficulty: "Hard",
      category: "Community",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: 11,
      title: "Zero Waste Lifestyle",
      description: "Achieve a zero-waste lifestyle for 6 consecutive months",
      ecoPoints: 1200,
      difficulty: "Expert",
      category: "Waste Reduction",
      icon: <Award className="w-6 h-6" />
    },
    {
      id: 12,
      title: "Renewable Energy Adoption",
      description: "Switch to 100% renewable energy sources for your home",
      ecoPoints: 1500,
      difficulty: "Expert",
      category: "Energy",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-700 bg-green-200/70";
      case "Medium": return "text-yellow-700 bg-yellow-200/70";
      case "Hard": return "text-orange-700 bg-orange-200/70";
      case "Expert": return "text-red-700 bg-red-200/70";
      default: return "text-gray-700 bg-gray-200/70";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Waste Reduction": return "bg-emerald-100 text-emerald-800";
      case "Transportation": return "bg-blue-100 text-blue-800";
      case "Energy": return "bg-purple-100 text-purple-800";
      case "Water Conservation": return "bg-cyan-100 text-cyan-800";
      case "Food Sustainability": return "bg-orange-100 text-orange-800";
      case "Community": return "bg-pink-100 text-pink-800";
      case "Climate Action": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const completeChallenge = (challengeId, type, ecoPoints) => {
    setCompletedChallenges(prev => ({
      ...prev,
      [type]: [...prev[type], challengeId]
    }));

    setUserStats(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + ecoPoints,
      totalCompleted: prev.totalCompleted + 1
    }));
  };

  const navigateToTreePlanting = () => {
    navigate('/dashboard/tree-verification');
  };

  const isCompleted = (challengeId, type) => {
    return completedChallenges[type].includes(challengeId);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-red-100">
      {/* Autumn Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sky gradient with autumn colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200 via-amber-100 to-yellow-100"></div>
        
        {/* Autumn trees silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-64">
          <svg viewBox="0 0 1200 300" className="w-full h-full fill-orange-800/40 animate-tree-sway">
            {/* Tree trunks and foliage */}
            <rect x="100" y="180" width="8" height="120" />
            <circle cx="104" cy="160" r="35" className="fill-red-600/60" />
            <rect x="250" y="160" width="10" height="140" />
            <circle cx="255" cy="140" r="40" className="fill-orange-600/60" />
            <rect x="400" y="170" width="9" height="130" />
            <circle cx="405" cy="150" r="38" className="fill-yellow-600/60" />
            <rect x="600" y="150" width="12" height="150" />
            <circle cx="606" cy="130" r="45" className="fill-red-700/60" />
            <rect x="800" y="165" width="8" height="135" />
            <circle cx="804" cy="145" r="36" className="fill-orange-700/60" />
            <rect x="1000" y="175" width="10" height="125" />
            <circle cx="1005" cy="155" r="42" className="fill-amber-600/60" />
          </svg>
        </div>

        {/* Falling leaves animation */}
        <div className="absolute top-0 left-1/4 w-4 h-4 animate-leaf-fall">
          <div className="w-4 h-4 bg-red-500 rounded-full opacity-80" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>
        <div className="absolute top-0 left-1/2 w-3 h-3 animate-leaf-fall" style={{ animationDelay: '2s' }}>
          <div className="w-3 h-3 bg-orange-500 rounded-full opacity-70" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>
        <div className="absolute top-0 right-1/3 w-5 h-5 animate-leaf-fall" style={{ animationDelay: '4s' }}>
          <div className="w-5 h-5 bg-yellow-600 rounded-full opacity-60" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>
        <div className="absolute top-0 left-1/6 w-3 h-3 animate-leaf-fall" style={{ animationDelay: '6s' }}>
          <div className="w-3 h-3 bg-red-600 rounded-full opacity-75" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>
        <div className="absolute top-0 right-1/4 w-4 h-4 animate-leaf-fall" style={{ animationDelay: '8s' }}>
          <div className="w-4 h-4 bg-amber-500 rounded-full opacity-65" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>
        <div className="absolute top-0 left-3/4 w-3 h-3 animate-leaf-fall" style={{ animationDelay: '10s' }}>
          <div className="w-3 h-3 bg-orange-600 rounded-full opacity-70" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>

        {/* Floating autumn particles */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-red-400/60 rounded-full animate-particle-drift blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-400/50 rounded-full animate-particle-drift blur-sm" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400/60 rounded-full animate-particle-drift blur-sm" style={{ animationDelay: '6s' }}></div>

        {/* Autumn wind effect */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent animate-wind-blow blur-lg"></div>
        <div className="absolute bottom-1/3 right-0 w-full h-1 bg-gradient-to-l from-transparent via-orange-300/15 to-transparent animate-wind-blow blur-lg" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent mb-4 animate-title-glow">
            Eco Challenges
          </h1>
          <p className="text-amber-800 text-xl font-medium">Take action for the planet, one challenge at a time</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-orange-300/50 hover:scale-105 transition-all duration-300 animate-stats-float">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-semibold">Eco Points</p>
                <p className="text-3xl font-bold text-orange-600 animate-number-bounce">{userStats.ecoPoints}</p>
              </div>
              <Star className="w-10 h-10 text-orange-500 animate-icon-spin" />
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-300/50 hover:scale-105 transition-all duration-300 animate-stats-float" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-semibold">Streak Days</p>
                <p className="text-3xl font-bold text-red-600 animate-number-bounce">{userStats.streakDays}</p>
              </div>
              <Trophy className="w-10 h-10 text-red-500 animate-icon-spin" />
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-amber-300/50 hover:scale-105 transition-all duration-300 animate-stats-float" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 text-sm font-semibold">Trees Planted</p>
                <p className="text-3xl font-bold text-amber-600 animate-number-bounce">{userStats.treesPlanted}</p>
              </div>
              <Leaf className="w-10 h-10 text-amber-500 animate-icon-spin" />
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-yellow-300/50 hover:scale-105 transition-all duration-300 animate-stats-float" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-semibold">Completed</p>
                <p className="text-3xl font-bold text-yellow-600 animate-number-bounce">{userStats.totalCompleted}</p>
              </div>
              <Award className="w-10 h-10 text-yellow-500 animate-icon-spin" />
            </div>
          </div>
        </div>

        {/* Daily Challenges */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-orange-600 animate-section-icon" />
            <h2 className="text-3xl font-bold text-orange-800">Daily Challenges</h2>
            <div className="px-4 py-2 bg-orange-200 text-orange-800 rounded-full text-sm font-semibold animate-badge-pulse">
              Refreshes every 24 hours
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dailyChallenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`p-6 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 animate-challenge-card ${
                  isCompleted(challenge.id, 'daily')
                    ? "bg-gradient-to-br from-green-200 to-emerald-200 border-green-400 animate-completed-glow"
                    : "bg-white/95 backdrop-blur-sm border-orange-300 hover:border-red-400"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-orange-600 animate-challenge-icon">
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-800 mb-1">{challenge.title}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(challenge.category)}`}>
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isCompleted(challenge.id, 'daily') && (
                    <CheckCircle className="w-8 h-8 text-green-600 animate-success-pulse" />
                  )}
                </div>

                <p className="text-amber-700 mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-orange-600 font-bold">
                    <Star className="w-5 h-5" />
                    +{challenge.ecoPoints} Eco Points
                  </div>
                  
                  {!isCompleted(challenge.id, 'daily') && (
                    <button
                      onClick={() => completeChallenge(challenge.id, 'daily', challenge.ecoPoints)}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 animate-button-glow"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Challenges */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-red-600 animate-section-icon" />
            <h2 className="text-3xl font-bold text-red-800">Monthly Challenges</h2>
            <div className="px-4 py-2 bg-red-200 text-red-800 rounded-full text-sm font-semibold animate-badge-pulse">
              Higher rewards, bigger impact
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {monthlyChallenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`p-6 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 animate-challenge-card ${
                  isCompleted(challenge.id, 'monthly')
                    ? "bg-gradient-to-br from-green-200 to-emerald-200 border-green-400 animate-completed-glow"
                    : "bg-white/95 backdrop-blur-sm border-red-300 hover:border-orange-400"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-red-600 animate-challenge-icon">
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-800 mb-1">{challenge.title}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(challenge.category)}`}>
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isCompleted(challenge.id, 'monthly') && (
                    <CheckCircle className="w-8 h-8 text-green-600 animate-success-pulse" />
                  )}
                </div>

                <p className="text-red-700 mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <Star className="w-5 h-5" />
                    +{challenge.ecoPoints} Eco Points
                  </div>
                  
                  {!isCompleted(challenge.id, 'monthly') && (
                    <button
                      onClick={() => completeChallenge(challenge.id, 'monthly', challenge.ecoPoints)}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 animate-button-glow"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly Challenges */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-amber-600 animate-section-icon" />
            <h2 className="text-3xl font-bold text-amber-800">Yearly Challenges</h2>
            <div className="px-4 py-2 bg-amber-200 text-amber-800 rounded-full text-sm font-semibold animate-badge-pulse">
              Epic challenges, maximum impact
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {yearlyChallenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`p-6 rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 border-2 animate-challenge-card ${
                  isCompleted(challenge.id, 'yearly')
                    ? "bg-gradient-to-br from-green-200 to-emerald-200 border-green-400 animate-completed-glow"
                    : "bg-white/95 backdrop-blur-sm border-amber-300 hover:border-yellow-400"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-amber-600 animate-challenge-icon">
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-800 mb-1">{challenge.title}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(challenge.category)}`}>
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isCompleted(challenge.id, 'yearly') && (
                    <CheckCircle className="w-8 h-8 text-green-600 animate-success-pulse" />
                  )}
                </div>

                <p className="text-amber-700 mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-600 font-bold">
                    <Star className="w-5 h-5" />
                    +{challenge.ecoPoints} Eco Points
                  </div>
                  
                  {!isCompleted(challenge.id, 'yearly') && (
                    <button
                      onClick={() => completeChallenge(challenge.id, 'yearly', challenge.ecoPoints)}
                      className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 animate-button-glow"
                    >
                      Commit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tree Planting Verification Section */}
        <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-8 rounded-3xl shadow-2xl border-2 border-green-400 animate-special-section">
          <div className="flex items-center gap-4 mb-6">
            <Camera className="w-10 h-10 text-green-700 animate-camera-icon" />
            <div>
              <h2 className="text-3xl font-bold text-green-800">Tree Planting Verification</h2>
              <p className="text-green-700">Use AI-powered image recognition to verify your tree planting efforts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-semibold">Plant a tree or sapling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-semibold">Take a photo of your planted tree</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-semibold">Our AI will verify and reward you</span>
                </div>
              </div>

              <button
                onClick={navigateToTreePlanting}
                className="w-full py-4 px-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg animate-tree-button"
              >
                Start Tree Verification
              </button>
            </div>

            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-green-300 to-emerald-400 rounded-2xl flex items-center justify-center shadow-inner animate-verification-preview">
                <div className="text-6xl animate-tree-grow">🌱</div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-green-700 animate-reward-badge">
                +500 Eco Points
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Autumn-themed CSS Animations */}
      <style jsx>{`
        @keyframes leaf-fall {
          0% { 
            transform: translateY(-100vh) translateX(0px) rotate(0deg); 
            opacity: 1; 
          }
          25% { 
            transform: translateY(-75vh) translateX(20px) rotate(90deg); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-50vh) translateX(-10px) rotate(180deg); 
            opacity: 0.6; 
          }
          75% { 
            transform: translateY(-25vh) translateX(15px) rotate(270deg); 
            opacity: 0.4; 
          }
          100% { 
            transform: translateY(100vh) translateX(-5px) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes tree-sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(3px) rotate(0.5deg); }
        }
        
        @keyframes particle-drift {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-30px) translateX(20px) scale(1.2); 
            opacity: 1; 
          }
        }
        
        @keyframes wind-blow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes title-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(251, 146, 60, 0.5); }
          50% { text-shadow: 0 0 40px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4); }
        }
        
        @keyframes stats-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes number-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes icon-spin {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes section-icon {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        @keyframes challenge-card {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        
        @keyframes completed-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }
        
        @keyframes challenge-icon {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        
        @keyframes success-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes button-glow {
          0%, 100% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); }
          50% { box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4); }
        }
        
        @keyframes special-section {
          0% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
        
        @keyframes camera-icon {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        
        @keyframes tree-button {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes verification-preview {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes tree-grow {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1.2); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes reward-badge {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        
        .animate-leaf-fall {
          animation: leaf-fall 12s linear infinite;
        }
        
        .animate-tree-sway {
          animation: tree-sway 6s ease-in-out infinite;
        }
        
        .animate-particle-drift {
          animation: particle-drift 8s ease-in-out infinite;
        }
        
        .animate-wind-blow {
          animation: wind-blow 10s ease-in-out infinite;
        }
        
        .animate-title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }
        
        .animate-stats-float {
          animation: stats-float 3s ease-in-out infinite;
        }
        
        .animate-number-bounce {
          animation: number-bounce 2s ease-in-out infinite;
        }
        
        .animate-icon-spin {
          animation: icon-spin 4s ease-in-out infinite;
        }
        
        .animate-section-icon {
          animation: section-icon 2s ease-in-out infinite;
        }
        
        .animate-badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }
        
        .animate-challenge-card {
          animation: challenge-card 0.6s ease-out forwards;
        }
        
        .animate-completed-glow {
          animation: completed-glow 2s ease-in-out infinite;
        }
        
        .animate-challenge-icon {
          animation: challenge-icon 3s ease-in-out infinite;
        }
        
        .animate-success-pulse {
          animation: success-pulse 1s ease-in-out infinite;
        }
        
        .animate-button-glow {
          animation: button-glow 2s ease-in-out infinite;
        }
        
        .animate-special-section {
          animation: special-section 0.8s ease-out forwards;
        }
        
        .animate-camera-icon {
          animation: camera-icon 2s ease-in-out infinite;
        }
        
        .animate-tree-button {
          animation: tree-button 2s ease-in-out infinite;
        }
        
        .animate-verification-preview {
          animation: verification-preview 3s ease-in-out infinite;
        }
        
        .animate-tree-grow {
          animation: tree-grow 2s ease-in-out infinite;
        }
        
        .animate-reward-badge {
          animation: reward-badge 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Challenges;