export type LeadStatus = 'New' | 'Engaging' | 'Proposal' | 'Closed Win' | 'Closed Missed';

//both lead and Ilead need to be merged in future
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  source: string;
  description: string;
  currentStatus: LeadStatus;
  profileImage?: string;
}

export interface ILead {
  updatedAt: Date;
  activities: any;
  id: number;
  clientName: string;
  clientEmail: string;
  contactNo: string;  
  urlLink: string | null; 
  createdAt: Date;
  lastActivity: Date | null;
  currentStatus: string;
}

export interface LeadApiResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  leads: ILead[];
}

export interface Comment {
  id: string;
  leadId: string;
  userId: string;
  userName: string;
  status: LeadStatus;
  text: string;
  timestamp: string;
}

export interface LeadFilters {
  clientName?: string;
  clientEmail?: string;
  status?: string;
  createdFrom?: string;
  createdTo?: string;
  lastActivityFrom?: string;
  lastActivityTo?: string;
}