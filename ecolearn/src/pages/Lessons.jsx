// src/pages/Lessons.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, CheckCircle, Lock, Star, Zap, Award, BookOpen, Target, Sun, Cloud } from "lucide-react";

const Lessons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to Sustainability",
      description: "Learn the basics of sustainable living and environmental responsibility",
      difficulty: "Beginner",
      duration: "15 min",
      ecoReward: 50,
      completed: false,
      unlocked: true,
      icon: "🌱"
    },
    {
      id: 2,
      title: "Waste Segregation Basics",
      description: "Master the art of proper waste segregation and recycling",
      difficulty: "Beginner",
      duration: "20 min",
      ecoReward: 75,
      completed: false,
      unlocked: false,
      icon: "♻️"
    },
    {
      id: 3,
      title: "Climate Change Awareness",
      description: "Understand climate change causes, effects, and solutions",
      difficulty: "Intermediate",
      duration: "25 min",
      ecoReward: 100,
      completed: false,
      unlocked: false,
      icon: "🌍"
    },
    {
      id: 4,
      title: "Environmental Science",
      description: "Explore ecosystems, biodiversity, and environmental processes",
      difficulty: "Intermediate",
      duration: "30 min",
      ecoReward: 125,
      completed: false,
      unlocked: false,
      icon: "🔬"
    },
    {
      id: 5,
      title: "Recycling Mastery",
      description: "Advanced recycling techniques and circular economy principles",
      difficulty: "Advanced",
      duration: "35 min",
      ecoReward: 150,
      completed: false,
      unlocked: false,
      icon: "🔄"
    },
    {
      id: 6,
      title: "Renewable Energy",
      description: "Solar, wind, and other renewable energy sources explained",
      difficulty: "Advanced",
      duration: "40 min",
      ecoReward: 200,
      completed: false,
      unlocked: false,
      icon: "⚡"
    }
  ]);

  const [userStats, setUserStats] = useState(() => {
    // Load user stats from localStorage
    const savedStats = localStorage.getItem('userEcoStats');
    return savedStats ? JSON.parse(savedStats) : {
      totalEcoPoints: 0,
      level: 1,
      lessonsCompleted: 0,
      streakDays: 0
    };
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [showEcoGain, setShowEcoGain] = useState(null);
  const [hoveredLesson, setHoveredLesson] = useState(null);

  // Calculate progress
  const total = lessons.length;
  const completed = lessons.filter((l) => l.completed).length;
  const progress = Math.round((completed / total) * 100);

  // Calculate points needed for next level
  const pointsForNextLevel = 30 - (userStats.totalEcoPoints % 30);

  // Load lesson completion status from localStorage
  useEffect(() => {
    const savedLessons = localStorage.getItem('lessonsProgress');
    if (savedLessons) {
      setLessons(JSON.parse(savedLessons));
    }
  }, []);

  // Check for lesson completion when returning from demo page
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const completedLessonId = urlParams.get('completed');
    
    if (completedLessonId) {
      const lessonId = parseInt(completedLessonId);
      completeLesson(lessonId);
      
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  // Update unlocked lessons based on completion
  useEffect(() => {
    setLessons(prev => prev.map((lesson, index) => {
      if (index === 0) return { ...lesson, unlocked: true };
      const previousLesson = prev[index - 1];
      return { ...lesson, unlocked: previousLesson.completed };
    }));
  }, [lessons.map(l => l.completed).join(',')]);

  // Save lessons progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lessonsProgress', JSON.stringify(lessons));
  }, [lessons]);

  // Save user stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userEcoStats', JSON.stringify(userStats));
  }, [userStats]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "text-emerald-700 bg-emerald-100 border-emerald-200";
      case "Intermediate": return "text-amber-700 bg-amber-100 border-amber-200";
      case "Advanced": return "text-rose-700 bg-rose-100 border-rose-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const startLesson = (lessonId) => {
    // Store the current lesson ID in localStorage for reference
    localStorage.setItem('currentLessonId', lessonId.toString());
    
    // Navigate to the demo lesson page using React Router
    navigate(`/dashboard/lessons/demo/${lessonId}`);
  };

  const completeLesson = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || lesson.completed) return;

    // Update lesson completion
    setLessons(prev => prev.map(l => 
      l.id === lessonId ? { ...l, completed: true } : l
    ));

    // Update user stats with new eco points system (30 points per level)
    setUserStats(prev => {
      const newEcoPoints = prev.totalEcoPoints + lesson.ecoReward;
      const newLevel = Math.floor(newEcoPoints / 30) + 1; // 30 eco points per level
      const newLessonsCompleted = prev.lessonsCompleted + 1;

      return {
        ...prev,
        totalEcoPoints: newEcoPoints,
        level: newLevel,
        lessonsCompleted: newLessonsCompleted
      };
    });

    // Show eco points gain animation
    setShowEcoGain(lesson.ecoReward);
    setTimeout(() => setShowEcoGain(null), 2000);

    // Show celebration animation
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);

    updateProfileStats(lesson.ecoReward);
  };

  const updateProfileStats = (ecoGained) => {
    console.log(`Gained ${ecoGained} Eco Points!`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Morning Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-100">
        {/* Animated Clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 animate-float">
            <Cloud className="w-16 h-16 text-white opacity-40" />
          </div>
          <div className="absolute top-32 right-20 animate-float-delayed">
            <Cloud className="w-12 h-12 text-white opacity-30" />
          </div>
          <div className="absolute top-10 right-1/3 animate-float-slow">
            <Cloud className="w-20 h-20 text-white opacity-25" />
          </div>
        </div>

        {/* Animated Sun */}
        <div className="absolute top-16 right-16">
          <div className="relative">
            <Sun className="w-24 h-24 text-yellow-400 animate-spin-slow" />
            <div className="absolute inset-0 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>

        {/* Sunlight Rays */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-transparent to-transparent animate-pulse"></div>
      </div>

      {/* Eco Points Gain Animation */}
      {showEcoGain && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="animate-bounce-up text-6xl font-bold text-green-500 drop-shadow-lg">
            +{showEcoGain} ECO!
          </div>
        </div>
      )}

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-yellow-400/20 animate-flash"></div>
          <div className="absolute top-1/4 left-1/4 animate-star-burst">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-star-burst-delayed">
            <Star className="w-6 h-6 text-amber-400" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-star-burst-slow">
            <Star className="w-10 h-10 text-orange-400" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
            🌟 Environmental Learning Journey
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Master environmental knowledge through interactive lessons bathed in morning sunlight
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eco Points</p>
                <p className="text-3xl font-bold text-green-600 animate-counter">{userStats.totalEcoPoints}</p>
              </div>
              <Zap className="w-8 h-8 text-green-500 animate-pulse" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 animate-slide-up-delayed">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Level</p>
                <p className="text-3xl font-bold text-blue-600">{userStats.level}</p>
              </div>
              <Award className="w-8 h-8 text-blue-500 animate-bounce" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                Next level: {pointsForNextLevel} points
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((userStats.totalEcoPoints % 30) / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 animate-slide-up-delayed-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completed}/{total}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 animate-slide-up-delayed-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-3xl font-bold text-purple-600">{progress}%</p>
              </div>
              <Target className="w-8 h-8 text-purple-500 animate-spin-slow" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out animate-progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`bg-white/85 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden transform transition-all duration-300 animate-card-entrance ${
                lesson.unlocked ? 'hover:scale-105 hover:shadow-xl cursor-pointer' : 'opacity-60'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredLesson(lesson.id)}
              onMouseLeave={() => setHoveredLesson(null)}
            >
              {/* Lesson Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl animate-bounce-subtle">{lesson.icon}</span>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-5">
                  {lesson.description}
                </p>

                {/* Lesson Metadata */}
                <div className="flex items-center justify-between text-base text-gray-500 mb-5">
                  <div className="flex items-center space-x-6">
                    <span className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span className="font-medium">{lesson.duration}</span>
                    </span>
                    <span className="flex items-center">
                      <Zap className={`w-5 h-5 mr-2 ${hoveredLesson === lesson.id ? 'animate-pulse' : ''}`} />
                      <span className="font-medium">{lesson.ecoReward} Eco</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Lesson Footer */}
              <div className="px-6 pb-6">
                {lesson.completed ? (
                  <div className="flex items-center justify-center py-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 animate-check-mark" />
                    <span className="text-green-700 font-semibold text-lg">Completed!</span>
                  </div>
                ) : lesson.unlocked ? (
                  <button
                    onClick={() => startLesson(lesson.id)}
                    className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 group text-lg"
                  >
                    <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                    Start Lesson
                  </button>
                ) : (
                  <div className="flex items-center justify-center py-4 bg-gray-100 border border-gray-200 rounded-xl">
                    <Lock className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-gray-500 font-medium text-lg">Complete previous lesson</span>
                  </div>
                )}

                {/* Demo Complete Button (Remove in production) */}
                {lesson.unlocked && !lesson.completed && (
                  <button
                    onClick={() => completeLesson(lesson.id)}
                    className="w-full mt-3 py-3 text-base text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  >
                    Mark as Complete (Demo)
                  </button>
                )}
              </div>

              {/* Hover Effect Overlay */}
              {hoveredLesson === lesson.id && lesson.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none animate-fade-in"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-up {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translateY(-100px); opacity: 0; }
        }
        
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes star-burst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(3) rotate(180deg); opacity: 0; }
        }
        
        @keyframes star-burst-delayed {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2.5) rotate(-180deg); opacity: 0; }
        }
        
        @keyframes star-burst-slow {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(4) rotate(360deg); opacity: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-delayed {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-delayed-2 {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-delayed-3 {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes card-entrance {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
        
        @keyframes check-mark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes progress-fill {
          from { width: 0%; }
        }
        
        @keyframes counter {
          from { transform: scale(0.8); }
          to { transform: scale(1); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-up { animation: bounce-up 2s ease-out forwards; }
        .animate-flash { animation: flash 0.5s ease-in-out 3; }
        .animate-star-burst { animation: star-burst 1.5s ease-out forwards; }
        .animate-star-burst-delayed { animation: star-burst-delayed 1.8s ease-out forwards 0.3s; }
        .animate-star-burst-slow { animation: star-burst-slow 2s ease-out forwards 0.6s; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.6s ease-out forwards 0.1s; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed-2 0.6s ease-out forwards 0.2s; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed-3 0.6s ease-out forwards 0.3s; }
        .animate-card-entrance { animation: card-entrance 0.6s ease-out forwards; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-check-mark { animation: check-mark 0.4s ease-out; }
        .animate-progress-fill { animation: progress-fill 1s ease-out; }
        .animate-counter { animation: counter 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Lessons;

