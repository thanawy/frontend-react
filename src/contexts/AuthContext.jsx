// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as authAPI from "../API/RegisterApi";

export let AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // التحقق من وجود توكن المصادقة وبيانات المستخدم عند تحميل التطبيق
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          // إضافة التوكن إلى رأس الطلبات الافتراضي
          authAPI.apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
          
          // استرجاع بيانات المستخدم
          const response = await authAPI.apiClient.get("/auth/me");
          
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("فشل في التحقق من حالة المصادقة:", error);
          localStorage.removeItem("authToken");
          delete authAPI.apiClient.defaults.headers.common['Authorization'];
        }
      }
      setIsAuthenticating(false);
    };

    checkAuthStatus();
  }, []);

  // استرجاع البرنامج المحدد من التخزين المحلي
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

  // استرجاع البرامج المتاحة
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
      
      // إضافة التوكن إلى رأس الطلبات الافتراضي
      if (userData.token) {
        authAPI.apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
      
      setUser(userData.user || userData);
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
      const email = localStorage.getItem('registeredEmail');
      if (!email) {
        throw new Error("البريد الإلكتروني غير متوفر");
      }
      const result = await authAPI.verifyEmail(code, email);

      // نتأكد أن success = true فعلاً
      if (!result.success) {
        throw new Error(result.message || "رمز التحقق غير صحيح");
      }

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
    localStorage.removeItem("authToken");
    delete authAPI.apiClient.defaults.headers.common['Authorization'];
    setUser(null);
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