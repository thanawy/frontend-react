import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { useFormik } from "formik";
import facebookIcon from "../../assets/icons/facebookIcon.svg";
import googleIcon from "../../assets/icons/googleIcon.svg";

const RegistrationForm = ({ onSubmit, isPending, onNext }) => {
  const [expandEmailForm, setExpandEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle email form expansion
  const toggleEmailForm = () => {
    setExpandEmailForm(!expandEmailForm);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        alert("كلمات المرور غير متطابقة");
        return;
      }

      // حذف حقل تأكيد كلمة المرور لأنه غير مطلوب في API
      const { confirmPassword, ...userData } = values;
      onSubmit(userData);
    },
  });

  return (
    <div className="flex-grow flex flex-col justify-between">
      <div className="mb-6">
        <p className="font-bold text-xl md:text-2xl mb-2">
          انشاء حساب جديد
        </p>
        <p className="text-gray-500 text-sm mb-4">
          قم بإدخال بياناتك لبدء رحلتك معنا
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {/* Social login buttons - Side by side */}
        <div className="flex gap-4">
          <button
            type="button"
            className="w-1/2 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition"
          >
            <img src={facebookIcon} alt="facebookIcon" />
            <span>فيسبوك</span>
          </button>

          <button
            type="button"
            className="w-1/2 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition"
          >
            <img src={googleIcon} alt="google-icon" />
            <span>جوجل</span>
          </button>
        </div>

        {/* Email toggle button */}
        <button
          type="button"
          onClick={toggleEmailForm}
          className="flex items-center justify-center gap-2 text-purple-600 py-2"
        >
          <span className="text-medGray">استخدم بريدك الإلكتروني للتسجيل</span>
          {expandEmailForm ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {/* Email registration form - Expandable */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            expandEmailForm ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  الاسم بالكامل
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  placeholder="أدخل اسمك"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  placeholder="أدخل رقم الهاتف"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="يرجى إدخال البريد الإلكتروني"
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="يرجى إدخال كلمة المرور"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3"
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    placeholder="أعد كتابة كلمة المرور"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3"
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4"
                required
              />
              <label htmlFor="terms" className="text-sm">
                أوافق على الشروط والأحكام
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-70"
            >
              {isPending ? 'جاري التسجيل...' : 'إنشاء حساب'}
            </button>
          </form>
        </div>
      </div>

      {/* Continue button when form is closed */}
      {!expandEmailForm && (
        <button
          onClick={onNext}
          className="w-full bg-primary text-white py-3 rounded-lg mt-auto mb-4"
        >
          انطلق للخطوة التالية
        </button>
      )}
    </div>
  );
};

export default RegistrationForm;