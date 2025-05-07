const BASE_URL = "https://backend.thanawy.com";
export const getSubjects = async () => {
  try {
    const response = await fetch("https://backend.thanawy.com/subjects");

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error details:", error);
    throw error;
  }
};