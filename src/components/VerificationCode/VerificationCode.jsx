// src/components/VerificationCode/VerificationCode.jsx
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";

const VerificationCode = ({ email, onVerify, onResend, isVerifying, isResending }) => {

  const [countdown, setCountdown] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    success: false,
    error: "",
    message: ""
  });
  
  // مراجع حقول الإدخال للتركيز
  const inputRefs = useRef([]);

  // مؤقت العد التنازلي لإعادة إرسال الرمز
  useEffect(() => {
    let timer;
    if (countdown > 0 && !resendEnabled) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    
    // تنظيف المؤقت عند إلغاء تركيب المكون
    return () => clearTimeout(timer);
  }, [countdown, resendEnabled]);

  // معالجة تغيير قيمة أحد حقول الإدخال
  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // التحقق من إدخال أرقام فقط
    if (!/^\d*$/.test(value)) return;
    
    // تحديث قيمة الرمز في النموذج
    const newValues = [...formik.values.code.split('')];
    newValues[index] = value;
    formik.setFieldValue('code', newValues.join(''));
    
    // الانتقال إلى الحقل التالي عند الإدخال
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    
    // الانتقال إلى الحقل السابق عند المسح
    if (!value && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  // معالجة لصق الرمز كاملاً
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);
    
    // التحقق من أن البيانات الملصقة تحتوي على 4 أرقام فقط
    if (/^\d{4}$/.test(pasteData)) {
      formik.setFieldValue('code', pasteData);
      
      // ملء جميع الحقول بالأرقام المناسبة
      pasteData.split('').forEach((char, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = char;
        }
      });
      
      // التركيز على الحقل الأخير
      if (inputRefs.current[3]) {
        inputRefs.current[3].focus();
      }
    }
  };

  // معالجة الضغط على مفتاح الحذف
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // إعداد نموذج Formik للتحقق
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values) => {
      try {
        setVerificationStatus({
          success: false,
          error: "",
          message: "جاري التحقق من الرمز..."
        });
        
        await onVerify(values.code);
        
        setVerificationStatus({
          success: true,
          error: "",
          message: "تم التحقق بنجاح!"
        });
      } catch (error) {
        console.error("خطأ في التحقق:", error);
        setVerificationStatus({
          success: false,
          error: error.message || "فشل التحقق من الرمز",
          message: ""
        });
      }
    },
  });

  // معالجة طلب إعادة إرسال الرمز
  const handleResendCode = async () => {
    try {
      setVerificationStatus({
        success: false,
        error: "",
        message: "جاري إعادة إرسال رمز التحقق..."
      });
      
      await onResend();
      
      // إعادة تشغيل العد التنازلي
      setCountdown(60);
      setResendEnabled(false);
      
      setVerificationStatus({
        success: false,
        error: "",
        message: "تم إعادة إرسال رمز التحقق بنجاح!"
      });
    } catch (error) {
      console.error("خطأ في إعادة إرسال الرمز:", error);
      setVerificationStatus({
        success: false,
        error: error.message || "فشل إعادة إرسال رمز التحقق",
        message: ""
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="font-bold text-xl mb-2">التحقق من البريد الإلكتروني</p>
        <p className="text-gray-500 text-sm mb-4">
          تم إرسال رمز التحقق إلى بريدك الإلكتروني:
          <br />
          <span className="font-medium text-black">{email}</span>
        </p>
        <p className="text-gray-500 text-sm">
          يرجى التحقق من صندوق الوارد (والبريد العشوائي) وإدخال الرمز المكون من 4 أرقام
        </p>
      </div>

      {/* عرض رسائل النجاح أو الخطأ */}
      {verificationStatus.message && (
        <div className={`p-2 mb-4 rounded ${verificationStatus.success ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {verificationStatus.message}
        </div>
      )}
      
      {verificationStatus.error && (
        <div className="p-2 mb-4 rounded bg-red-100 text-red-800">
          {verificationStatus.error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 flex-1">
        <div>
          <label className="block text-sm mb-1">رمز التحقق</label>
          <div className="flex gap-2 justify-center" dir="ltr">
            {/* إنشاء 4 حقول إدخال للرمز */}
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                onChange={(e) => handleChange(index, e)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
                inputMode="numeric"
                pattern="[0-9]*"
                dir="ltr"
                value={(formik.values.code[index] || '')}
              />
            ))}
          </div>
          {/* حقل مخفي لتخزين الرمز كاملاً */}
          <input
            type="hidden"
            name="code"
            value={formik.values.code}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>لم تستلم الرمز؟</span>
          {resendEnabled ? (
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-purple-600"
            >
              إعادة إرسال الرمز
            </button>
          ) : (
            <span className="text-gray-500">
              إعادة الإرسال بعد {countdown} ثانية
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isVerifying || formik.values.code.length !== 4}
          className={`w-full ${
            isVerifying || formik.values.code.length !== 4
              ? "bg-gray-400"
              : "bg-purple-600"
          } text-white py-2 rounded-lg mt-auto`}
        >
          {isVerifying ? "جاري التحقق..." : "تأكيد"}
        </button>
      </form>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>ملاحظات مهمة:</strong>
          <br />
          • قد يستغرق وصول الرمز بضع دقائق
          <br />
          • تحقق من مجلد البريد العشوائي/غير المرغوب فيه
          <br />
          • تأكد من إدخال البريد الإلكتروني الصحيح
        </p>
      </div>
    </div>
  );
};

export default VerificationCode;