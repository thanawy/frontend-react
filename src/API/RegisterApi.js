// 1. التعديل الأول - تحديث RegisterApi.js

// API/RegisterApi.js
import axios from 'axios';

// إنشاء نسخة من axios مع الإعدادات الأساسية
const baseURL = import.meta.env.PROD
  ? 'https://backend.thanawy.com'  // في البرودكشن
  : '/api';                         // في التطوير

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

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
    
    if (error.response) {
      console.error('تفاصيل الخطأ:', error.response.data);
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
    
    if (!userEmail) {
      throw new Error('البريد الإلكتروني غير متوفر، يرجى إعادة تسجيل الدخول');
    }
    
    console.log('إعادة إرسال الرمز إلى:', userEmail);
    
    const response = await apiClient.post('/auth/resend-verification', { email: userEmail });
    
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

// إضافة وظيفة جديدة للحصول على البرامج
export const getPrograms = async () => {
  try {
    const response = await apiClient.get('/programs');
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب البرامج:', error);
    throw error;
  }
};