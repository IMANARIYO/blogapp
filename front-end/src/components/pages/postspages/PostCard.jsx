import React from "react";

const PostCard = ({ post, onOpenModal }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer max-w-sm mx-auto my-4">
      {/* Image Section */}
      <img
        src={post.image || 'https://via.placeholder.com/300'}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">{post.title}</h2>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 text-sm">{post.content.slice(0, 150)}...</p>

        {/* Author and Time */}
        <div className="flex items-start mb-4">
          <img
            src={post.authorImage || 'https://via.placeholder.com/50'}
            alt={post.authorName}
            className="w-12 h-12 rounded-full mr-3 border-2 border-gray-300"
          />
          <div>
            <span className="font-medium text-gray-800 block text-lg">{post.authorName}</span>
            <span className="text-gray-500 text-xs">{post.timePassed}</span>
          </div>
        </div>

        {/* Comments Count and Category */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 text-xs">
            {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold py-1 px-2 rounded-full">
            {post.category || 'Category'}
          </span>
        </div>

        {/* View Post Button */}
        <button
          onClick={onOpenModal}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
