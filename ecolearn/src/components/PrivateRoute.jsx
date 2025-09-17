// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const username = localStorage.getItem("username");

  // If not logged in → go to login
  if (!username) return <Navigate to="/login" replace />;

  // If logged in → render children (dashboard pages)
  return children;
}
