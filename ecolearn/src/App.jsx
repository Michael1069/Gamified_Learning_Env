// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { UserProgressProvider } from './context/UserProgressContext'; // Add this line
import DashboardLayout from "./components/DashboardLayout";
import Landing from "./pages/Landing";
import Lessons from "./pages/Lessons";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import LiveData from "./pages/LiveData";
import Profile from "./pages/Profile";
import LessonDemo from './pages/LessonDemo';


import "./App.css"; // ✅ global font + layout reset

function App() {
  const loggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("username");

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Landing />} />

      {/* Login & Register */}
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/welcome" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={loggedIn ? <Navigate to="/welcome" replace /> : <Register />}
      />

      {/* Welcome Page (protected) */}
      <Route
        path="/welcome"
        element={
          <PrivateRoute>
            <WelcomePage username={localStorage.getItem("username")} />
          </PrivateRoute>
        }
      />

      {/* Protected Dashboard pages */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="lessons" replace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/demo/:lessonId" element={<LessonDemo />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="livedata" element={<LiveData />} />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
