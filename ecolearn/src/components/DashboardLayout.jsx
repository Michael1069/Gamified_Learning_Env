// src/components/DashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 text-2xl font-bold text-green-600">EcoLearn</div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="lessons"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-green-500 text-white" : "hover:bg-green-100"
              }`
            }
          >
            📘 Lessons
          </NavLink>
          <NavLink
            to="challenges"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-green-500 text-white" : "hover:bg-green-100"
              }`
            }
          >
            🏆 Challenges
          </NavLink>
          <NavLink
            to="leaderboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-green-500 text-white" : "hover:bg-green-100"
              }`
            }
          >
            📊 Leaderboard
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
