import React from "react";

const PostCard = ({ post, onOpenModal }) => {
  const BASE_URL = 'http://localhost:4444';
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer p-4 flex flex-col gap-4 ">
      {/* Image Section */}
      <div className="w-full h-56 overflow-hidden rounded-md">
        <img
          src={post.image ? `${BASE_URL}${post.image}` : 'https://via.placeholder.com/300'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 truncate">{post.title}</h2>

        {/* Content Preview */}
        <p className="text-gray-600 text-base line-clamp-3">{post.content}</p>
      </div>

      {/* Author and Time Section */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center">
          <img
            src={post.author.profilePicture || 'https://via.placeholder.com/50'}
            alt={post.author.fullNames}
            className="w-10 h-10 rounded-full mr-3 border-2 border-gray-300"
          />
          <div>
            <span className="font-medium text-gray-800 text-lg">{post.author.fullNames}</span>
            <span className="text-gray-500 text-sm block">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-3 py-1">
          {post.category || 'Category'}
        </span>
      </div>

      {/* Comments Count and View Post Button */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-2">
        <div className="text-sm bg-gray-200 px-3 py-1 rounded-full">
          {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
        </div>
        
        <button
          onClick={() => onOpenModal(post)}
          className="bg-blue-600 text-white py-1 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
