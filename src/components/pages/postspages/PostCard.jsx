import React, { useState } from "react";
import SinglePostModal from "./SinglePostModal";
import { useNavigate } from "react-router-dom";
import { serverurl } from "../../../services/api";

// Function to get image URL with a fallback placeholder
const BASE_URL = serverurl;
const getImageUrl = (imagePath) => {

  return imagePath ? `${BASE_URL}${imagePath}` : 'https://via.placeholder.com/500';
};


const PostCard = ({ post, onOpenModal }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Navigate to posts by category
  const handleCategoryClick = (e) => {
    e.stopPropagation();
    navigate(`/posts?category=${encodeURIComponent(post.category)}`);
  };

  // Navigate to posts by author
  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(`/posts?authorId=${post.author.id}`);
  };

  // Open post modal
  const handleViewPostClick = (e) => {
    e.stopPropagation();
    onOpenModal(post);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer p-4 flex flex-col gap-4'>
      {/* Image Section */}
      <div className='w-full h-56 overflow-hidden rounded-md'>
        <img
          src={getImageUrl(post.image)}
          alt={post.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
        />
      </div>

      {/* Content Section */}
      <div className='flex flex-col gap-2'>
        {/* Title */}
        <h2 className='text-2xl font-semibold text-gray-900 truncate'>
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className='text-gray-600 text-base line-clamp-3'>
          {post.content}
        </p>
      </div>

      {/* Author and Time Section */}
      <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
        <div
          className='flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg'
          onClick={handleAuthorClick}
        >
          <img
            src={post.author.profilePicture}
            alt={post.author.fullNames}
            className='w-10 h-10 rounded-full mr-3 border-2 border-gray-300'
          />
          <div>
            <span className='font-medium text-gray-800 text-lg'>
              {post.author.fullNames}
            </span>
            <span className='text-gray-500 text-sm block'>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <span
          className='bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-3 py-1 cursor-pointer hover:bg-blue-200'
          onClick={handleCategoryClick}
        >
          {post.category || 'Category'}
        </span>
      </div>

      {/* Comments Count and View Post Button */}
      <div className='flex justify-between items-center border-t border-gray-200 pt-2'>
        <div
          onClick={handleViewPostClick}
          className='text-sm bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300'
        >
          {post.comments.length}{' '}
          {post.comments.length === 1 ? 'Comment' : 'Comments'}
        </div>

        <button
          // onClick={handleViewPostClick}
          size='small'
          color='primary'
          onClick={() => onOpenModal(post)}
          className='bg-blue-600 text-white py-1 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          View Post
        </button>
      </div>

      {/* Single Post Modal */}
      {/* <SinglePostModal
        post={post}
        show={!post}
        handleClose={() => onOpenModal(null)} 
      /> */}
    </div>
  );
};

export default PostCard;
