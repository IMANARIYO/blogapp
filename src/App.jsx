import "bootstrap/dist/css/bootstrap.min.css";
import AddPostPage from "./components/pages/postspages/AddPostPage";
import AdminDashboard from "./components/pages/dashboardpages/AdminDashoard";
import AdminDashoard from "./components/pages/dashboardpages/AdminDashoard";
import AuthorsPage from "./components/pages/authors/AuthorsPage";
import Dashboard from "./components/pages/dashboardpages/UserDashboard";
import EditPostPage from "./components/pages/postspages/EditPostPage";
import Footer from "./components/pages/Footer";
import ForgetPasswordPage from "./components/pages/authenthication/ForgetPasswordPage";
import LoginPage from "./components/pages/authenthication/LoginPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/pages/authenthication/PrivateRoute";
import React, { useState } from "react";
import SignupPage from "./components/pages/authenthication/SignupPage";
import UserDashboard from "./components/pages/dashboardpages/UserDashboard";
import ViewPostsPage from "./components/pages/postspages/ViewPostsPage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

export function App() {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.access_token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('role', userData.user.role);
    setUser(userData.user);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/login');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
   
      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="pt-16 pb-20">
          <Routes>
            <Route path="/" element={<ViewPostsPage />} />
            <Route path="/posts" element={<ViewPostsPage selectedCategory={selectedCategory} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/create-post" element={<AddPostPage />} />
            <Route path="/edit-post/:id" element={<EditPostPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/author" element={<AuthorsPage />} />
       
            <Route path="/unauthorized" element={<div>Unauthorized</div>} />
          
           {/* Private Routes for all authenticated users */}
           <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
            <Route path="/dashboard/*" element={<UserDashboard />} />
          </Route>

         {/* Private Routes for admin users only */}
         <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          </Route>
          </Routes>
        </div>
        <Footer onCategorySelect={handleCategorySelect} />
      </div>
    
  );
}

export default App;
