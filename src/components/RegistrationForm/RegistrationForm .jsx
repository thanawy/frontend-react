import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import facebookIcon from "../../assets/icons/facebookIcon.svg";
import googleIcon from "../../assets/icons/googleIcon.svg";
import googlefill from "../../assets/icons/googleFill.png";
import facebookfill from "../../assets/icons/facebookFill.png";


const RegistrationForm = ({ onSubmit, isPending, onNext }) => {
  const [expandEmailForm, setExpandEmailForm] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  const toggleEmailForm = () => {
    setExpandEmailForm(!expandEmailForm);
  };

  // تعريف مخطط التحقق
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

  // تكوينات الحركة الجديدة للأزرار
  const buttonContainerVariants = {
    expanded: { 
      flexDirection: "row",
      transition: { 
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    collapsed: { 
      flexDirection: "column",
      transition: { 
        staggerChildren: 0.05,
        when: "afterChildren"
      }
    }
  };

  const buttonVariants = {
    expanded: {
      width: "50%",
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    collapsed: {
      width: "100%",
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  // تكوينات الحركة الجديدة للنموذج
  const formVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -10,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        when: "afterChildren"
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const formItemVariants = {
    hidden: { 
      y: 15, 
      opacity: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    }
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="mb-4">
        <p className="font-bold text-xl mb-1">انشاء حساب جديد</p>
        <p className="text-gray-500 text-sm">قم بإدخال بياناتك لبدء رحلتك معنا</p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <LayoutGroup>
          {/* أزرار تسجيل الدخول الاجتماعي مع حركة محسنة */}
          <motion.div 
            className="flex gap-2"
            variants={buttonContainerVariants}
            initial={false}
            animate={expandEmailForm ? "expanded" : "collapsed"}
            layout
          >
            <motion.button
              key="facebook"
              variants={buttonVariants}
              type="button"
              className="border border-[#1877F2] hover:bg-[#1877F2] rounded-lg py-2 flex items-center justify-center gap-4 font-[600] hover:text-white overflow-hidden"
              layout
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              onHoverStart={() => setIsFacebookHovered(true)}
              onHoverEnd={() => setIsFacebookHovered(false)}
            >
              <motion.img 
                src={isFacebookHovered?facebookfill:facebookIcon} 
                alt="facebookIcon" 
                className="w-6 h-6 rounded-full "
                layout
              />
              <motion.span>
                فيسبوك
              </motion.span>
            </motion.button>

            <motion.button
              key="google"
              variants={buttonVariants}
              type="button"
              className="border border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all duration-300 rounded-lg py-2 flex items-center justify-center gap-8 font-[600] overflow-hidden"
              layout
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              onHoverStart={() => setIsGoogleHovered(true)}
              onHoverEnd={() => setIsGoogleHovered(false)}
            >
              <motion.img 
                  src={isGoogleHovered?googlefill:googleIcon} 
                alt="google-icon" 
                className="w-6 h-6 rounded-full     "
                layout
              />
              <motion.span>
                جوجل
              </motion.span>
            </motion.button>
          </motion.div>

          {/* زر تبديل البريد الإلكتروني مع حركة محسنة */}
          <motion.button
            layout
            type="button"
            onClick={toggleEmailForm}
            className="flex items-center justify-center gap-1 text-purple-600 py-1 text-sm"
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      
          >
            <motion.span className="text-gray-500">
              استخدم بريدك الإلكتروني للتسجيل
            </motion.span>
            <motion.div
              animate={{ 
                rotate: expandEmailForm ? 180 : 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 15
              }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>

          {/* نموذج التسجيل بالبريد الإلكتروني مع حركات محسنة */}
          <AnimatePresence mode="wait">
            {expandEmailForm && (
              <motion.div
                key="form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="overflow-hidden"
                layout
              >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                  <motion.div variants={formItemVariants} className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-primary block text-sm mb-1">الاسم بالكامل</label>
                      <input
                        type="text"
                        name="displayName"
                        value={formik.values.displayName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="أدخل اسمك"
                        className={`w-full py-2 bg-[#F9F9F9] border ${
                          formik.touched.displayName && formik.errors.displayName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg py-1 px-3 text-sm`}
                        required
                      />
                      {getFieldError('displayName')}
                    </div>
                    <div>
                      <label className="font-bold text-primary block text-sm mb-1">رقم الهاتف</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="أدخل رقم الهاتف"
                        className={`w-full py-2 bg-[#F9F9F9] border ${
                          formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg py-1 px-3 text-sm`}
                        required
                      />
                      {getFieldError('phoneNumber')}
                    </div>
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label className="font-bold text-primary block text-sm mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="أدخل البريد الإلكتروني"
                      className={`w-full py-2 bg-[#F9F9F9] border ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg py-1 px-3 text-sm`}
                      required
                    />
                    {getFieldError('email')}
                  </motion.div>

                  <motion.div variants={formItemVariants} className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-primary block text-sm mb-1">كلمة المرور</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="أدخل كلمة المرور"
                          className={`w-full py-2 bg-[#F9F9F9] border ${
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
                          <motion.div 
                            initial={false}
                            animate={{ opacity: [0.5, 1] }}
                            transition={{ duration: 0.2 }}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </motion.div>
                        </button>
                      </div>
                      {getFieldError('password')}
                    </div>
                    <div>
                      <label className="font-bold text-primary block text-sm mb-1">تأكيد كلمة المرور</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="أعد إدخال كلمة المرور"
                          className={`w-full py-2 bg-[#F9F9F9] border ${
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
                          <motion.div 
                            initial={false}
                            animate={{ opacity: [0.5, 1] }}
                            transition={{ duration: 0.2 }}
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </motion.div>
                        </button>
                      </div>
                      {getFieldError('confirmPassword')}
                    </div>
                  </motion.div>

                  <motion.div variants={formItemVariants} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-secondary">
                      أوافق على الشروط و الأحكام
                    </label>
                  </motion.div>

                  <motion.button
                    variants={formItemVariants}
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm mt-auto cursor-pointer"
                    // whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  >
                    {isPending ? 'جاري التسجيل...' : 'إنشاء حساب'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* زر المتابعة عندما يكون النموذج مغلقًا مع تحسين ظهوره */}
          <AnimatePresence>
            {!expandEmailForm && (
              <motion.button
                layout
                onClick={handleNextWithoutForm}
                className="w-full bg-primary text-white py-3 rounded-lg mb-4"
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                انطلق للخطوة التالية
              </motion.button>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default RegistrationForm;