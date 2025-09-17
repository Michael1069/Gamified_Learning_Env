import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();
  
  // Get username from localStorage
  const username = localStorage.getItem("username") || "Learner";
  
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNavigate();
    }
  };

  // Add event listener for Enter key
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [stars, setStars] = useState([]);
  
  const fullText = `Welcome back, ${username}! 🌿 Ready for your next adventure in learning?`;

  // Generate floating particles/stars
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 20; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2
      });
    }
    setStars(newStars);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [fullText]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Mountains silhouette */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-64 text-black/20">
            <path fill="currentColor" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Floating particles */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}

        {/* Animated trees */}
        <div className="absolute bottom-20 left-10 text-green-700/30 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="text-6xl">🌲</div>
        </div>
        <div className="absolute bottom-32 right-20 text-green-600/40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <div className="text-5xl">🌳</div>
        </div>
        <div className="absolute bottom-24 left-1/4 text-green-700/25 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
          <div className="text-4xl">🌲</div>
        </div>

        {/* Floating leaves */}
        <div className="absolute top-20 left-1/3 text-2xl animate-spin opacity-60" style={{ animationDuration: '6s' }}>🍃</div>
        <div className="absolute top-32 right-1/3 text-xl animate-spin opacity-50" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>🍃</div>
        <div className="absolute top-48 left-1/5 text-lg animate-spin opacity-40" style={{ animationDuration: '7s' }}>🍃</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Game-style border frame */}
        <div className="bg-black/30 backdrop-blur-sm border-4 border-yellow-400/50 rounded-xl p-8 max-w-2xl mx-auto shadow-2xl">
          {/* Level indicator */}
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold tracking-wider text-sm shadow-lg">
              🎓 LEARNING QUEST
            </div>
          </div>

          {/* Owl GIF with enhanced styling */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-200/20 to-orange-200/20 p-4 shadow-2xl animate-pulse">
                {/* Placeholder for your owl gif - replace the div below with your img tag */}
                <div className="w-full h-full bg-amber-100/20 rounded-full flex items-center justify-center text-6xl">
                  🦉
                </div>
                {/* Your actual img tag should be:
                <img
                  src={ollieOwl}
                  alt="Ollie Owl"
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] rounded-full"
                />
                */}
              </div>
              {/* Floating icons around owl */}
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">⭐</div>
              <div className="absolute -bottom-2 -left-2 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>📚</div>
              <div className="absolute top-1/2 -right-6 text-lg animate-bounce" style={{ animationDelay: '1s' }}>🎯</div>
            </div>
          </div>

          {/* Retro typewriter text */}
          <div className="text-center mb-8">
            <div className="bg-black/50 rounded-lg p-6 border-2 border-green-400/30 shadow-inner">
              <div className="font-mono text-green-300 text-xl leading-relaxed tracking-wide">
                <span className="text-yellow-400"></span> {displayText}
                {showCursor && <span className="text-yellow-400 animate-pulse">|</span>}
              </div>
            </div>
          </div>
                  
          {/* Progress bar simulation */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-yellow-300 mb-2 font-mono">
              <span>READY STATUS</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 border border-yellow-400/30">
              <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-full rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Continue button with game-style design */}
          {showButton && (
            <div className="text-center animate-fade-in">
              <button
                onClick={handleNavigate}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 
                  text-white font-bold text-lg tracking-widest rounded-lg
                  border-2 border-yellow-400 shadow-lg
                  hover:shadow-2xl hover:scale-105 hover:border-yellow-300
                  transform transition-all duration-300 ease-out
                  active:scale-95 font-mono"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-yellow-300">▶</span>
                  START ADVENTURE
                  <span className="text-yellow-300">◀</span>
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-green-400/20 
                  blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
              </button>
              
              {/* Helper text */}
              <p className="text-green-200 text-sm mt-4 font-mono animate-pulse">
                Press ENTER or click to continue...
              </p>
            </div>
          )}
        </div>

        {/* Achievement badges */}
        <div className="absolute top-6 right-6 space-y-2">
          <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-bounce">
            🏆 EXPLORER
          </div>
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce" style={{ animationDelay: '0.5s' }}>
            🌱 ECO-WARRIOR
          </div>
        </div>

        {/* Environment stats */}
        <div className="absolute bottom-6 left-6 space-y-1 text-green-200 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">🌍</span>
            <span>Environment: Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">💧</span>
            <span>Motivation: High</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⚡</span>
            <span>Energy: Maximum</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}


