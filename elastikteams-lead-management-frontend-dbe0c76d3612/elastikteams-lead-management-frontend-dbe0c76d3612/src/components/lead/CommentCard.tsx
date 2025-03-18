import React, { useState } from 'react';
import { Comment } from '../../types/lead.types';
import { formatDate } from '../../utils/formatters';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden transition-all duration-200 hover:shadow-sm">
      <div 
        className="p-3 bg-white cursor-pointer flex justify-between items-center"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              {comment.userName.charAt(0)}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{comment.userName}</p>
            <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
          </div>
          <div className="ml-3 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            {comment.status}
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.text}</p>
        </div>
      )}
    </div>
  );
};