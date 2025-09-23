import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PortfolioDetail from "./pages/PortfolioDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio/:id"
        element={
          <ProtectedRoute>
            <PortfolioDetail />
          </ProtectedRoute>
        }
      />
         <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
