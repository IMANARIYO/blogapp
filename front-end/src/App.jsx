import "bootstrap/dist/css/bootstrap.min.css";
import AddPostPage from "./components/pages/postspages/AddPostPage";
import AuthorsPage from "./components/pages/authors/AuthorsPage";
import Footer from "./components/pages/Footer";
import LoginPage from "./components/pages/authenthication/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./components/pages/authenthication/SignupPage";
import ViewPostsPage from "./components/pages/postspages/ViewPostsPage";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your other components/pages here

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLogin = () => {
    setOpenLogin(true);
    setIsLoggedIn(true);
  };

  const [user, setUser] = useState(null); // Replace with actual user state management

  const handleLogout = () => {
    // Implement your logout logic here, e.g., remove token from local storage and set isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (

      <div className="overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<ViewPostsPage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/create-post" element={<AddPostPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/author" element={<AuthorsPage />} />
          {/* <Route path="/post/:id" element={<SinglePostViewPage />} /> */}
        </Routes>
       
      </div>
 
  );
}

export default App;
