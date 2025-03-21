import { useState, useEffect, useRef } from "react";
import useChat from "../../hooks/useChat";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";
import { Send, Sparkles } from "lucide-react";

interface ChatbotPopupProps {
  onClose: () => void;
  isClosing: boolean;
}

const ChatbotPopup = ({ isClosing }: ChatbotPopupProps) => {
  const { chatMessages, sendMessage, isTyping } = useChat();
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div
      className={`fixed bottom-18 sm:bottom-20 right-2 sm:right-6 w-[95%] sm:w-100 md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-40 transition-all duration-300 transform 
      ${
        isClosing
          ? "scale-95 opacity-0 pointer-events-none"
          : "scale-100 opacity-100"
      }`}
      style={{
        maxHeight: "calc(100vh - 100px)",
        boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
      }}
    >
      {/* 🔹 Chat header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-white">
            AI Assistant
          </h1>
        </div>
      </header>

      {/* 🔹 Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 h-72 sm:h-80 bg-gradient-to-b from-indigo-50/30 to-white">
        <div className="space-y-3">
          <ChatMessages messages={chatMessages} />
          {isTyping && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* 🔹 Input area */}
      <div className="border-t border-indigo-100 bg-white p-2 sm:p-3">
        <div className="relative">
          <input
            type="text"
            className="w-full border border-indigo-200 rounded-xl pl-3 sm:pl-4 pr-10 sm:pr-12 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-1.5 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPopup;
