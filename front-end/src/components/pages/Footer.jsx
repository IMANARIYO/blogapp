import React from "react";
import { POST_CATEGORIES } from "./../../services/postService";

function Footer() {
return (
    <footer className="bg-gray-800 text-white p-4 absolute bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-justify-center">
        <div className="flex space-x-8">
          {POST_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="hover:underline"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );}

export default Footer