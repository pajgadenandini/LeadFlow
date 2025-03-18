// src/components/lead/AddCommentForm.tsx
import React, { useState } from 'react';
import { LeadStatus } from '../../types/lead.types';
import { Button } from '../ui/Button';


interface AddCommentFormProps {
  leadId: string;
  currentStatus: LeadStatus;
  onAddComment: (text: string, status: LeadStatus) => Promise<void>;
  isSubmitting: boolean;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ 
  leadId, 
  currentStatus,
  onAddComment,
  isSubmitting
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // Get current user info from localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : { id: 'u1', name: 'John Smith' };

    // Prepare the activity data
    const activityData = {
      timestamp: new Date().toISOString(), // Current timestamp
      comment: commentText,
      status: currentStatus,
      userId: user.id,
      leadId: leadId,
    };

    try {
      // Save the activity to the backend
      //await api.saveActivity(activityData);

      // Call the onAddComment prop to update the UI
      await onAddComment(commentText, currentStatus);

      // Clear the comment text
      setCommentText('');
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Type your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex items-center justify-between">
          {/* Display the selected status (no dropdown) */}
          <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
            Status: {currentStatus}
          </div>
          
          <Button
            type="submit"
            disabled={!commentText.trim() || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};