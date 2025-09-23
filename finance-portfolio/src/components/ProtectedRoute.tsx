import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { isAuthenticated } from "../services/authService";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
