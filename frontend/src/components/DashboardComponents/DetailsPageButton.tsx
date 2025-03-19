import { useState } from "react";
import { ChevronRight } from "lucide-react";

const DetailsPageButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick();
  };

  return (
    <button
      className={`
        relative flex items-center justify-between 
        min-w-[70px] px-2 py-2
        bg-gradient-to-r from-blue-500 to-purple-600 
        text-white 
        rounded-full 
        shadow-md 
        transition-all duration-300 ease-in-out
        hover:scale-105 
        active:scale-95
        overflow-hidden
        ${isClicked ? 'transform scale-90' : ''}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`
          absolute inset-0 
          bg-white opacity-30  
          transform ${isHovered ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
        `}
      />
      <span className="relative z-10 font-medium text-[10px] whitespace-nowrap">
        Details
      </span>
      <ChevronRight
        className={`
          relative z-10 
          ml-0 w-3 h-3
          transition-transform duration-300 ease-in-out
          ${isHovered ? 'translate-x-1' : ''}
        `}
      />
      {isClicked && (
        <div
          className="
            absolute 
            top-1/2 left-1/2 
            transform -translate-x-1/2 -translate-y-1/2 
            bg-white opacity-30  
            rounded-full 
            animate-ping
            w-full h-full
          "
        />
      )}
    </button>
  );
};

export default DetailsPageButton;
