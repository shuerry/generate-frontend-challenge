import React from "react";

interface ButtonProps {
    label: string;
    onClick?: () => void;
}


const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
        type="submit"
        onClick={onClick}
        className={`px-6 py-3 rounded-full font-bold text-center 
            border-2 border-slate-500 text-slate-500 cursor-pointer hover:border-slate-950 hover:text-slate-950`}
        >
        {label}
      </button>
    );
  };
  
export default Button;