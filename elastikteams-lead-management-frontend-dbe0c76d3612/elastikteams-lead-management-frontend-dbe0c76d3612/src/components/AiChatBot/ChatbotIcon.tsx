import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatbotPopup from "./ChatbotPopup";

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    setIsAnimating(true);
    setTimeout(() => setIsOpen(true), 150);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Ensures smooth exit animation
  };

  return (
    <>
      <button
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 transform
        ${
          isOpen
            ? "bg-gradient-to-r from-red-500 to-red-600 rotate-90 hover:scale-110 sm:hover:scale-110 "
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-110 sm:hover:scale-110"
        }`}
        style={{
          boxShadow: isOpen
            ? "0 10px 25px -5px rgba(239, 68, 68, 0.4)"
            : "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
        }}
        onClick={isOpen ? handleClose : handleOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {isOpen && (
        <ChatbotPopup onClose={handleClose} isClosing={!isAnimating} />
      )}
    </>
  );
};

export default ChatbotIcon;
