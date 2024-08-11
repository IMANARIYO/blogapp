import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 bg-gray-800 text-white fixed top-0 left-0 z-20 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
        aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Left Navigation */}
      <nav
  className={`bg-gray-800 text-white flex flex-col p-6 h-full z-10 transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0 md:static w-64 transition-transform duration-300 ease-in-out`}
  aria-expanded={isSidebarOpen}
  aria-label="Sidebar Navigation"
>
  <ul className="space-y-4 mt-16 md:mt-0">
    <li>
      <Link
        to="/dashboard/summary"
        className={`block text-lg px-4 py-3 rounded-lg transition-colors duration-300 ${
          isActive('/dashboard/summary') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
        }`}
        onClick={toggleSidebar}
      >
        Summary
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/profile"
        className={`block text-lg px-4 py-3 rounded-lg transition-colors duration-300 ${
          isActive('/dashboard/profile') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
        }`}
        onClick={toggleSidebar}
      >
        Profile
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/posts"
        className={`block text-lg px-4 py-3 rounded-lg transition-colors duration-300 ${
          isActive('/dashboard/posts') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
        }`}
        onClick={toggleSidebar}
      >
        Manage Posts
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/comments"
        className={`block text-lg px-4 py-3 rounded-lg transition-colors duration-300 ${
          isActive('/dashboard/comments') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
        }`}
        onClick={toggleSidebar}
      >
        Manage Comments
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/logout"
        className={`block text-lg px-4 py-3 rounded-lg transition-colors duration-300 ${
          isActive('/dashboard/logout') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
        }`}
        onClick={toggleSidebar}
      >
        Logout
      </Link>
    </li>
  </ul>
</nav>

      {/* Main Section */}
      <main
        className={`flex-grow p-6 bg-gray-100 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
