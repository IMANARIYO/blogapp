import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import App from "./App";
import Footer from "./components/pages/Footer";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Router>
    <App />
    <ToastContainer />
  </Router>,
  document.getElementById('root')
);
