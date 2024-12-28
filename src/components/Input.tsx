import React from "react";

interface InputProps {
  label?: string;
  placeHolder: string
  isMissing?: boolean;
  isCompleted: boolean;
  width?: string
}

const Input: React.FC<InputProps> = ({label, placeHolder, isMissing, isCompleted, width }) => {
  return (
    <div>
        <span className="block text-sm font-bold text-gray-900">{label}</span>
        <input
        className={`p-3 w-full text-sm items-center justify-center rounded-lg ${width} ${
            isMissing
            ? "border border-rose-600 text-black focus:outline-blue-500"
            : isCompleted
            ? "border border-green-600 text-black focus:outline-blue-500"
            : "border border-black text-black focus:outline-blue-500"
        }`}
        placeholder={placeHolder}
        name={placeHolder}
        required
        >
        </input>
    </div>
  );


};

export default Input;
