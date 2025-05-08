// src/API/RegisterApi.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend.thanawy.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // مهم جدًا لإرسال الكوكي
});

// تسجيل المستخدم
export const register = async (userData) => {
  if (!userData.email || !userData.displayName || !userData.password || !userData.phoneNumber || !userData.program) {
    throw new Error('جميع البيانات المطلوبة غير موجودة');
  }

  const response = await apiClient.post('/auth/register', userData);
  localStorage.setItem('registeredEmail', userData.email);

  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }

  return response.data;
};

// التحقق من البريد
export const verifyEmail = async (code) => {
  if (!code) {
    throw new Error('رمز التحقق مطلوب');
  }

  const response = await apiClient.post('/auth/verify-digit', { code });
  localStorage.removeItem('registeredEmail');
  return response.data;
};

// إعادة إرسال كود التحقق
export const resendVerificationCode = async (email) => {
  const userEmail = email || localStorage.getItem('registeredEmail');
  if (!userEmail) throw new Error('البريد الإلكتروني غير متوفر');

  const response = await apiClient.post('/auth/resend-verification', { email: userEmail });
  return response.data;
};

// تسجيل الدخول
export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

// ✅ التحقق من حالة الجلسة
export const getSessionStatus = async () => {
  const response = await apiClient.get('/auth/status');
  return response.data;
};

export { apiClient };
