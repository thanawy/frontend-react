import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

const CharacterSlider = ({ slides = [], onBack, currentStep }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Each slide should have: image, title, and description
  const currentSlideData = slides[currentSlide] || {};

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6  relative font-cairo">
      {/* Back button - Only show when not on first step */}
      {currentStep > 1 && (
        <button
          onClick={onBack}
          className="justify-end  w-full text-gray-500 flex items-center"
        >
          <span className="text-[20px]">الرجوع</span>
          <ChevronLeft size={24} />
        </button>
      )}
      
      {/* Character image */}
      <div className="w-72 h-64 md:w-128 md:h-120 rounded-3xl  overflow-hidden mb-4 p-10">
        <img
          src={currentSlideData.image}
          alt="Character"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dots indicator */}
      <div className="flex items-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full ${
              index === currentSlide
                ? "w-6 bg-purple-800"
                : "w-2 bg-purple-600"
            }`}
          />
        ))}
      </div>

      {/* Character text - changes with each slide */}
      <div className="text-center mt-8 text-primary">
        <h2 className="text-2xl font-bold mb-4">{currentSlideData.title}</h2>
        <p className="text-sm text-medGray max-w-md">{currentSlideData.description}</p>
      </div>
    </div>
  );
};

export default CharacterSlider;