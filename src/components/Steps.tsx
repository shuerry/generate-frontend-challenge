import React from "react";

interface StepProps {
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
}

const Step: React.FC<StepProps> = ({ stepNumber, isActive, isCompleted }) => {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full ${
        isCompleted
          ? "bg-blue-600 text-white"
          : isActive
          ? "bg-white border-4 border-double border-blue-700 text-blue-700"
          : "bg-gray-300 text-white"
      }`}
    >
      {isCompleted ? (
        <span>&#10003;</span>
      ) : (
        <span>{stepNumber}</span>
      )}
    </div>
  );
};

export default Step;
