import React from "react";
import { POST_CATEGORIES } from "./../../services/postService";

function Footer() {
return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full left-0 right-0">
      <div className=" flex">
        <div className="flex space-x-8 items-center justify-center">
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