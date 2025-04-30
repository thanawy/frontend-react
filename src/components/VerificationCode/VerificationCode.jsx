import React, { useRef } from 'react';

const VerificationCode = ({ 
  email, 
  onVerify, 
  onResend, 
  isVerifying, 
  isResending 
}) => {
  const [verificationCode, setVerificationCode] = React.useState(['', '', '', '']);
  const codeInputRefs = [useRef(), useRef(), useRef(), useRef()];

  // التعامل مع تغيير رمز التحقق
  const handleVerificationCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // الانتقال للحقل التالي
    if (value && index < 3) {
      codeInputRefs[index + 1].current.focus();
    }
  };

  // التحقق من رمز التفعيل
  const handleVerifyCode = () => {
    const code = verificationCode.join('');
    if (code.length !== 4) {
      alert("يرجى إدخال رمز التحقق كاملاً");
      return;
    }
    
    onVerify(code);
  };

  return (
    <div className="flex-grow flex flex-col justify-between">
      <div className="mb-6">
        <p className="font-bold text-xl md:text-2xl mb-2">
          تحقق من بريدك الالكتروني
        </p>
        <p className="text-gray-500 text-sm mb-4">
          لقد أرسلنا لك رمزاً مكوناً من 4 أرقام عبر البريد الإلكتروني {email}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Verification code inputs */}
        <div className="flex justify-center gap-2 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={codeInputRefs[index]}
              type="text"
              maxLength="1"
              value={verificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
              className={`w-12 h-12 md:w-16 md:h-16 border 
                ${verificationCode[index] ? "border-purple-600 text-purple-600" : "border-gray-300"}
                rounded-lg text-center text-2xl`}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          صلاحية الرمز تنتهي في: ٠٢:١٢
        </p>

        <button 
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          onClick={handleVerifyCode}
          disabled={isVerifying}
        >
          {isVerifying ? 'جاري التحقق...' : 'تحقق'}
        </button>

        <button 
          className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          onClick={onResend}
          disabled={isResending}
        >
          {isResending ? 'جاري إعادة الإرسال...' : 'إعادة الإرسال'}
        </button>
      </div>
    </div>
  );
};

export default VerificationCode;