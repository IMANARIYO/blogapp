import "bootstrap/dist/css/bootstrap.min.css";
import AddPostPage from "./components/pages/postspages/AddPostPage";
import AuthorsPage from "./components/pages/authors/AuthorsPage";
import CommentsManagement from "./components/pages/dashboardpages/CommentsManagement";
import Dashboard from "./components/pages/dashboardpages/dashboard";
import EditPostPage from "./components/pages/postspages/EditPostPage";
import Footer from "./components/pages/Footer";
import ForgetPasswordPage from "./components/pages/authenthication/ForgetPasswordPage";
import LoginPage from "./components/pages/authenthication/LoginPage";
import Navbar from "./components/Navbar";
import PostsManagement from "./components/pages/dashboardpages/PostsManagement";
import PrivateRoute from "./components/pages/authenthication/PrivateRoute";
import React, { useEffect, useState } from "react";
import SignupPage from "./components/pages/authenthication/SignupPage";
import UsersManagement from "./components/pages/dashboardpages/UsersManagement";
import ViewPostsPage from "./components/pages/postspages/ViewPostsPage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "./services/userService";

export function App() {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();



  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.access_token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setUser(userData.user);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (

      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<ViewPostsPage selectedCategory={selectedCategory} />} />
          <Route path="/posts" element={<ViewPostsPage selectedCategory={selectedCategory} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/create-post" element={<AddPostPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/author" element={<AuthorsPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute >
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-posts"
            element={
              <PrivateRoute >
                <PostsManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-users"
            element={
              <PrivateRoute >
                <UsersManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-comments"
            element={
              <PrivateRoute >
                <CommentsManagement />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer onCategorySelect={handleCategorySelect} />
      </div>
   
  );
}

export default App;
