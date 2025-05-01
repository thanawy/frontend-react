// API/RegisterApi.js

import axios from 'axios';

// إنشاء نسخة من axios مع الإعدادات الأساسية
const apiClient = axios.create({
  baseURL: 'https://backend.thanawy.com',  // تحديث عنوان API ليكون كاملاً
  headers: {
    'Content-Type': 'application/json',
  },
  // إضافة مهلة أطول لانتظار استجابة الخادم (15 ثانية)
  timeout: 15000
});

/**
 * تسجيل مستخدم جديد
 * @param {Object} userData - بيانات المستخدم (email, displayName, password, phoneNumber, program)
 * @returns {Promise} - وعد يحتوي على البيانات المرجعة
 */
export const register = async (userData) => {
  try {
    // تأكد من وجود كل البيانات المطلوبة
    if (!userData.email || !userData.displayName || !userData.password || !userData.phoneNumber || !userData.program) {
      throw new Error('جميع البيانات المطلوبة غير موجودة');
    }

    console.log('بيانات التسجيل:', { ...userData, password: '******' }); // إخفاء كلمة المرور للأمان
    
    const response = await apiClient.post('/auth/register', userData);
    
    // تسجيل استجابة الخادم للتحقق من صحتها
    console.log('استجابة التسجيل:', response.data);
    
    // حفظ البريد الإلكتروني في التخزين المحلي للاستخدام عند إعادة تحميل الصفحة
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
    
    // تحديث عنوان API للتحقق ليطابق العنوان المقدم
    const response = await apiClient.post('/auth/verify-digit', { 
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