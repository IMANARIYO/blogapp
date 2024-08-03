import "bootstrap/dist/css/bootstrap.min.css";
import AddPostPage from "./components/pages/postspages/AddPostPage";
import AuthorsPage from "./components/pages/authors/AuthorsPage";
import Footer from "./components/pages/Footer";
import ForgetPasswordPage from "./components/pages/authenthication/ForgetPasswordPage";
import LoginPage from "./components/pages/authenthication/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./components/pages/authenthication/SignupPage";
import ViewPostsPage from "./components/pages/postspages/ViewPostsPage";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  const navigate = useNavigate();
// Retrieve user data from local storage
useEffect(() => {
  // Retrieve user from local storage
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
;
  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.access_token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setUser(userData.user);
    setIsLoggedIn(true);
    navigate('/'); // Redirect to home page or desired page after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    
      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<ViewPostsPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/create-post" element={<AddPostPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/author" element={<AuthorsPage />} />
         

          {/* <Route path="/post/:id" element={<SinglePostViewPage />} /> */}
        </Routes>
        <Footer />
      </div>
  
  );
}

export default App;
