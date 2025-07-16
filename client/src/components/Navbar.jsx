import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Truck, User, Menu, X, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    `relative px-4 py-2 rounded-md transition duration-200 text-lg font-medium
    ${
      isActive
        ? "text-white bg-blue-700 shadow-inner"
        : "text-blue-100 hover:text-white hover:bg-blue-600"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-4 py-2 text-base font-medium rounded-md transition-colors duration-200
    ${
      isActive
        ? "text-blue-700 bg-blue-100"
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg font-sans z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center text-white text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform"
            >
              <Truck className="h-8 w-8 mr-2 text-teal-300" />
              LogisticsApp
            </NavLink>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/track" className={navLinkClasses}>
              Track
            </NavLink>
            <NavLink to="/order" className={navLinkClasses}>
              Order
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={navLinkClasses}>
              Contact Us
            </NavLink>
          </div>

          {/* Right - Profile */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-blue-100 hover:text-white hover:bg-blue-700 transition duration-200"
              >
                <User className="h-6 w-6" />
                {isAuthenticated && user?.name && (
                  <span className="text-white font-medium">{user.name}</span>
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 animate-fade-in-down">
                  {isAuthenticated ? (
                    <>
                      <NavLink
                        to="/my-orders"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        My Orders
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <NavLink
            to="/"
            className={mobileNavLinkClasses}
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/track"
            className={mobileNavLinkClasses}
            onClick={toggleMobileMenu}
          >
            Track
          </NavLink>
          <NavLink
            to="/order"
            className={mobileNavLinkClasses}
            onClick={toggleMobileMenu}
          >
            Order
          </NavLink>
          <NavLink
            to="/about"
            className={mobileNavLinkClasses}
            onClick={toggleMobileMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={mobileNavLinkClasses}
            onClick={toggleMobileMenu}
          >
            Contact Us
          </NavLink>

          <div className="border-t mt-2 pt-2">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-gray-700 font-semibold flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user?.name || "User"}</span>
                </div>
                <NavLink
                  to="/my-orders"
                  className="w-full flex items-center justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  <Truck className="h-5 w-5 mr-2" />
                  My Orders
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="w-full flex items-center justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <NavLink
                  to="/login"
                  className="w-full flex items-center justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="w-full flex items-center justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
