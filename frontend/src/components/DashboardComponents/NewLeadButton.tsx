import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserPlus } from 'lucide-react';

const NewLeadButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      navigate("/new-lead");
    }, 400);
  };

  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center 
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-white 
          px-3 py-2 
          rounded-md 
          shadow-md
          transition-all duration-300 ease-in-out
          overflow-hidden
          group
          ${isHovered ? 'scale-105' : 'scale-100'}
          ${isClicked ? 'transform scale-95' : ''}
        `}
      >
        {/* Background Glow Effect */}
        <div 
          className={`
            absolute inset-0 
            bg-indigo-400 
            opacity-0 
            group-hover:opacity-20 
            transition-opacity 
            duration-300 
            rounded-md
          `}
        />

        {/* Ripple Effect */}
        {isClicked && (
          <div 
            className="
              absolute 
              w-full 
              h-full 
              bg-white 
              bg-opacity-30 
              rounded-md 
              animate-ping
            "
          />
        )}

        {/* Underline Effect */}
        <div 
          className={`
            absolute 
            bottom-0 
            left-0 
            w-full 
            h-1 
            bg-white 
            origin-left 
            transform 
            scale-x-0 
            transition-transform 
            duration-300
            ${isHovered ? 'scale-x-100' : ''}  
          `}
        />

        {/* Button Content */}
        <div className="relative z-10 flex items-center space-x-1">
          <div 
            className={`
              transition-transform duration-300
              ${isHovered ? 'rotate-6 scale-110' : ''}
              ${isClicked ? 'rotate-12 scale-110' : ''}
            `}
          >
            <UserPlus className="text-white" size={16} />
          </div>
          
          <span className="font-medium transition-all duration-300 text-xs">
            Add Lead
          </span>
        </div>
      </button>
    </div>
  );
};

export default NewLeadButton;