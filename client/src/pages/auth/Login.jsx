import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { toast } from "react-toastify"; // Assuming you're using react-toastify
import { LogIn, Mail, Lock, XCircle, CheckCircle, Loader } from 'lucide-react'; // Added lucide-react icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true); // Set loading to true
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { token, user } = res.data;

      loginUser(user, token);

      toast.success("Login successful!");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans text-gray-800">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-sm space-y-6 transform transition-all duration-300 ease-in-out scale-95"
      >
        <div className="text-center">
          <LogIn className="h-20 w-20 mx-auto text-blue-600 mb-4 drop-shadow-lg animate-bounce-once" />
          <h2 className="text-3xl font-extrabold text-blue-800 mb-2 leading-tight">
            Welcome Back!
          </h2>
          <p className="text-md text-gray-600">Sign in to your account.</p>
        </div>

        {message && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg flex items-center justify-center shadow-md animate-fade-in text-sm">
            <XCircle className="h-5 w-5 mr-3" />
            <p className="font-medium">{message}</p>
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="pl-12 pr-4 py-3 border border-gray-300 rounded-full w-full text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       shadow-sm transition-all duration-200"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="pl-12 pr-4 py-3 border border-gray-300 rounded-full w-full text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       shadow-sm transition-all duration-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg
                     bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800
                     transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-3 h-6 w-6" />
              Logging in...
            </>
          ) : (
            <>
              Login
              <LogIn className="ml-3 h-6 w-6" />
            </>
          )}
        </button>

        {/* Added "Don't have an account?" link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
