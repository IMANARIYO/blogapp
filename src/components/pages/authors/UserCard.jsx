import React from "react";
import { useNavigate } from "react-router-dom";
import { serverurl } from "../../../services/api";

const AuthorCard = ({ user }) => {
  const navigate = useNavigate();
  const getImageUrl = (imagePath) => {
  
    return imagePath ? `${BASE_URL}${imagePath}` : 'https://via.placeholder.com/500';
  };
  const handleClick = () => {
    if (user && user.id) {
      navigate(`/posts?authorId=${user.id}`); // Navigate to posts with authorId
    } else {
      console.log("User ID is missing!");
    }
  };

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer p-4 flex flex-col items-center"
      onClick={handleClick}
    >
      {/* User Image */}
      <div className="w-16 h-16 overflow-hidden rounded-full">
        <img
          src={user.profilePicture ? `${serverurl}${user.profilePicture}` : 'https://via.placeholder.com/150'}
          alt={user.fullNames}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">{user.fullNames}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-500 text-sm">Posts: {user.posts?.length || 0}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
