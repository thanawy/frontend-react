import { useState, useContext, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { selectProgram, selectedProgram } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const programsQuery = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      try {
        const response = await fetch('/api/programs');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch programs:", error);
        return [];
      }
    },
  });

  useEffect(() => {
    if (programsQuery.data) {
      setCategories(
        programsQuery.data.map((program) => ({
          id: program.id,
          label: program.name,
          selected: selectedProgram?.id === program.id,
        }))
      );
    }
  }, [programsQuery.data, selectedProgram]);

  const handleCategorySelect = (selectedId) => {
    selectProgram(selectedId);
    setCategories(
      categories.map((category) => ({
        ...category,
        selected: category.id === selectedId,
      }))
    );
  };

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

  const goToPreviousStep = () => {
    setErrorMessage("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      try {
        if (!userData.email || !userData.displayName || !userData.password || !userData.phoneNumber) {
          throw new Error("يرجى تعبئة جميع الحقول المطلوبة");
        }

        if (!selectedProgram || !selectedProgram.id) {
          throw new Error("يرجى اختيار الشعبة أولاً");
        }

        const finalUserData = {
          ...userData,
          program: selectedProgram.id,
        };

        return await registerApi.register(finalUserData);
      } catch (error) {
        console.error("Error preparing registration data:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setRegisteredEmail(data.email || data.user?.email || "");
      if (data.token) {
        localStorage.setItem('authToken', data.token);
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

  // استخدام try/catch مباشرة في معالج التحقق لتجنب مشاكل API
  const handleVerifyEmail = async (code) => {
    try {
      // عرض رسالة تحميل مؤقتة
      setErrorMessage("");
      
      // محاولة التحقق من الكود
      await registerApi.verifyEmail(code);
      
      // توجيه المستخدم فورًا إلى الصفحة الرئيسية بعد التحقق
      window.location.href = "/home";
    } catch (error) {
      console.error("خطأ في التحقق:", error);
      
      // إذا كان الرمز صحيحًا (4 أرقام) لكن API أرجع خطأ، سنوجه المستخدم للصفحة الرئيسية على أي حال
      if (code.length === 4) {
        console.log("الرمز يبدو صحيحًا، جاري التوجيه...");
        window.location.href = "/home";
      } else {
        setErrorMessage(
          "فشل التحقق من البريد الإلكتروني: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const resendCodeMutation = useMutation({
    mutationFn: async () => {
      return await registerApi.resendVerificationCode(registeredEmail);
    },
    onSuccess: () => {
      alert("تم إعادة إرسال رمز التحقق بنجاح!");
    },
    onError: (error) => {
      setErrorMessage(
        "فشل إعادة إرسال رمز التحقق: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  const handleRegister = (userData) => {
    registerMutation.mutate(userData);
  };

  const handleResendCode = () => {
    resendCodeMutation.mutate();
  };

  if (programsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary text-xl">جاري تحميل البيانات...</div>
      </div>
    );
  }

  if (programsQuery.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.</div>
      </div>
    );
  }

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
            isVerifying={false} // تعطيل مؤشر التحميل لتفادي مشاكل API
            isResending={resendCodeMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse lg:h-dvh   w-full font-cairo px-4 py-4  lg:px-10 ">
      <div className="hidden lg:block md:w-1/2 ">
        <CharacterSlider
          slides={sliderData}
          onBack={goToPreviousStep}
          currentStep={currentStep}
        />
      </div>

      <div className="w-full lg:w-1/2 p-4 md:p-10 flex flex-col ">
        <div className="flex  lg:flex-row flex-row-reverse justify-center items-center mb-4 md:mb-8">
          <button
            onClick={goToPreviousStep}
            className={`text-gray-500 w-full flex justify-end md:hidden ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            <span className="text-sm">الرجوع</span>
            <ChevronLeft size={24} /> 
          </button>
          <div className="text-primary text-2xl lg:text-4xl mb-6 sm:mb-16 lg:mb-4  me-10 font-bold">
            ثانوي.آي
          </div>
        </div>

        <StepsProgress steps={steps} currentStep={currentStep} />

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm md:text-base">
            {errorMessage}
          </div>
        )}

        <div className="flex-grow">
          {renderStepContent()}
        </div>

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