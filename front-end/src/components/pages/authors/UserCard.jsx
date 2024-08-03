import React from "react";

const AuthorCard = ({ author }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4">
      <img
        src={author.profileImage}
        alt={author.name}
        className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{author.name}</h2>
      <p className="text-gray-600 text-sm">{author.posts} Posts</p>
    </div>
  );
};

export default AuthorCard;
