// src/services/SecureStorageService.js
import CryptoJS from 'crypto-js';

// مفتاح التشفير - يفضل نقل هذا لملف بيئة منفصل في الإنتاج
const SECRET_KEY = 'thanawy-secure-storage-key';

/**
 * خدمة للتعامل مع تخزين البيانات بطريقة آمنة في المتصفح
 */
class SecureStorageService {
  /**
   * تخزين بيانات بشكل مشفر
   * @param {string} key - مفتاح التخزين
   * @param {any} value - القيمة المراد تخزينها
   */
  static setItem(key, value) {
    try {
      // تحويل البيانات إلى نص JSON
      const stringValue = JSON.stringify(value);
      
      // تشفير البيانات باستخدام AES
      const encryptedValue = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
      
      // تخزين القيمة المشفرة
      localStorage.setItem(key, encryptedValue);
      
      return true;
    } catch (error) {
      console.error('خطأ في تشفير وتخزين البيانات:', error);
      return false;
    }
  }

  /**
   * استرجاع بيانات مشفرة
   * @param {string} key - مفتاح التخزين
   * @param {any} defaultValue - القيمة الافتراضية إذا لم يتم العثور على البيانات
   * @returns {any} - البيانات المسترجعة بعد فك التشفير
   */
  static getItem(key, defaultValue = null) {
    try {
      // استرجاع القيمة المشفرة
      const encryptedValue = localStorage.getItem(key);
      
      // إذا لم يتم العثور على قيمة، إرجاع القيمة الافتراضية
      if (!encryptedValue) {
        return defaultValue;
      }
      
      // فك تشفير البيانات
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
      
      // تحويل النص المسترجع إلى كائن JavaScript
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error('خطأ في فك تشفير البيانات:', error);
      return defaultValue;
    }
  }

  /**
   * حذف عنصر من التخزين
   * @param {string} key - مفتاح التخزين
   */
  static removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('خطأ في حذف البيانات:', error);
      return false;
    }
  }

  /**
   * مسح جميع البيانات المخزنة
   */
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('خطأ في مسح البيانات:', error);
      return false;
    }
  }
}

export default SecureStorageService;