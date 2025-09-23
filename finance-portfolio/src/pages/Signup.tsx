import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name,email, password);
      navigate("/login");
      setMessage({type: "success", text: `Your Details are Added Successfully`});
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
      <form
        onSubmit={handleSubmit}
        className="relative p-8 bg-white rounded-xl shadow-lg w-96 z-10"
      >
        {message && (
          <div
            className={`mb-4 p-3 rounded border ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-red-100 text-red-800 border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}
  
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-700">
          Finance Tracker
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center">Signup</h2>
  
        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 mb-3 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 mb-3 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 mb-4 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
          Signup
        </button>
  
        <p className="text-sm mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
  
}
