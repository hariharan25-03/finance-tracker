import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/") {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
    >
      ⬅ Back
    </button>
  );
}
