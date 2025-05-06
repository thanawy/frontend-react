import { useState, useContext } from "react";
import { ChevronLeft, ChevronDown, Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext";
import CharacterSlider from "../../components/CharacterSlider/CharacterSlider";
import poki1 from "../../assets/images/poki1.svg";
import poki2 from "../../assets/images/poki2.svg";
import poki3 from "../../assets/images/poki3.svg";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import facebookIcon from "../../assets/icons/facebookIcon.svg";
import googleIcon from "../../assets/icons/googleIcon.svg";
import googlefill from "../../assets/icons/googleFill.png";
import facebookfill from "../../assets/icons/facebookFill.png";

const sliderData = [
  {
    image: poki1,
    title: "!أهلاً في ثانوي.آي",
    description:
      "ثانوي.آي هيكون صاحبك في رحلة ثانوية عامة و هيساعدك تطور كل يوم. خلينا نغير طريقة استعدادك للامتحانات!",
  },
  {
    image: poki2,
    title: "تعلم وفقًا لمستواك",
    description:
      "ثانوي-آي يفهم مستواك الدراسي ويقدم لك تمارين وأسئلة مخصصة تساعدك على التحسن خطوة بخطوة",
  },
  {
    image: poki3,
    title: "تابع تقدمك واحصل على مكافآت",
    description:
      "حلّ الأسئلة، اجمع النقاط، وافتح إنجازات جديدة مع ثانوي-آي! التعلم أصبح أكثر متعة وتحفيزًا من أي وقت مضى",
  },
];

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [expandEmailForm, setExpandEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  const toggleEmailForm = () => {
    setExpandEmailForm(!expandEmailForm);
  };

  // حالة النموذج
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // التعامل مع تغييرات الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // استخدام React Query mutation لتسجيل الدخول
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      try {
        // التحقق من اكتمال البيانات المطلوبة
        if (!credentials.email || !credentials.password) {
          throw new Error("يرجى تعبئة جميع الحقول المطلوبة");
        }

        // تنفيذ عملية تسجيل الدخول
        return await login(credentials);
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
      navigate("/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setErrorMessage(
        "حدث خطأ أثناء تسجيل الدخول: " +
          (error.response?.data?.message || error.message || "بيانات غير صحيحة")
      );
    },
  });

  // معالج تقديم النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    loginMutation.mutate(formData);
  };

  // تكوينات الحركة لأزرار التسجيل الاجتماعي
  const buttonContainerVariants = {
    expanded: {
      flexDirection: "row",
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    collapsed: {
      flexDirection: "column",
      transition: {
        staggerChildren: 0.05,
        when: "afterChildren",
      },
    },
  };

  const buttonVariants = {
    expanded: {
      width: "50%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    collapsed: {
      width: "100%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // تكوينات الحركة للنموذج
  const formVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        when: "afterChildren",
      },
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
        staggerChildren: 0.05,
      },
    },
  };

  const formItemVariants = {
    hidden: {
      y: 15,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row-reverse lg:h-dvh w-full font-cairo px-4 py-4 lg:px-10">
      {/* قسم الشرائح التوضيحية - يظهر فقط على الشاشات الكبيرة */}
      <div className="hidden lg:block md:w-1/2">
        <CharacterSlider slides={sliderData} />
      </div>

      {/* قسم النموذج */}
      <div className="w-full lg:w-1/2 p-4 md:p-10 flex flex-col">
        {/* شريط الرأس */}
        <div className="flex lg:flex-row flex-row-reverse justify-center items-center mb-4 md:mb-8">
          <div className="text-primary text-2xl lg:text-4xl mb-6 sm:mb-16 lg:mb-4 me-10 font-bold">
            ثانوي.آي
          </div>
        </div>

        {/* عنوان الصفحة */}
        <div className="text-start mb-8">
          <h1 className="text-2xl font-bold text-primary">تسجيل الدخول</h1>
          <p className="text-sm text-gray-500 mt-2">
            سجّل الدخول للوصول إلى المحتوى التعليمي الخاص بك
          </p>
        </div>

        {/* عرض رسائل الخطأ */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm md:text-base">
            {errorMessage}
          </div>
        )}

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
                  src={isFacebookHovered ? facebookfill : facebookIcon}
                  alt="facebookIcon"
                  className="w-6 h-6 rounded-full"
                  layout
                />
                <motion.span>فيسبوك</motion.span>
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
                  src={isGoogleHovered ? googlefill : googleIcon}
                  alt="google-icon"
                  className="w-6 h-6 rounded-full"
                  layout
                />
                <motion.span>جوجل</motion.span>
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
              أو قم بتسجيل الدخول باستخدام
              </motion.span>
              <motion.div
                animate={{
                  rotate: expandEmailForm ? 180 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>

            {/* نموذج تسجيل الدخول بالبريد الإلكتروني مع حركات محسنة */}
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <motion.div variants={formItemVariants}>
                      <label className="font-bold text-primary block text-sm mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="أدخل البريد الإلكتروني"
                        className="w-full py-2 bg-[#F9F9F9] border border-gray-300 rounded-lg py-1 px-3 text-sm"
                      />
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <label className="font-bold text-primary block text-sm mb-1">
                        كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="أدخل كلمة المرور"
                          className="w-full py-2 bg-[#F9F9F9] border border-gray-300 rounded-lg py-1 px-3 text-sm pr-8"
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
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </motion.div>
                        </button>
                      </div>
                    </motion.div>

                    {/* رابط نسيت كلمة المرور */}
                    <motion.div
                      variants={formItemVariants}
                      className="text-left mb-2"
                    >
                      <a
                        href="/forgot-password"
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        نسيت كلمة المرور؟
                      </a>
                    </motion.div>

                    <motion.button
                      variants={formItemVariants}
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm mt-auto cursor-pointer"
                      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                    >
                      {loginMutation.isPending
                        ? "جاري تسجيل الدخول..."
                        : "تسجيل الدخول"}
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
                  onClick={() => setExpandEmailForm(true)}
                  className="w-full bg-primary text-white py-3 rounded-lg mb-4"
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  تسجيل الدخول بالبريد الإلكتروني
                </motion.button>
              )}
            </AnimatePresence>
          </LayoutGroup>

          {/* الانتقال إلى صفحة التسجيل */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">ليس لديك حساب؟</span>
            <a
              href="/register"
              className="text-sm text-purple-600 mr-1 hover:text-purple-800"
            >
              إنشاء حساب جديد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
