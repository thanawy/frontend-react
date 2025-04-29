    import { useState, useEffect } from "react";
    import {
    ChevronLeft,
    Eye,
    EyeOff,
    Facebook,
    Check,
    ChevronDown,
    ChevronUp,
    } from "lucide-react";
    import poki1 from "../../assets/images/poki1.svg";
    import poki2 from "../../assets/images/poki2.svg";
    import poki3 from "../../assets/images/poki3.svg";
    import facebookIcon from "../../assets/icons/facebookIcon.svg";
    import googleIcon from "../../assets/icons/googleIcon.svg";
    import { useFormik } from "formik";
    import CharacterSlider from "../../components/CharacterSlider/CharacterSlider";

    const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [expandEmailForm, setExpandEmailForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("literature");

    // Steps content
    const steps = [
        { id: 1, label: "الشعبة" },
        { id: 2, label: "البيانات الشخصية" },
        { id: 3, label: "التأكيد" },
    ];

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

    // Categories for step 1
    const [categories, setCategories] = useState([
        { id: "literature", label: "أدبي", selected: true },
        { id: "Math", label: "علمي رياضة", selected: false },
        { id: "science", label: "علمي علوم", selected: false },
    ]);

    // Handle category selection
    const handleCategorySelect = (selectedId) => {
        const updatedCategories = categories.map((category) => ({
        ...category,
        selected: category.id === selectedId,
        }));
        setCategories(updatedCategories);
        setSelectedCategory(selectedId);
    };

    // Handle next step
    const goToNextStep = () => {
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
        program: { id: "literature", label: "أدبي" },
        },
        onSubmit: (values) => {
        const finalData = {
            email: values.email,
            displayName: values.displayName,
            phoneNumber: values.phoneNumber,
            program: values.program,
            password: values.password,
        };
        console.log("Form Data:", finalData);
        goToNextStep();
        },
    });

    // Update program when category changes
    useEffect(() => {
        const selectedCat = categories.find((cat) => cat.selected);
        if (selectedCat) {
        formik.setFieldValue("program", {
            id: selectedCat.id,
            label: selectedCat.label,
        });
        }
    }, [categories]);

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
                className={`text-gray-500 md:hidden ${currentStep === 1 ? "invisible" : ""}`}
            >
                <ChevronLeft size={24} />
                <span>الرجوع</span>
            </button>
            <div className="text-primary text-3xl md:text-4xl font-bold">
                ثانوي.آي
            </div>
            </div>

            {/* Progress steps */}
            <div className="flex items-center justify-center mb-8 gap-4 md:gap-9">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4 md:gap-8">
                {/* Step number and label container */}
                <div className="flex flex-col items-center">
                    <div
                    className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 text-xl md:text-4xl ${
                        currentStep === step.id
                        ? "bg-gradient-to-b from-[#8D55F9] to-[#4806C8] text-white border-purple-600"
                        : currentStep > step.id
                        ? "bg-gray-200 text-gray-600 border-gray-200"
                        : "bg-white text-gray-400 border-primary border-[1px]"
                    }`}
                    >
                    {step.id}
                    </div>
                    {/* Step label below the number */}
                    <span
                    className={`mt-2 text-sm md:text-xl ${
                        currentStep === step.id
                        ? "bg-gradient-to-r from-[#8D55F9] to-[#4806C8] font-bold bg-clip-text text-transparent"
                        : currentStep > step.id
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                    >
                    {step.label}
                    </span>
                </div>

                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                    <div className="w-8 md:w-16 h-0.5 bg-gray-300 mb-6"></div>
                )}
                </div>
            ))}
            </div>

            {/* Title */}
            {currentStep === 1 && (
            <div className="mb-6">
                <p className="font-bold text-xl md:text-2xl mb-2">
                انشاء حساب جديد
                </p>
                <p className="text-medGray mb-4">
                قم بإدخال بياناتك لبدء رحلتك معنا
                </p>
                <p className="font-[500] text-xl md:text-2xl">اختر الشعبه</p>
            </div>
            )}

            {currentStep === 2 && (
            <div className="mb-6">
                <p className="font-bold text-xl md:text-2xl mb-2">
                انشاء حساب جديد
                </p>
                <p className="text-gray-500 text-sm mb-4">
                قم بإدخال بياناتك لبدء رحلتك معنا
                </p>
            </div>
            )}

            {currentStep === 3 && (
            <div className="mb-6">
                <p className="font-bold text-xl md:text-2xl mb-2">
                تحقق من بريدك الالكتروني
                </p>
                <p className="text-gray-500 text-sm mb-4">
                لقد أرسلنا لك رمزاً مكوناً من 4 أرقام عبر البريد الإلكتروني الخاص
                بك
                </p>
            </div>
            )}

            {/* Step 1 - Select Category */}
            {currentStep === 1 && (
            <div className="flex-grow flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                {categories.map((category) => (
                    <div
                    key={category.id}
                    className={`border rounded-lg px-2 md:px-4 py-4 md:py-6 flex flex-col items-center justify-center cursor-pointer ${
                        category.selected
                        ? "border-primary bg-white"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                    >
                    <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mb-2 ${
                        category.selected
                            ? "border-purple-600"
                            : "border-gray-300"
                        }`}
                    >
                        {category.selected && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                    </div>
                    <span
                        className={
                        category.selected ? "text-primary" : "text-gray-600"
                        }
                    >
                        {category.label}
                    </span>
                    </div>
                ))}
                </div>

                <button
                onClick={goToNextStep}
                className="w-full bg-primary text-white py-3 rounded-lg mb-4"
                >
                انطلق للخطوة التالية
                </button>
            </div>
            )}

            {/* Step 2 - Personal Info */}
            {currentStep === 2 && (
            <div className="flex-grow flex flex-col justify-between">
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
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="يرجى إدخال كلمة المرور"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3"
                            required
                        />
                        </div>
                        <div>
                        <label className="block text-sm mb-1">
                            تأكيد كلمة المرور
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            placeholder="أعد كتابة كلمة المرور"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3"
                            required
                        />
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
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                        إنشاء حساب
                    </button>
                    </form>
                </div>
                </div>

                {/* Continue button when form is closed */}
                {!expandEmailForm && (
                <button
                    onClick={goToNextStep}
                    className="w-full bg-primary text-white py-3 rounded-lg mt-auto mb-4"
                >
                    انطلق للخطوة التالية
                </button>
                )}
            </div>
            )}

            {/* Step 3 - Verification */}
            {currentStep === 3 && (
            <div className="flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                {/* Verification code inputs */}
                <div className="flex justify-center gap-2 mb-4">
                    <input
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 md:w-16 md:h-16 border border-gray-300 rounded-lg text-center text-2xl"
                    />
                    <input
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 md:w-16 md:h-16 border border-gray-300 rounded-lg text-center text-2xl"
                    />
                    <input
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 md:w-16 md:h-16 border border-gray-300 rounded-lg text-center text-2xl"
                    />
                    <input
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 md:w-16 md:h-16 border-purple-600 rounded-lg text-center text-2xl text-purple-600"
                    defaultValue="6"
                    />
                </div>

                <p className="text-center text-sm text-gray-500">
                    صلاحية الرمز تنتهي في: ٠٢:١٢
                </p>

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                    تحقق
                </button>

                <button className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    إعادة الإرسال
                </button>
                </div>
            </div>
            )}

            {/* Footer sign in */}
            <div className="text-center mt-6 mb-4">
            <span className="text-sm text-gray-500">لديك حساب؟</span>
            <a href="#" className="text-sm text-purple-600 mr-1">
                تسجيل الدخول
            </a>
            </div>
        </div>
        </div>
    );
    };

    export default Register;