// src/API/RegisterApi.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.PROD ? 'https://backend.thanawy.com' : 'https://backend.thanawy.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000
});

export const register = async (userData) => {
  try {
    if (!userData.email || !userData.displayName || !userData.password || !userData.phoneNumber || !userData.program) {
      throw new Error('جميع البيانات المطلوبة غير موجودة');
    }

    console.log('بيانات التسجيل:', { ...userData, password: '******' });
    
    const response = await apiClient.post('/auth/register', userData);
    console.log('استجابة التسجيل:', response.data);
    
    localStorage.setItem('registeredEmail', userData.email);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('خطأ في التسجيل:', error);
    throw error;
  }
};

// التعديل الرئيسي هنا: إضافة معامل email
export const verifyEmail = async (code, email) => {
  try {
    if (!code || !email) {
      throw new Error('رمز التحقق والبريد الإلكتروني مطلوبان');
    }

    console.log('بيانات التحقق:', { code, email });
    
    const response = await apiClient.post('/auth/verify-digit', { 
      code,
      email
    });
    
    console.log('استجابة التحقق:', response.data);
    
    localStorage.removeItem('registeredEmail');
    
    return response.data;
  } catch (error) {
    console.error('خطأ في التحقق من البريد الإلكتروني:', error);
    throw error;
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const userEmail = email || localStorage.getItem('registeredEmail');
    
    if (!userEmail) {
      throw new Error('البريد الإلكتروني غير متوفر، يرجى إعادة تسجيل الدخول');
    }
    
    console.log('إعادة إرسال الرمز إلى:', userEmail);
    
    const response = await apiClient.post('/auth/resend-verification', { email: userEmail });
    
    console.log('استجابة إعادة الإرسال:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('خطأ في إعادة إرسال رمز التحقق:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    throw error;
  }
};

export { apiClient };