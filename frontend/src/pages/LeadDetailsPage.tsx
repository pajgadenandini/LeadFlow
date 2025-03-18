import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lead, Comment, LeadStatus } from '../types/lead.types';
import { api } from '../services/api';

import { LeadProfile } from '../components/lead/LeadProfile';
import { StatusButtons } from '../components/lead/StatusButtons';
import { ActivityLog } from '../components/lead/ActivityLog';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const LeadDetailsPage: React.FC = () => {
  const { leadId } = useParams<{ leadId: string }>();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLeadData = async () => {
      if (!leadId) return;
      
      setIsLoading(true);
      setError(null);
      try {
        // Fetch lead data and comments in parallel
        const [leadData, commentsData] = await Promise.all([
          api.fetchLeadDetails(leadId),
          api.fetchComments(leadId)
        ]);
        
        setLead(leadData);
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching lead data:', err);
        setError('Failed to load lead data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeadData();
  }, [leadId]);
  
  const handleStatusChange = async (newStatus: LeadStatus, commentText?: string) => {
    if (!leadId || !lead) return;
    
    setIsUpdating(true);
    setError(null);

    try {
      // Update the lead's status in the state
      setLead((prevLead) => {
        if (!prevLead) return prevLead;
        return { ...prevLead, currentStatus: newStatus };
      });

      // If comment text was provided, add it as well
      if (commentText) {
        // Get current user info from localStorage
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : { id: 'system', name: 'System' };

        const commentData: Omit<Comment, 'id' | 'timestamp'> = {
          leadId,
          userId: user.id,
          userName: user.name,
          status: newStatus,
          text: commentText || `Status changed from ${lead.currentStatus} to ${newStatus}`
        };

        const newComment = await api.addComment(leadId, commentData);
        
        setComments([newComment, ...comments]);
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
      setError('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleAddComment = async (text: string, status: LeadStatus) => {
    if (!leadId || !lead) return;
  
    setIsSubmitting(true);
    try {
      // Get current user info from localStorage
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : { id: 'u1', name: 'John Smith' };
      
      const commentData: Omit<Comment, 'id' | 'timestamp'> = {
        leadId,
        userId: user.id,
        userName: user.name,
        status,
        text
      };
      
      const newComment = await api.addComment(leadId, commentData);
  
      // Prevent duplicate comments
      setComments((prevComments) => {
        const isDuplicate = prevComments.some((comment) => comment.id === newComment.id);
        return isDuplicate ? prevComments : [newComment, ...prevComments];
      });
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-48 bg-gray-200 rounded mb-6"></div>
          <div className="h-20 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!lead) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lead Not Found</h2>
          <p className="text-gray-600">The lead you're looking for doesn't exist or you don't have permission to view it.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center mb-6">
        <button 
          className="flex items-center text-indigo-600 hover:text-indigo-800"
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Leads
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Lead Details</h1>
      </div>
      
      {/* Updated layout - two column grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left column - Profile (1/3 width) */}
        <div className="md:col-span-1">
          <LeadProfile lead={lead} isLoading={isLoading} />
        </div>
        
        {/* Right column - Status and Activity Log (2/3 width) */}
        <div className="md:col-span-3">
          <StatusButtons 
            leadId={leadId || ''} // Pass leadId to StatusButtons
            currentStatus={lead.currentStatus} 
            onStatusChange={handleStatusChange}
            isUpdating={isUpdating}
          />
          <ActivityLog 
            leadId={lead.id}
            currentStatus={lead.currentStatus}
            comments={comments}
            isLoading={isLoading}
            onAddComment={handleAddComment}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};