export { default as ChatbotIcon } from "./ChatbotIcon";
export { default as ChatbotPopup } from "./ChatbotPopup";
export { default as ChatMessage } from "./ChatMessages";
export { default as TypingIndicator } from "./TypingIndicator";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}
