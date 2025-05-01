import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from 'yup';  // يمكنك إضافة مكتبة التحقق Yup إذا كانت متاحة
import facebookIcon from "../../assets/icons/facebookIcon.svg";
import googleIcon from "../../assets/icons/googleIcon.svg";

const RegistrationForm = ({ onSubmit, isPending, onNext }) => {
  const [expandEmailForm, setExpandEmailForm] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleEmailForm = () => {
    setExpandEmailForm(!expandEmailForm);
  };

  // تعريف مخطط التحقق (إذا كانت مكتبة Yup متاحة)
  const validationSchema = Yup?.object({
    email: Yup?.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    displayName: Yup?.string().required("الاسم مطلوب"),
    phoneNumber: Yup?.string().required("رقم الهاتف مطلوب"),
    password: Yup?.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
    confirmPassword: Yup?.string().oneOf([Yup.ref('password'), null], "كلمات المرور غير متطابقة")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        alert("كلمات المرور غير متطابقة");
        return;
      }
      const { confirmPassword, ...userData } = values;
      onSubmit(userData);
    },
  });

  // منع المستخدم من الانتقال للخطوة التالية بدون تسجيل
  const handleNextWithoutForm = () => {
    alert("الرجاء تسجيل بياناتك أولاً");
    setExpandEmailForm(true);
  };

  // إظهار أخطاء التحقق
  const getFieldError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div className="text-red-500 text-xs mt-1">{formik.errors[fieldName]}</div>
    ) : null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <p className="font-bold text-xl mb-1">انشاء حساب جديد</p>
        <p className="text-gray-500 text-sm">قم بإدخال بياناتك لبدء رحلتك معنا</p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {/* Social login buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-1 text-gray-700 text-sm"
          >
            <img src={facebookIcon} alt="facebookIcon" className="w-4 h-4 bg-red-100" />
            <span>فيسبوك</span>
          </button>

          <button
            type="button"
            className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-1 text-gray-700 text-sm"
          >
            <img src={googleIcon} alt="google-icon" className="w-4 h-4" />
            <span>جوجل</span>
          </button>
        </div>

        {/* Email toggle button */}
        <button
          type="button"
          onClick={toggleEmailForm}
          className="flex items-center justify-center gap-1 text-purple-600 py-1 text-sm"
        >
          <span className="text-gray-500">استخدم بريدك الإلكتروني للتسجيل</span>
          {expandEmailForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Email registration form */}
        <div className={`${expandEmailForm ? "block" : "hidden"}`}>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm mb-1">الاسم بالكامل</label>
                <input
                  type="text"
                  name="displayName"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل اسمك"
                  className={`w-full border ${
                    formik.touched.displayName && formik.errors.displayName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg py-1 px-3 text-sm`}
                  required
                />
                {getFieldError('displayName')}
              </div>
              <div>
                <label className="block text-sm mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل رقم الهاتف"
                  className={`w-full border ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg py-1 px-3 text-sm`}
                  required
                />
                {getFieldError('phoneNumber')}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="أدخل البريد الإلكتروني"
                className={`w-full border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg py-1 px-3 text-sm`}
                required
              />
              {getFieldError('email')}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm mb-1">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="أدخل كلمة المرور"
                    className={`w-full border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg py-1 px-3 text-sm pr-8`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {getFieldError('password')}
              </div>
              <div>
                <label className="block text-sm mb-1">تأكيد كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="أعد إدخال كلمة المرور"
                    className={`w-full border ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg py-1 px-3 text-sm pr-8`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {getFieldError('confirmPassword')}
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
              className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm mt-auto"
            >
              {isPending ? 'جاري التسجيل...' : 'إنشاء حساب'}
            </button>
          </form>
        </div>

        {/* Continue button when form is closed - تم تعديله ليطلب من المستخدم التسجيل أولاً */}
        {!expandEmailForm && (
          <button
            onClick={handleNextWithoutForm}
            className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm mt-auto"
          >
            انطلق للخطوة التالية
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;