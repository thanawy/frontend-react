import axios from "axios";

// إنشاء كائن axios مع الإعدادات الافتراضية
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// دالة للتسجيل
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// التحقق من رمز التفعيل
export const verifyEmail = async (code) => {
  try {
    const response = await apiClient.post('/auth/verify-email', { code });
    return response.data;
  } catch (error) {
    console.error('Email verification failed:', error);
    throw error;
  }
};

// إعادة إرسال رمز التفعيل
export const resendVerificationCode = async (email) => {
  try {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response.data;
  } catch (error) {
    console.error('Resend verification failed:', error);
    throw error;
  }
};

// تسجيل الدخول
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export default {
  register,
  verifyEmail,
  resendVerificationCode,
  login
};