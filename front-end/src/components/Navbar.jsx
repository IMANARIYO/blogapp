import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/index.js";
import { getUserFromLocalStorage } from "../services/userService.js";

const Navbar = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user from localStorage
  const fetchUser = () => {
    const user = getUserFromLocalStorage();
    setUser(user);
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Empty dependency array ensures this only runs on mount

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Clear the user state
    navigate('/login'); // Redirect to login page after logout
    onLogout(); // Call parent onLogout if needed
  };

  // Function to handle login
  const handleLogin = () => {
    fetchUser(); // Refresh user state after login
  };

  return (
    <nav className="bg-gray-200 p-2 flex items-center justify-between rounded-md shadow-md fixed left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border border-gray-600" />
          {/* Uncomment the line below if you want to show text alongside the logo */}
          {/* <span className="text-2xl font-bold ml-2 text-gray-900">BlogApp</span> */}
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-800 text-lg hover:text-blue-600 transition-colors no-underline">Home</Link>
        <Link to="/authors" className="text-gray-800 text-lg hover:text-blue-600 transition-colors no-underline">Authors</Link>
        {user ? (
          <>
            <Link to="/create-post" className="text-gray-800 text-lg hover:text-blue-600 transition-colors no-underline">Create Post</Link>
            <span className="text-gray-600 text-lg">Hello, {user.fullNames}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-lg focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-800 text-lg hover:text-blue-600 transition-colors no-underline">Login</Link>
            <Link to="/signup" className="text-gray-800 text-lg hover:text-blue-600 transition-colors no-underline">Signup</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-800 hover:text-blue-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden absolute top-16 right-4 bg-gray-800 text-white w-48 rounded-md shadow-lg z-50">
          <div className="flex flex-col p-2 space-y-2">
            <Link to="/" onClick={() => { handleMenuClick(); }} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded no-underline text-lg">Home</Link>
            {user ? (
              <>
                <Link to="/create-post" onClick={() => { handleMenuClick(); }} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded no-underline text-lg">Create Post</Link>
                <Link to="/authors" onClick={() => { handleMenuClick(); }} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded no-underline text-lg">Authors</Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    handleMenuClick(); // Close menu after logout
                  }} 
                  className="block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => { handleMenuClick(); }} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded no-underline text-lg">Login</Link>
                <Link to="/signup" onClick={() => { handleMenuClick(); }} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded no-underline text-lg">Signup</Link>
                <Link to="/authors" onClick={() => { handleMenuClick(); }} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded no-underline text-lg">Authors</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
