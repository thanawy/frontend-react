// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as authAPI from "../API/RegisterApi";

// const PROGRAMS_DATA = [
//   {
//     id: "e4662e3a-7244-4255-99b9-77f85e4b45b5",
//     name: "علمي علوم",
//   },
//   {
//     id: "b05a5f04-3cc8-44cd-af5c-4455f800ac5d",
//     name: "علمي رياضة",
//   },
//   {
//     id: "c58644c1-4e95-4d39-bdd0-edd53e2706ac",
//     name: "أدبي",
//   },
// ];

export let AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

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

  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      try {
        const response = await authAPI.apiClient.get("/programs");
        return response.data;
      } catch (error) {
        console.error("فشل في جلب البرامج:", error);
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const login = async (credentials) => {
    try {
      const userData = await authAPI.login(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error);
      throw error;
    }
  };

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

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const selectProgram = (programId) => {
    const program = programs.find((p) => p.id === programId);
    if (program) {
      setSelectedProgram(program);
      localStorage.setItem("selectedProgram", JSON.stringify(program));
    }
  };

  // // التعديل الرئيسي هنا: إضافة استرجاع البريد الإلكتروني وإرساله مع الكود
  // const verifyEmail = async (code) => {
  //   try {
  //     const email = localStorage.getItem("registeredEmail");
  //     if (!email) {
  //       throw new Error("البريد الإلكتروني غير متوفر في التخزين المحلي");
  //     }
  //     return await authAPI.verifyEmail(code, email);
  //   } catch (error) {
  //     console.error("فشل التحقق من البريد الإلكتروني:", error);
  //     throw error;
  //   }
  // };

  // const resendVerificationCode = async (email) => {
  //   try {
  //     return await authAPI.resendVerificationCode(email);
  //   } catch (error) {
  //     console.error("فشل إعادة إرسال رمز التحقق:", error);
  //     throw error;
  //   }
  // };

  const value = {
    user,
    programs,
    selectedProgram,
    isLoading,
    login,
    logout,
    register,
    selectProgram,
    // verifyEmail,
    // resendVerificationCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
