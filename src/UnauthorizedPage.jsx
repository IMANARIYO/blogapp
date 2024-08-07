import React from "react";
import { useNavigate } from "react-router-dom";

// src/components/pages/UnauthorizedPage.js

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Go to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-300">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-8">You do not have permission to view this page.</p>
      <div>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600"
        >
          Go Back
        </button>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
