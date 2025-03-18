import { Bot, User } from "lucide-react";

interface Message {
  sender: "AI" | "user";
  text: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-3 px-2 sm:px-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          } animate-fadeIn`}
        >
          <div
            className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl px-4 py-3 shadow-md break-words
              ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-800"
              }
            `}
          >
            <div className="flex items-center mb-1.5">
              {msg.sender === "AI" ? (
                <div className="bg-blue-100 p-1 rounded-full mr-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              ) : (
                <div className="bg-blue-200 p-1 rounded-full mr-2">
                  <User className="h-4 w-4 text-blue-700" />
                </div>
              )}
              <span
                className={`text-xs md:text-sm font-medium ${
                  msg.sender === "user" ? "text-indigo-100" : "text-indigo-700"
                }`}
              >
                {msg.sender === "AI" ? "Assistant" : "You"}
              </span>
              <span
                className={`text-xs md:text-sm ml-2 ${
                  msg.sender === "user" ? "text-indigo-200" : "text-gray-500"
                }`}
              >
                {formatTime(msg.timestamp)}
              </span>
            </div>
            <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
              {msg.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
