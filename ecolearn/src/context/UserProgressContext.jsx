// src/context/UserProgressContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserProgressContext = createContext();

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within UserProgressProvider');
  }
  return context;
};

export const UserProgressProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    totalEcoPoints: 0,
    level: 1,
    lessonsCompleted: 0,
    streakDays: 0
  });

  const [achievements, setAchievements] = useState([]);

  // API call helper
  const apiCall = async (endpoint, method = 'GET', data = null) => {
    const token = localStorage.getItem('access_token');
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
  const response = await fetch(`http://127.0.0.1:8000/api/accounts/${endpoint}`, config);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  console.error("API call failed:", error);
  return null;
}
  };

  // Load progress from backend
  const loadProgress = async () => {
    const data = await apiCall('progress/');
    if (data) {
      setUserStats(data.userStats);
      setAchievements(data.achievements || []);
    }
  };

  // Update progress in backend
  const updateProgress = async (lessonData) => {
    const result = await apiCall('progress/lesson/', 'POST', lessonData);
    if (result && result.success) {
      setUserStats(result.newStats);
      await loadProgress(); // Refresh achievements
    }
    return result;
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const value = {
    userStats,
    achievements,
    updateProgress,
    loadProgress
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};
