import { useState, useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext";
import CharacterSlider from "../../components/CharacterSlider/CharacterSlider";
import StepsProgress from "../../components/StepsProgress/StepsProgress";
import ProgramSelection from "../../components/ProgramSelection/ProgramSelection ";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm ";
import VerificationCode from "../../components/VerificationCode/VerificationCode";
import * as registerApi from "../../API/RegisterApi";
import poki1 from "../../assets/images/poki1.svg";
import poki2 from "../../assets/images/poki2.svg";
import poki3 from "../../assets/images/poki3.svg";

// Slider data with images and changing text
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

// الخطوات
const steps = [
  { id: 1, label: "الشعبة" },
  { id: 2, label: "البيانات الشخصية" },
  { id: 3, label: "التأكيد" },
];

const Register = () => {
  const { programs, selectProgram, selectedProgram } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Convert programs to categories format
  const categories =
    programs?.map((program) => ({
      id: program.id,
      label: program.name,
      selected: selectedProgram?.id === program.id,
    })) || [];

  // Handle category selection
  const handleCategorySelect = (selectedId) => {
    selectProgram(selectedId);
  };

  // Handle next step
  const goToNextStep = () => {
    if (currentStep === 1 && !selectedProgram) {
      alert("يجب اختيار الشعبة أولاً");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const finalUserData = {
        ...userData,
        program: selectedProgram?.id,
      };
      return await registerApi.register(finalUserData);
    },
    onSuccess: (data) => {
      setRegisteredEmail(data.email || data.user?.email || "");
      goToNextStep();
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      alert(
        "حدث خطأ أثناء التسجيل: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  // Verification mutation
  const verifyEmailMutation = useMutation({
    mutationFn: async (code) => {
      return await registerApi.verifyEmail(code);
    },
    onSuccess: () => {
      alert("تم التحقق من بريدك الإلكتروني بنجاح!");
      // هنا يمكنك توجيه المستخدم للصفحة الرئيسية أو صفحة تسجيل الدخول
      window.location.href = "/login";
    },
    onError: (error) => {
      alert(
        "فشل التحقق من البريد الإلكتروني: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  // Resend verification code mutation
  const resendCodeMutation = useMutation({
    mutationFn: async () => {
      return await registerApi.resendVerificationCode(registeredEmail);
    },
    onSuccess: () => {
      alert("تم إعادة إرسال رمز التحقق بنجاح!");
    },
    onError: (error) => {
      alert(
        "فشل إعادة إرسال رمز التحقق: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  // التعامل مع تسجيل مستخدم جديد
  const handleRegister = (userData) => {
    registerMutation.mutate(userData);
  };

  // التعامل مع التحقق من رمز التفعيل
  const handleVerifyEmail = (code) => {
    verifyEmailMutation.mutate(code);
  };

  // إعادة إرسال رمز التفعيل
  const handleResendCode = () => {
    resendCodeMutation.mutate();
  };

  // عرض المكون المناسب حسب الخطوة الحالية
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
            isVerifying={verifyEmailMutation.isPending}
            isResending={resendCodeMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row-reverse h-screen w-full font-cairo px-6 md:px-24"
      dir="rtl"
    >
      {/* Left side - Character slider */}
      <div className="hidden md:block md:w-1/2">
        <CharacterSlider
          slides={sliderData}
          onBack={goToPreviousStep}
          currentStep={currentStep}
        />
      </div>

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col h-screen overflow-y-auto">
        {/* Header with logo */}
        <div className="flex justify-center items-center mb-8">
          {/* Back button - Only show in mobile view */}
          <button
            onClick={goToPreviousStep}
            className={`text-gray-500 md:hidden ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            <ChevronLeft size={24} />
            <span>الرجوع</span>
          </button>
          <div className="text-primary text-3xl md:text-4xl font-bold">
            ثانوي.آي
          </div>
        </div>

        {/* Progress steps */}
        <StepsProgress steps={steps} currentStep={currentStep} />

        {/* Current step content */}
        {renderStepContent()}

        {/* Footer sign in */}
        <div className="text-center mt-6 mb-4">
          <span className="text-sm text-gray-500">لديك حساب؟</span>
          <a href="/login" className="text-sm text-purple-600 mr-1">
            تسجيل الدخول
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
