import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import axios from "axios";

// بيانات البرامج الثابتة (يمكن جلبها من API لو أردت)
const PROGRAMS_DATA = [
  {
    id: "e4662e3a-7244-4255-99b9-77f85e4b45b5",
    name: "علمي علوم"
  },
  {
    id: "b05a5f04-3cc8-44cd-af5c-4455f800ac5d",
    name: "علمي رياضة"
  },
  {
    id: "c58644c1-4e95-4d39-bdd0-edd53e2706ac",
    name: "أدبي"
  },
  {
    id: "4e346bc2-f0de-462d-9845-f094cf323491",
    name: "Science Division"
  }
];

// إنشاء كائن axios مع الإعدادات الافتراضية
const apiClient = axios.create({
  baseURL: '/api', // سيتم استبداله بالبروكسي
  headers: {
    'Content-Type': 'application/json',
  }
});

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // استخدام React Query لجلب بيانات البرامج
  const { data: programs = PROGRAMS_DATA, isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      try {
        // في الإنتاج، نستبدل هذا بالطلب الفعلي
        // const response = await apiClient.get('/programs');
        // return response.data;
        
        // نستخدم البيانات الثابتة للتطوير
        return PROGRAMS_DATA;
      } catch (error) {
        console.error('Failed to fetch programs:', error);
        return PROGRAMS_DATA; // استخدام البيانات الثابتة كـfallback
      }
    },
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });

  // دالة لتسجيل الدخول
  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // دالة للتسجيل
  const register = async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', {
        ...userData,
        program: selectedProgram?.id
      });
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  // دالة لتسجيل الخروج
  const logout = () => {
    setUser(null);
    setSelectedProgram(null);
  };

  // دالة لتحديد البرنامج
  const selectProgram = (programId) => {
    const program = programs.find(p => p.id === programId);
    if (program) {
      setSelectedProgram(program);
    }
  };

  // التحقق من رمز التفعيل
  const verifyEmail = async (code) => {
    try {
      const response = await apiClient.post('/auth/verify-email', { code });
      return response.data;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  };

  // إعادة إرسال رمز التفعيل
  const resendVerificationCode = async (email) => {
    try {
      const response = await apiClient.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      console.error('Resend verification failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    programs,
    selectedProgram,
    isLoading,
    login,
    logout,
    register,
    selectProgram,
    verifyEmail,
    resendVerificationCode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}