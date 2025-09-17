import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const topics = [
  { label: "🌳 Trees", value: "trees" },
  { label: "💧 Waste Water", value: "wastewater" },
  { label: "🌍 Climate Change", value: "climate" },
];

const years = [
  "2015-2016",
  "2016-2017",
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
];

const rotatingMessages = [
  "🌱 Every tree planted absorbs about 22kg of CO₂ every year.",
  "💧 Recycling 1L of water saves enough energy to power a bulb for 4 hours.",
  "🌍 Switching to clean energy can cut CO₂ emissions by 70% by 2050!",
  "♻ 1 ton of recycled paper saves 17 trees and 26,000 liters of water.",
  "⚡ Turning off unused devices can save up to 10% of your household energy.",
];

// Animated Background Components
const DataParticle = ({ index, delay = 0 }) => {
  const symbols = ['📊', '📈', '📉', '🔍', '💹', '📋', '🔢', '⚡', '🌐', '💻'];
  
  return (
    <motion.div
      className="absolute text-green-200/20 text-xl pointer-events-none"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0 
      }}
      animate={{ 
        x: [null, Math.random() * window.innerWidth],
        y: [null, Math.random() * window.innerHeight],
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    >
      {symbols[index % symbols.length]}
    </motion.div>
  );
};

const FloatingChart = ({ type, delay = 0 }) => {
  const chartTypes = {
    bar: (
      <svg width="60" height="40" className="text-green-300/30">
        <rect x="10" y="20" width="8" height="20" fill="currentColor" />
        <rect x="22" y="15" width="8" height="25" fill="currentColor" />
        <rect x="34" y="10" width="8" height="30" fill="currentColor" />
        <rect x="46" y="25" width="8" height="15" fill="currentColor" />
      </svg>
    ),
    line: (
      <svg width="60" height="40" className="text-blue-300/30">
        <path d="M5,35 Q15,20 25,25 T45,15" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="5" cy="35" r="2" fill="currentColor" />
        <circle cx="25" cy="25" r="2" fill="currentColor" />
        <circle cx="45" cy="15" r="2" fill="currentColor" />
      </svg>
    ),
    pie: (
      <svg width="40" height="40" className="text-purple-300/30">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20,2 A18,18 0 0,1 35,15 L20,20 Z" fill="currentColor" opacity="0.6" />
        <path d="M35,15 A18,18 0 0,1 20,38 L20,20 Z" fill="currentColor" opacity="0.4" />
      </svg>
    )
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotate: 0,
        scale: 0.5,
        opacity: 0
      }}
      animate={{ 
        x: [null, Math.random() * window.innerWidth],
        y: [null, Math.random() * window.innerHeight],
        rotate: 360,
        scale: [0.5, 1, 0.5],
        opacity: [0, 0.8, 0]
      }}
      transition={{
        duration: 12 + Math.random() * 6,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {chartTypes[type]}
    </motion.div>
  );
};

