import React, { useState } from 'react';
import { Comment, LeadStatus } from '../../types/lead.types';
import { Card } from '../ui/Card';
import { CommentCard } from './CommentCard';
import { AddCommentForm } from './AddCommentForm';

interface ActivityLogProps {
  leadId: string;
  currentStatus: LeadStatus;
  comments: Comment[];
  isLoading: boolean;
  onAddComment: (text: string, status: LeadStatus) => Promise<void>;
  isSubmitting: boolean;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ 
  leadId, 
  currentStatus,
  comments, 
  isLoading,
  onAddComment,
  isSubmitting
}) => {
  const [activeFilter, setActiveFilter] = useState<LeadStatus | 'all'>('all');
  
  const statusOptions: LeadStatus[] = ['New', 'Engaging', 'Proposal', 'Closed Win', 'Closed Missed'];
  
  // Group comments by status
  const groupedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.status]) {
      acc[comment.status] = [];
    }
    acc[comment.status].push(comment);
    return acc;
  }, {} as Record<string, Comment[]>);
  
  // Sort comments by date (newest first)
  Object.keys(groupedComments).forEach(status => {
    groupedComments[status].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });
  
  const filteredComments = activeFilter === 'all' 
    ? comments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    : groupedComments[activeFilter] || [];
  
  return (
    <Card title="Activity Log" className="mb-6">
      <AddCommentForm 
        leadId={leadId} 
        currentStatus={currentStatus}
        onAddComment={onAddComment}
        isSubmitting={isSubmitting}
      />
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeFilter === 'all'
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {statusOptions.map(status => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeFilter === status
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status} {groupedComments[status]?.length ? `(${groupedComments[status].length})` : ''}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg animate-pulse p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="ml-3 flex-1">
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredComments.length > 0 ? (
        <div className="space-y-1">
          {filteredComments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <p className="text-lg font-medium">No comments yet</p>
          <p className="text-sm">Add the first comment to track your interactions with this lead</p>
        </div>
      )}
    </Card>
  );
};