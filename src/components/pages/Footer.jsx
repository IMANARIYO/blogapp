import React from "react";
import { useNavigate } from "react-router-dom";
import { POST_CATEGORIES } from "../../services/postService";

const Footer = ({ onCategorySelect }) => {
  const onCategoryClick = (category) => {
    onCategorySelect(category);
    navigate(`/posts?category=${encodeURIComponent(category)}`);
  };
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0 w-full">
      <div className="flex justify-center">
        <div className="flex space-x-8 overflow-x-auto">
          {POST_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="hover:underline whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
