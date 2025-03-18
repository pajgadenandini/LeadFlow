import React from 'react';
import { Lead } from '../../types/lead.types';
import { Card } from '../ui/Card';
import UserIcon from '../ui/UserIcon';

interface LeadProfileProps {
  lead: Lead;
  isLoading: boolean;
}

export const LeadProfile: React.FC<LeadProfileProps> = ({ lead, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="animate-pulse h-full">
        <div className="flex flex-col items-center">
          <UserIcon className="mb-4" />
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col items-center">
        {/* Larger centered profile image */}
        <div className="mb-6">
          {lead.profileImage ? (
            <img src={lead.profileImage} alt={lead.name} className="w-24 h-24 object-cover rounded-full shadow-lg" />
          ) : (
            <UserIcon />
          )}
        </div>

        {/* Lead information in vertical layout */}
        <div className="w-full text-center mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-1">{lead.name}</h1>
          <div className="inline-flex items-center justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {lead.currentStatus}
            </span>
          </div>
        </div>
        
        <div className="w-full space-y-3">
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${lead.email}`} className="hover:text-indigo-600 text-sm truncate">{lead.email}</a>
          </div>
          
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm">{lead.phone}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <a href={`https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 text-sm truncate">
              {lead.website}
            </a>
          </div>
          
          <div className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Source: {lead.source}</span>
          </div>
        </div>
        
        <div className="mt-6 w-full">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-sm text-gray-600">{lead.description}</p>
        </div>
      </div>
    </Card>
  );
};