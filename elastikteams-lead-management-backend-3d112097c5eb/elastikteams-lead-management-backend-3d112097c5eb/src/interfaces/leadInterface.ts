export interface ILead {
  id?: number;
  clientName: string;
  clientEmail: string;
  urlLink: string;
  source: string;
  createdAt?: Date;
  currentStatus?: string;
  userId:number;
}