const DataStream = ({ direction = "horizontal", delay = 0 }) => {
  const dataPoints = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <motion.div
      className={`absolute ${direction === "horizontal" ? "flex" : "flex flex-col"} space-${direction === "horizontal" ? "x" : "y"}-2`}
      initial={{ 
        x: direction === "horizontal" ? -200 : Math.random() * window.innerWidth,
        y: direction === "horizontal" ? Math.random() * window.innerHeight : -200,
        opacity: 0
      }}
      animate={{ 
        x: direction === "horizontal" ? window.innerWidth + 200 : [null, null],
        y: direction === "horizontal" ? [null, null] : window.innerHeight + 200,
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    >
      {dataPoints.map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

const GridPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" className="text-green-500">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// Centralized Tableau Dashboard Config
const tableauDashboards = {
  trees: {
    "2015-2016": {
      name: "Trees2015-2016_17579280434060/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2015-2016_17579280434060/Dashboard1/1.png",
    },
    "2016-2017": {
      name: "Trees2016-2017/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2016-2017/Dashboard1/1.png",
    },
    "2017-2018": {
      name: "Trees2017-2018/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2017-2018/Dashboard1/1.png",
    },
    "2018-2019": {
      name: "Trees2018-2019/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2018-2019/Dashboard1/1.png",
    },
    "2019-2020": {
      name: "2019-2020_17574108594310/Dashboard2",
      static_image:
        "https://public.tableau.com/static/images/20/2019-2020_17574108594310/Dashboard2/1.png",
    },
    "2020-2021": {
      name: "Trees2020-20211/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2020-20211/Dashboard1/1.png",
    },
    "2021-2022": {
      name: "Trees2021-20221/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2021-20221/Dashboard1/1.png",
    },
    "2022-2023": {
      name: "Trees2022-2023/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2022-2023/Dashboard1/1.png",
    },
    "2023-2024": {
      name: "Trees2023-20241/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2023-20241/Dashboard1/1.png",
    },
    "2024-2025": {
      name: "Trees2024-2025/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Tr/Trees2024-2025/Dashboard1/1.png",
    },
  },

  wastewater: {
    "2015-2016": {
      name: "Wastewater2025-2016/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/Wastewater2025-2016/Dashboard1/1.png",
    },
    "2016-2017": {
      name: "WasteWater2016-2017/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2016-2017/Dashboard1/1.png",
    },
    "2017-2018": {
      name: "WasteWater2017-2018/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2017-2018/Dashboard1/1.png",
    },
    "2018-2019": {
      name: "WasteWater2018-2019/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2018-2019/Dashboard1/1.png",
    },
    "2019-2020": {
      name: "WasteWater2019-2020/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2019-2020/Dashboard1/1.png",
    },
    "2020-2021": {
      name: "WasteWater2020-2021/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2020-2021/Dashboard1/1.png",
    },
    "2021-2022": {
      name: "WasteWater2021-2022/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2021-2022/Dashboard1/1.png",
    },
    "2022-2023": {
      name: "WasteWater2022-2023/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2022-2023/Dashboard1/1.png",
    },
    "2023-2024": {
      name: "WasteWater2023-2024/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2023-2024/Dashboard1/1.png",
    },
    "2024-2025": {
      name: "WasteWater2024-2025/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Wa/WasteWater2024-2025/Dashboard1/1.png",
    },
  },

  climate: {
    "2015-2016": {
      name: "Climate2015-2016/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2015-2016/Dashboard1/1.png",
    },
    "2016-2017": {
      name: "Climate2016-2017/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2016-2017/Dashboard1/1.png",
    },
    "2017-2018": {
      name: "Climate2017-2018/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2017-2018/Dashboard1/1.png",
    },
    "2018-2019": {
      name: "Climate2018-2019/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2018-2019/Dashboard1/1.png",
    },
    "2019-2020": {
      name: "Climate2019-2020/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2019-2020/Dashboard1/1.png",
    },
    "2020-2021": {
      name: "Climate2020-2021/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2020-2021/Dashboard1/1.png",
    },
    "2021-2022": {
      name: "Climate2021-2022/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2021-2022/Dashboard1/1.png",
    },
    "2022-2023": {
      name: "Climate2022-2023/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2022-2023/Dashboard1/1.png",
    },
    "2023-2024": {
      name: "Climate2023-2024/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2023-2024/Dashboard1/1.png",
    },
    "2024-2025": {
      name: "Climate2024-2025/Dashboard1",
      static_image:
        "https://public.tableau.com/static/images/Cl/Climate2024-2025/Dashboard1/1.png",
    },
  },
};

const LiveData = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].value);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  // Typewriter effect
  useEffect(() => {
    let charIndex = 0;
    let typingInterval;

    const typeMessage = () => {
      const currentMessage = rotatingMessages[currentMessageIndex];
      if (charIndex < currentMessage.length) {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedText("");
          setCurrentMessageIndex(
            (prev) => (prev + 1) % rotatingMessages.length
          );
        }, 3000);
      }
    };

    setDisplayedText("");
    typingInterval = setInterval(typeMessage, 50);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex]);

  const dashboardConfig = tableauDashboards[selectedTopic]?.[selectedYear];
  const tableauUrl = dashboardConfig
    ? `https://public.tableau.com/views/${dashboardConfig.name}?:showVizHome=no&:embed=true`
    : null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Animated Background Elements */}
      <GridPattern />
      
      {/* Data Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <DataParticle key={`particle-${i}`} index={i} delay={i * 0.5} />
      ))}
      
      {/* Floating Charts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingChart 
          key={`chart-${i}`} 
          type={['bar', 'line', 'pie'][i % 3]} 
          delay={i * 1.5} 
        />
      ))}
      
      {/* Data Streams */}
      {Array.from({ length: 6 }).map((_, i) => (
        <DataStream 
          key={`stream-${i}`} 
          direction={i % 2 === 0 ? "horizontal" : "vertical"} 
          delay={i * 2} 
        />
      ))}
      
      {/* Animated Network Connections */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 space-y-6">
        <motion.div 
          className="w-full flex flex-col items-center justify-center mb-12 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glowing background effect */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 blur-3xl opacity-30"
            animate={{
              background: [
                "radial-gradient(ellipse at center, #10b981 0%, transparent 70%)",
                "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)",
                "radial-gradient(ellipse at center, #8b5cf6 0%, transparent 70%)",
                "radial-gradient(ellipse at center, #10b981 0%, transparent 70%)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main heading - perfectly centered */}
          <motion.div 
            className="flex items-center justify-center relative z-10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.span
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mr-4"
            >
              📡
            </motion.span>
            <motion.h2 
              className="text-8xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl m-0 p-0 leading-none"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              LIVE DATA
            </motion.h2>
          </motion.div>
          
          {/* Subtitle - perfectly centered */}
          <motion.p
            className="text-xl text-gray-600 mt-6 font-medium tracking-wide m-0 p-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Real-time Environmental Intelligence
          </motion.p>
          
          {/* Decorative elements - centered */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Side decorative lines - perfectly symmetric */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent transform -translate-y-1/2 -translate-x-full"
            style={{ marginLeft: '-20px' }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 w-40 h-0.5 bg-gradient-to-l from-transparent via-blue-400 to-transparent transform -translate-y-1/2"
            style={{ marginLeft: '20px' }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Animated Insight Box */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 shadow-lg min-h-[80px] flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Background pulse effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-blue-100/50"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.p
            key={currentMessageIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="text-green-700 text-lg font-semibold text-center relative z-10"
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </motion.p>
        </motion.div>

        {/* Visual Insights Section */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
            📊 Visual Insights
          </h3>

          {/* Enhanced Dropdowns */}
          <div className="flex justify-center space-x-6 mb-8">
            <motion.select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-white/90 backdrop-blur-sm border-2 border-green-300/50 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-700 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {topics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </motion.select>

            <motion.select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white/90 backdrop-blur-sm border-2 border-blue-300/50 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </motion.select>
          </div>

          {/* Dashboard Container */}
          <motion.div 
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-200/50 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-tl-full" />
            
            <div className="relative z-10">
              {tableauUrl ? (
                <iframe
                  src={tableauUrl}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  allowFullScreen
                  title={`Dashboard-${selectedTopic}-${selectedYear}`}
                  style={{ border: "none", borderRadius: "8px" }}
                  className="shadow-lg"
                />
              ) : (
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8 text-center">
                  <motion.div
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="inline-block text-6xl mb-4"
                  >
                    📊
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">
                    No dashboard available for this selection
                  </h4>
                  <p className="text-gray-500">
                    Please try a different topic or year combination
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveData;