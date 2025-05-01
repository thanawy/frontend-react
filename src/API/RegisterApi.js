

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend.thanawy.com',
  headers: {
    'Content-Type': 'application/json', 
  },

  timeout: 15000
});

/**

 * @param {Object} userData 
 * @returns {Promise} 
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
    
    // تحسين رسائل الخطأ للمطور
    if (error.response) {
      // الخادم استجاب بكود خطأ
      console.error('استجابة الخطأ:', error.response.data);
      console.error('كود الحالة:', error.response.status);
      console.error('رؤوس الاستجابة:', error.response.headers);
    } else if (error.request) {
      // لم يصل الطلب إلى الخادم
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
    // الحصول على البريد الإلكتروني المخزن (في حالة إعادة تحميل الصفحة)
    const email = localStorage.getItem('registeredEmail');
    
    console.log('بيانات التحقق:', { code, email });
    
    // إرسال كل من الرمز والبريد الإلكتروني للتأكد من صحة التحقق
    const response = await apiClient.post('auth/verify-digit', { 
      code,
      email // إضافة البريد الإلكتروني للطلب إذا كان متاحًا
    });
    
    console.log('استجابة التحقق:', response.data);
    
    // مسح البريد الإلكتروني من التخزين المحلي بعد نجاح التحقق
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
    // استخدام البريد المخزن إذا لم يتم تمرير بريد
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