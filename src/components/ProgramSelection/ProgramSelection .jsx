import React from 'react';

const ProgramSelection = ({ categories, handleCategorySelect, onNext, selectedProgram }) => {
  return (
    <div className="flex-grow flex flex-col justify-between">
      <div className="mb-6">
        <p className="font-bold text-xl md:text-2xl mb-2">
          انشاء حساب جديد
        </p>
        <p className="text-medGray mb-4">
          قم بإدخال بياناتك لبدء رحلتك معنا
        </p>
        <p className="font-[500] text-xl md:text-2xl">اختر الشعبه</p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`border rounded-lg px-2 md:px-4 py-4 md:py-6 flex flex-col items-center justify-center cursor-pointer ${
              category.selected
                ? "border-primary bg-white"
                : "border-gray-200"
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center mb-2 ${
                category.selected
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
            >
              {category.selected && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <span
              className={
                category.selected ? "text-primary" : "text-gray-600"
              }
            >
              {category.label}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedProgram}
        className={`w-full bg-primary text-white py-3 rounded-lg mb-4 ${
          !selectedProgram ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        انطلق للخطوة التالية
      </button>
    </div>
  );
};

export default ProgramSelection;