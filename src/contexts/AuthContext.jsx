// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as authAPI from "../API/RegisterApi";

// تشفير وفك تشفير بيانات المستخدم
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

export let AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // التحقق من الجلسة من الباك باستخدام /auth/status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authAPI.getSessionStatus();

        if (response.user) {
          setUser(response.user);

          // اختياري: تخزين مشفر
          const encrypted = AES.encrypt(
            JSON.stringify(response.user),
            "your-secret-key"
          ).toString();
          localStorage.setItem("encryptedUser", encrypted);
        } else {
          setUser(null);
          localStorage.removeItem("encryptedUser");
        }
      } catch (error) {
        console.error("فشل في التحقق من حالة الجلسة:", error);
        setUser(null);
        localStorage.removeItem("encryptedUser");
      }

      setIsAuthenticating(false);
    };

    checkAuthStatus();
  }, []);

  // استرجاع البرنامج من localStorage
  useEffect(() => {
    const storedProgram = localStorage.getItem("selectedProgram");
    if (storedProgram) {
      try {
        setSelectedProgram(JSON.parse(storedProgram));
      } catch (e) {
        console.error("خطأ في استرجاع البرنامج المخزن:", e);
      }
    }
  }, []);

  // جلب البرامج المتاحة
  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      try {
        const response = await authAPI.apiClient.get("/programs");
        return response.data;
      } catch (error) {
        console.error("فشل في جلب البرامج:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // تسجيل الدخول
  const login = async (credentials) => {
    try {
      const userData = await authAPI.login(credentials);

      // الكوكي يتم حفظه تلقائيًا من الباك
      setUser(userData.user || userData);

      // تخزين البيانات مشفر (اختياري)
      const encryptedUser = AES.encrypt(
        JSON.stringify(userData.user || userData),
        "your-secret-key"
      ).toString();
      localStorage.setItem("encryptedUser", encryptedUser);

      return userData;
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error);
      throw error;
    }
  };

  // تسجيل مستخدم جديد
  const register = async (userData) => {
    try {
      const finalUserData = {
        ...userData,
        program: selectedProgram?.id,
      };
      const result = await authAPI.register(finalUserData);
      return result;
    } catch (error) {
      console.error("فشل التسجيل:", error);
      throw error;
    }
  };

  // التحقق من البريد الإلكتروني
  const verifyEmail = async (code) => {
    try {
      const email = localStorage.getItem("registeredEmail");
      if (!email) throw new Error("البريد الإلكتروني غير متوفر");

      const result = await authAPI.verifyEmail(code, email);
      if (!result.success) throw new Error(result.message || "رمز التحقق غير صحيح");

      return result;
    } catch (error) {
      console.error("فشل التحقق من البريد الإلكتروني:", error);
      throw error;
    }
  };

  // إعادة إرسال رمز التحقق
  const resendVerificationCode = async (email) => {
    try {
      return await authAPI.resendVerificationCode(email);
    } catch (error) {
      console.error("فشل إعادة إرسال رمز التحقق:", error);
      throw error;
    }
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("encryptedUser");
    setUser(null);
    // الباك إند يتولى حذف الكوكي تلقائيًا
  };

  // اختيار البرنامج
  const selectProgram = (programId) => {
    const program = programs?.find((p) => p.id === programId);
    if (program) {
      setSelectedProgram(program);
      localStorage.setItem("selectedProgram", JSON.stringify(program));
    }
  };

  const value = {
    user,
    programs,
    selectedProgram,
    isLoading,
    isAuthenticating,
    login,
    logout,
    register,
    selectProgram,
    verifyEmail,
    resendVerificationCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
