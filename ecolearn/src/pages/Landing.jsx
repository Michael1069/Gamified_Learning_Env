// src/pages/Landing.jsx
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from "../assets/Greenify the Earth.json"; 
import leavesAnimation from "../assets/leaves.json"; // 🌿 Leaves background
import { useRef, useEffect } from "react";

const Landing = () => {
  const leavesRef = useRef();

  useEffect(() => {
    if (leavesRef.current) {
      leavesRef.current.setSpeed(0.5); // 👈 Slow down leaves animation
    }
  }, []);

  return (
    <PageWrapper>
      <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden bg-gradient-to-br from-green-100 to-green-300">
        
        {/* 🌿 Leaves Background Lottie */}
        <Lottie
          lottieRef={leavesRef}
          animationData={leavesAnimation}
          loop
          autoplay
          className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-70"
          style={{
            width: "100%",
            height: "100%",
          }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice", // 🔥 This makes leaves fill the screen
          }}
        />
        
        {/* Overlay (for better readability) */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-0" />

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Lottie Animation (main Earth animation) */}
          <motion.div 
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-72 h-60 mb-6"
          >
            <Lottie animationData={animationData} loop={true} />
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-5xl mb-6 text-green-900 font-['Press_Start_2P'] drop-shadow-lg"
          >
            EcoLearn
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-xl mb-10 text-green-800 max-w-2xl font-['VT323'] leading-relaxed"
          >
            Learn sustainability the fun way — through challenges, lessons, and competitions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex space-x-6"
          >
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition"
            >
              Login →
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition"
            >
              Register →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Landing;
