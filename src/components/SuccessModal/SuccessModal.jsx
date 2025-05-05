// src/components/SuccessModal/SuccessModal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import SuccessModalImage from "../../assets/images/successModalImage.svg";
import arrow from "../../assets/icons/arrowThick.png";

const SuccessModal = ({ isOpen }) => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // إذا كان المودال مفتوح، ابدأ العد التنازلي
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    
    // إذا انتهى العد التنازلي، انتقل تلقائياً
    if (isOpen && countdown === 0) {
      const redirectTimer = setTimeout(() => {
        navigate("/home");
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [countdown, isOpen, navigate]);

  // عدم عرض شيء إذا كان المودال مغلقاً
  if (!isOpen) return null;

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 md:p-16 max-w-4xl w-full mx-4 flex flex-col items-center text-center animate-fade-in">
        {/* <CheckCircle className="text-green-500 mb-4" size={64} /> */}
        <h2 className="text-2xl font-bold text-primary mb-6">
          تهانينا! تم إنشاء حسابك بنجاح.
        </h2>
        <p className="mb-8">نحن الآن نقوم بتحضير الدروس المخصصة لك</p>
        <img src={SuccessModalImage} alt="تم التسجيل بنجاح" className="mb-10" />
        <button
          onClick={handleNavigate}
          className="bg-purple-600 text-[18px] flex gap-2 font-[500] text-white py-4 px-8 rounded-lg text-center"
        >
          {countdown > 0 ? `الانتقال الآن (${countdown})` : "الانتقال الآن"}
          <img src={arrow} alt="سهم" />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;