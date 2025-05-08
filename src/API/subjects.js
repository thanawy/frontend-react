
import { apiClient } from "./RegisterApi";

export const getSubjects = async () => {
  try {
    const response = await apiClient.get("/subjects");
    return response.data;
  } catch (error) {
    console.error("Fetch error details:", error);
    throw error;
  }
};

// طريقة 2: استخدام Fetch مع إعدادات الكوكيز
/*
const BASE_URL = "https://backend.thanawy.com";
export const getSubjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/subjects`, {
      credentials: 'include', // هذا الخيار مهم لإرسال الكوكيز مع الطلب
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("فشل في جلب المواد الدراسية");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error details:", error);
    throw error;
  }
};
*/