// API/RegisterApi.js

import axios from 'axios';

// إنشاء نسخة من axios مع الإعدادات الأساسية
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000
});

// إضافة interceptor للمصادقة
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// إضافة interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      console.error('صلاحية الوصول منتهية، يرجى تسجيل الدخول مرة أخرى');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * تسجيل مستخدم جديد
 * @param {Object} userData - بيانات المستخدم
 * @returns {Promise} - وعد يحتوي على البيانات المرجعة
 */
export const register = async (userData) => {
  try {
    if (!userData.email || !userData.displayName || !userData.password || !userData.phoneNumber || !userData.program) {
      throw new Error('جميع البيانات المطلوبة غير موجودة');
    }

    console.log('بيانات التسجيل:', { ...userData, password: '******' });
    
    const response = await apiClient.post('/auth/register', userData);
    
    console.log('استجابة التسجيل:', response.data);
    
    localStorage.setItem('registeredEmail', userData.email);
    
    return response.data;
  } catch (error) {
    console.error('خطأ في التسجيل:', error);
    
    if (error.response) {
      console.error('استجابة الخطأ:', error.response.data);
      console.error('كود الحالة:', error.response.status);
    } else if (error.request) {
      console.error('الطلب:', error.request);
    }
    
    throw error;
  }
};

/**
 * التحقق من البريد الإلكتروني
 * @param {string} code - رمز التحقق
 * @returns {Promise} - وعد يحتوي على البيانات المرجعة
 */
export const verifyEmail = async (code) => {
  try {
    const email = localStorage.getItem('registeredEmail');
    const token = localStorage.getItem('authToken');
    
    console.log('بيانات التحقق:', { code, email });
    
    const response = await apiClient.post('/auth/verify-digit', { 
      code,
      email
    }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    console.log('استجابة التحقق:', response.data);
    
    localStorage.removeItem('registeredEmail');
    
    return response.data;
  } catch (error) {
    console.error('خطأ في التحقق من البريد الإلكتروني:', error);
    
    if (error.response?.status === 403) {
      throw new Error('صلاحية الوصول منتهية، يرجى تسجيل الدخول مرة أخرى');
    }
    
    throw error;
  }
};

/**
 * إعادة إرسال رمز التحقق
 * @param {string} email - البريد الإلكتروني للمستخدم
 * @returns {Promise} - وعد يحتوي على البيانات المرجعة
 */
export const resendVerificationCode = async (email) => {
  try {
    const userEmail = email || localStorage.getItem('registeredEmail');
    const token = localStorage.getItem('authToken');
    
    if (!userEmail) {
      throw new Error('البريد الإلكتروني غير متوفر، يرجى إعادة تسجيل الدخول');
    }
    
    console.log('إعادة إرسال الرمز إلى:', userEmail);
    
    const response = await apiClient.post('/auth/resend-verification', { 
      email: userEmail 
    }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    console.log('استجابة إعادة الإرسال:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('خطأ في إعادة إرسال رمز التحقق:', error);
    
    if (error.response) {
      console.error('تفاصيل الخطأ:', error.response.data);
    }
    
    throw error;
  }
};