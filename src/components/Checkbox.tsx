import React from "react";

interface CheckboxProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Checkbox: React.FC<CheckboxProps> = ({checked, onChange }) => {
    return (
      <div className="flex items-center space-x-2">
        <input
            name="checkbox"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="w-7 h-7 border-2 border-gray-300 rounded-md"
        />
      </div>
    );
  };
  
export default Checkbox;