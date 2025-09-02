// src/pages/Landing.jsx
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Lottie from "lottie-react";
import animationData from "../assets/Greenify the Earth.json"; // move your JSON file into src/assets/

const Landing = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-green-100 to-green-300">
        
        {/* Lottie Animation */}
        <div className="w-72 h-60 mb-6">
          <Lottie animationData={animationData} loop={true} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-6 text-green-800">EcoLearn</h1>

        {/* Subtitle */}
        <p className="text-lg mb-8 text-green-700 max-w-xl">
          Learn sustainability the fun way — through challenges, lessons, and competitions.
        </p>

        {/* CTA Button */}
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
        >
          Get Started →
        </Link>
      </div>
    </PageWrapper>
  );
};

export default Landing;

