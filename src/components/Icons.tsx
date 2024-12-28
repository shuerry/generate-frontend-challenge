import React from "react";
import { FaCheck, FaPlus, FaMinus, FaTrash } from "react-icons/fa6";

interface IconProps {
  name: "check" | "plus" | "minus" | "trash";
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24}) => {
  const getIcon = () => {
    switch (name) {
      case "check":
        return <FaCheck size={size} color="black" />;
      case "plus":
        return <FaPlus size={size} color="black" />;
      case "minus":
        return <FaMinus size={size} color="black" />;
      case "trash":
        return <FaTrash size={size} color="black" />;
      default:
        return null;
    }
  };

  return <div>{getIcon()}</div>;
};

export default Icon;
