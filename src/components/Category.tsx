import React from "react";

interface CategoryProps {
    label: string;
}


const Category: React.FC<CategoryProps> = ({ label }) => {
    return (
        <span
        className="px-3 py-1 h-8 rounded-md text-center 
            bg-violet-300 text-black"
        >
        {label}
      </span>
    );
  };
  
export default Category;