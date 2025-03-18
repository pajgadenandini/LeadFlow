import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

type AnimatedDeleteIconProps = {
  onDelete: () => void;
  className?: string;
};

const AnimatedDeleteIcon: React.FC<AnimatedDeleteIconProps> = ({ onDelete, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
      setIsDeleting(false);
    }, 500);
  };

  return (
    <div 
      className={`cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDelete}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className={`w-6 h-6 ${isDeleting ? 'animate-delete-trash' : ''}`}
      >
        <Trash2 
          color={isHovered ? '#FF4136' : '#718096'}
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
};

const styles = `
@keyframes deleteTrash {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.2) rotate(-15deg); }
  50% { transform: scale(0.8) rotate(15deg); }
  75% { transform: scale(1.1) rotate(-10deg); }
  100% { transform: scale(0) rotate(0deg); }
}

.animate-delete-trash {
  animation: deleteTrash 0.5s ease-in-out forwards;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default AnimatedDeleteIcon;