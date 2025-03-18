import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative w-24 h-24 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white flex items-center justify-center text-3xl font-bold shadow-lg ${className}`}>
      <FontAwesomeIcon icon={faUser} className="w-16 h-16" />
    </div>
  );
};

export default UserIcon;