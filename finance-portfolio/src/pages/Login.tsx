import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div
    className="flex justify-center items-center h-screen bg-gray-100 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1569025690938-a00729c9e1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
    }}
  >
    {/* Overlay to darken background */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Login card */}
    <div className="relative z-10 p-10 bg-white rounded-2xl shadow-2xl w-96">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
        Finance Tracker
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Manage your savings & investments
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-700">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  </div>


  );
}
