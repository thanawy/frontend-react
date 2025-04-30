import React from 'react';

const StepsProgress = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8 gap-5">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-4 md:gap-10  text-center sm:mb-10 lg:mb-0 lg:mt-4">
          {/* Step number and label container */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 text-xl md:text-4xl ${
                currentStep === step.id
                  ? "bg-gradient-to-b from-[#8D55F9] to-[#4806C8] text-white border-purple-600"
                  : currentStep > step.id
                  ? "bg-gray-200 text-gray-600 border-gray-200"
                  : "bg-white text-gray-400 border-primary border-[1px]"
              }`}
            >
              {step.id}
            </div>
            {/* Step label below the number */}
            <span
              className={`mt-2 text-sm md:text-xl ${
                currentStep === step.id
                  ? "bg-gradient-to-r from-[#8D55F9] to-[#4806C8] font-bold bg-clip-text text-transparent"
                  : currentStep > step.id
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div className="w-8 md:w-16 h-0.5 bg-gray-300 lg:mb-6 mb-4 sm:me-4 lg:me-10 lg:ms-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepsProgress;