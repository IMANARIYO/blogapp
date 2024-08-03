import React from "react";

const PostCard = ({ post, onOpenModal }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer p-4 flex flex-col gap-2">
      {/* Image Section */}
      <img
        src={post.image || 'https://via.placeholder.com/300'}
        alt={post.title}
        className="h-56 w-full object-cover rounded-md"
      />

      {/* Content Section */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm">{post.content.slice(0, 150)}...</p>
      </div>

      {/* Author and Time Section */}
      <div className="flex items-center justify-between p-2 border-t border-gray-200">
        <div className="flex items-center">
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
        
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold rounded-md p-2">
          {post.category || 'Category'}
        </span>
      </div>

      {/* Comments Count and View Post Button */}
      <div className="flex justify-between items-center border-t border-gray-100 p-2 ">
        <div className=" text-xs bg-gray-200 px-3 py-1 rounded-md">
          {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}
        </div>
        
        <button
          onClick={onOpenModal}
          className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
