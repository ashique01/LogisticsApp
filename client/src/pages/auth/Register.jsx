import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify"; // Assuming you're using react-toastify
import { UserPlus, Mail, Lock, User, MapPin, Phone, XCircle, CheckCircle, Loader } from 'lucide-react'; // Added lucide-react icons

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true); // Set loading to true
    try {
      await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        address,
        phone,
      });
      setMessage("Registration successful! You can now login.");
      toast.success("Registration successful! Redirecting to login..."); // Show toast on success
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage); // Show toast on error
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans text-gray-800">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-sm space-y-6 transform transition-all duration-300 ease-in-out scale-95"
      >
        <div className="text-center">
          <UserPlus className="h-20 w-20 mx-auto text-teal-600 mb-4 drop-shadow-lg animate-bounce-once" />
          <h2 className="text-3xl font-extrabold text-blue-800 mb-2 leading-tight">
            Create Your Account
          </h2>
          <p className="text-md text-gray-600">Join LogisticsApp today!</p>
        </div>

        {message && (
          <div className={`px-5 py-3 rounded-lg flex items-center justify-center shadow-md animate-fade-in text-sm
            ${message.includes("successful") ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"}`}>
            {message.includes("successful") ? (
              <CheckCircle className="h-5 w-5 mr-3" />
            ) : (
              <XCircle className="h-5 w-5 mr-3" />
            )}
            <p className="font-medium">{message}</p>
          </div>
        )}

        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="pl-12 pr-4 py-3 border border-gray-300 rounded-full w-full text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       shadow-sm transition-all duration-200"
            required
          />
        </div>

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
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Full Address"
            className="pl-12 pr-4 py-3 border border-gray-300 rounded-full w-full text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       shadow-sm transition-all duration-200"
            required
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="tel" // Changed to tel for phone number input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
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
                     bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800
                     transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-3 h-6 w-6" />
              Registering...
            </>
          ) : (
            <>
              Register
              <UserPlus className="ml-3 h-6 w-6" />
            </>
          )}
        </button>

        {/* Already have an account? link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
