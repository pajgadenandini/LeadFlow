// src/services/chatContextService.ts
import NodeCache from "node-cache";

// Define the shape of chat messages
interface ChatMessage {
    role: "user" | "assistant";
    content: string;
  }
  
  // Create an instance of node-cache with type ChatMessage[]
  const chatCache = new NodeCache({
    stdTTL: 3600, // 1 hour expiration time
    checkperiod: 120, // Clean up every 2 minutes
  });

// const chatCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Retrieve chat context from cache
export const getChatContext = async (sessionId: string): Promise<ChatMessage[]> => {
    // Get chat history and ensure it's treated as an array of ChatMessage
    const history = (chatCache.get<ChatMessage[]>(sessionId) || []) as ChatMessage[];
    return history;
  };
  
  // Save chat context to cache
  export const saveChatContext = async (
    sessionId: string,
    message: ChatMessage
  ): Promise<void> => {
    // Get current history and add the new message
    const history = (chatCache.get<ChatMessage[]>(sessionId) || []) as ChatMessage[];
    history.push(message); // No more type error here!
    chatCache.set(sessionId, history);
  };
  
