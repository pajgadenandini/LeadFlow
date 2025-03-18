import { getAuthHeaders } from '../context/AuthContext';


export const fetchChatResponse = async (query: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/chatbot`, // ✅ Use import.meta.env
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ userQuery: query }),
      }
    );
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return "Sorry, something went wrong!";
  }
};
