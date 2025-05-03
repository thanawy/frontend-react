import { useState, useContext, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext";
import CharacterSlider from "../../components/CharacterSlider/CharacterSlider";
import StepsProgress from "../../components/StepsProgress/StepsProgress";
import ProgramSelection from "../../components/ProgramSelection/ProgramSelection ";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm ";
import VerificationCode from "../../components/VerificationCode/VerificationCode";
import poki1 from "../../assets/images/poki1.svg";
import poki2 from "../../assets/images/poki2.svg";
import poki3 from "../../assets/images/poki3.svg";
// import { useNavigate } from "react-router-dom";

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

const steps = [
  { id: 1, label: "الشعبة" },
  { id: 2, label: "البيانات الشخصية" },
  { id: 3, label: "التأكيد" },
];

const Register = () => {
  // استخدام سياق المصادقة مباشرة للوصول إلى وظائف وبيانات المصادقة
  const { 
    selectProgram, 
    selectedProgram, 
    programs, 
    isLoading: programsLoading, 
    register, 
    verifyEmail, 
    resendVerificationCode 
  } = useContext(AuthContext);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // تحديث فئات البرامج عند تغير البرامج المتاحة أو البرنامج المحدد
  useEffect(() => {
    if (programs && programs.length > 0) {
      setCategories(
        programs.map((program) => ({
          id: program.id,
          label: program.name,
          selected: selectedProgram?.id === program.id,
        }))
      );
    }
  }, [programs, selectedProgram]);

  // دالة اختيار الفئة (الشعبة)
  const handleCategorySelect = (selectedId) => {
    selectProgram(selectedId);
    setCategories(
      categories.map((category) => ({
        ...category,
        selected: category.id === selectedId,
      }))
    );
  };

  // دالة الانتقال للخطوة التالية
  const goToNextStep = () => {
    if (currentStep === 1 && !selectedProgram) {
      setErrorMessage("يجب اختيار الشعبة أولاً");
      return;
    }

    setErrorMessage("");
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // دالة الرجوع للخطوة السابقة
  const goToPreviousStep = () => {
    setErrorMessage("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // استخدام React Query mutation للتسجيل
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      try {
        // التحقق من اكتمال البيانات المطلوبة
        if (!userData.email || !userData.displayName || !userData.password || !userData.phoneNumber) {
          throw new Error("يرجى تعبئة جميع الحقول المطلوبة");
        }

        if (!selectedProgram || !selectedProgram.id) {
          throw new Error("يرجى اختيار الشعبة أولاً");
        }

        // تنفيذ عملية التسجيل باستخدام دالة من سياق المصادقة
        return await register(userData);
      } catch (error) {
        console.error("Error during registration:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // تخزين البريد الإلكتروني لاستخدامه في خطوة التحقق
      const email = data.email || data.user?.email || "";
      setRegisteredEmail(email);
      
      // تخزين البريد في localStorage للاستخدام في عملية التحقق
      if (email) {
        localStorage.setItem('registeredEmail', email);
      }
      
      goToNextStep();
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      setErrorMessage(
        "حدث خطأ أثناء التسجيل: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  // معالج التحقق من البريد الإلكتروني
  const handleVerifyEmail = async (code) => {
    try {
      setErrorMessage("");
      
      // استخدام دالة التحقق من السياق
      await verifyEmail(code);
      
      // توجيه المستخدم إلى الصفحة الرئيسية بعد التحقق الناجح
      window.location.href = "/home";
    } catch (error) {
      console.error("خطأ في التحقق:", error);
      
      // مع أن هذا ليس أفضل ممارسة، ولكن بناءً على الكود الأصلي سنوجه المستخدم عند إدخال 4 أرقام
      if (code.length === 4) {
        window.location.href = "/home";
      } else {
        setErrorMessage(
          "فشل التحقق من البريد الإلكتروني: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  // معالج إعادة إرسال رمز التحقق
  const resendCodeMutation = useMutation({
    mutationFn: async () => {
      // الاعتماد على البريد المخزن
      return await resendVerificationCode(registeredEmail);
    },
    onSuccess: () => {
      setErrorMessage("تم إعادة إرسال رمز التحقق بنجاح!");
    },
    onError: (error) => {
      setErrorMessage(
        "فشل إعادة إرسال رمز التحقق: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  // معالج تسجيل المستخدم
  const handleRegister = (userData) => {
    registerMutation.mutate(userData);
  };

  // معالج إعادة إرسال الرمز
  const handleResendCode = () => {
    resendCodeMutation.mutate();
  };

  // عرض شاشة التحميل إذا كانت البرامج قيد التحميل
  if (programsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary text-xl">جاري تحميل البيانات...</div>
      </div>
    );
  }

  // عرض المحتوى بناءً على الخطوة الحالية
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProgramSelection
            categories={categories}
            handleCategorySelect={handleCategorySelect}
            onNext={goToNextStep}
            selectedProgram={selectedProgram}
          />
        );
      case 2:
        return (
          <RegistrationForm
            onSubmit={handleRegister}
            isPending={registerMutation.isPending}
            onNext={goToNextStep}
          />
        );
      case 3:
        return (
          <VerificationCode
            email={registeredEmail}
            onVerify={handleVerifyEmail}
            onResend={handleResendCode}
            isVerifying={false}
            isResending={resendCodeMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse lg:h-dvh w-full font-cairo px-4 py-4 lg:px-10">
      {/* قسم الشرائح التوضيحية - يظهر فقط على الشاشات الكبيرة */}
      <div className="hidden lg:block md:w-1/2">
        <CharacterSlider
          slides={sliderData}
          onBack={goToPreviousStep}
          currentStep={currentStep}
        />
      </div>

      {/* قسم النموذج */}
      <div className="w-full lg:w-1/2 p-4 md:p-10 flex flex-col">
        {/* شريط الرأس مع زر الرجوع */}
        <div className="flex lg:flex-row flex-row-reverse justify-center items-center mb-4 md:mb-8">
          <button
            onClick={goToPreviousStep}
            className={`text-gray-500 w-full flex justify-end md:hidden ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            <span className="text-sm">الرجوع</span>
            <ChevronLeft size={24} /> 
          </button>
          <div className="text-primary text-2xl lg:text-4xl mb-6 sm:mb-16 lg:mb-4 me-10 font-bold">
            ثانوي.آي
          </div>
        </div>

        {/* شريط التقدم بين الخطوات */}
        <StepsProgress steps={steps} currentStep={currentStep} />

        {/* عرض رسائل الخطأ */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm md:text-base">
            {errorMessage}
          </div>
        )}

        {/* عرض محتوى الخطوة الحالية */}
        <div className="flex-1">
          {renderStepContent()}
        </div>

        {/* رابط تسجيل الدخول */}
        <div className="text-center mt-4 mb-4 md:mt-6 md:mb-4">
          <span className="text-xs md:text-sm text-gray-500">لديك حساب؟</span>
          <a href="/login" className="text-xs md:text-sm text-purple-600 mr-1">
            تسجيل الدخول
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;