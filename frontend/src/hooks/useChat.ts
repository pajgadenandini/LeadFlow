import { useState } from "react";
import { fetchChatResponse } from "../services/chatbotService";

interface Message {
  sender: "AI" | "user";
  text: string;
  timestamp: Date;
}

const useChat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: "Hello! How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (query: string) => {
    const userMessage: Message = {
      sender: "user", // Fix casing to match your Message type
      text: query,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const response = await fetchChatResponse(query);
    setIsTyping(false);

    const aiMessage: Message = {
      sender: "AI",
      text: response,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, aiMessage]);
  };

  return { chatMessages, sendMessage, isTyping };
};

export default useChat;
