import React from "react";
import Step from "./Steps"; // Import the Step component

interface StepperProps {
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Step 1 */}
      <div className="flex items-center space-x-2">
        <Step
          stepNumber={1}
          isActive={activeStep === 1}
          isCompleted={activeStep > 1}
        />
        <span className={`text-sm ${activeStep === 1 ? "text-black-800" : "text-gray-400"}`}>
          Add to cart
        </span>
      </div>

      {/* Connector Line */}
      <div
        className={`h-[2px] flex-1 ${
          activeStep > 1 ? "bg-blue-600" : "bg-gray-300"
        }`}
      />

      {/* Step 2 */}
      <div className="flex items-center space-x-2">
        <Step
          stepNumber={2}
          isActive={activeStep === 2}
          isCompleted={activeStep > 2}
        />
        <span className={`text-sm ${activeStep === 2 ? "text-blue-600" : "text-gray-400"}`}>
          Payment
        </span>
      </div>

      {/* Connector Line */}
      <div
        className={`h-[2px] flex-1 ${
          activeStep > 2 ? "bg-blue-600" : "bg-gray-300"
        }`}
      />

      {/* Step 3 */}
      <div className="flex items-center space-x-2">
        <Step
          stepNumber={3}
          isActive={activeStep === 3}
          isCompleted={activeStep > 3}
        />
        <span className={`text-sm ${activeStep === 3 ? "text-blue-600" : "text-gray-400"}`}>
          Complete
        </span>
      </div>
    </div>
  );
};

export default Stepper;
