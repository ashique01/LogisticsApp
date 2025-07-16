import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  // Only redirect if user is admin (to prevent admin accessing user-only pages)
  if (role === "admin") return <Navigate to="/" replace />;

  return children;
}
