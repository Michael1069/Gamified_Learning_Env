// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Landing from "./pages/Landing";
import Lessons from "./pages/Lessons";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Landing />} />

      {/* Dashboard pages */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="lessons" replace />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        
      </Route>
    </Routes>
  );
}

export default App;
