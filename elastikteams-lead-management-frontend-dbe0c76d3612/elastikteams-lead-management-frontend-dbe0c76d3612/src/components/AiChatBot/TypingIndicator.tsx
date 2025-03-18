import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-[90%] sm:max-w-[80%] shadow-sm">
        <div className="flex items-center mb-1 sm:mb-2">
          <div className="bg-indigo-100 p-1 rounded-full mr-2">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-indigo-700">
            AI Assistant
          </span>
        </div>
        <div className="flex space-x-2 pl-1">
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "600ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
