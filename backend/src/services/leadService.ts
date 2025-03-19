import LeadModel from "../models/leadModel";
import { ILead } from "../interfaces/leadInterface";
import { Op } from "sequelize";
import  NodeCache from "node-cache";
import { log } from "console";

const cache = new NodeCache({ stdTTL: 600, checkperiod: 920 }); //caching for 10 min



class LeadService {
  /**
   * Fetch leads with pagination, searching, and sorting
   */
  async getLeads(
    page: number = 1,
    limit: number = 10,
    search: string = "",
    sortBy: string = "updatedAt",
    sortOrder: "asc" | "desc" = "desc",
    clientName?: string,
    clientEmail?: string,
    status?: string,
    createdFrom?: string,
    createdTo?: string,
    lastActivityFrom?: string,
    lastActivityTo?: string
  ): Promise<{ totalItems: number; totalPages: number; currentPage: number; leads: ILead[]; dataSource:string }> {
    const whereClause: any = {};

    // Filtering logic (Created Date, Last Activity, Status, Client Name, Email)
    if (clientName) whereClause.clientName = { [Op.like]: `%${clientName}%` };
    if (clientEmail) whereClause.clientEmail = { [Op.like]: `%${clientEmail}%` };
    if (status) whereClause.currentStatus = status;
    if (createdFrom) whereClause.createdAt = { [Op.gte]: new Date(createdFrom) };
    if (createdTo) whereClause.createdAt = { ...whereClause.createdAt, [Op.lte]: new Date(createdTo) };
    if (lastActivityFrom) whereClause.updatedAt = { [Op.gte]: new Date(lastActivityFrom) };
    if (lastActivityTo) whereClause.updatedAt = { ...whereClause.updatedAt, [Op.lte]: new Date(lastActivityTo) };


    
    // Generate cache key based on query params
    const cacheKey = `leads-${page}-${search}-${sortBy}-${sortOrder}-${clientName}-${clientEmail}-${status}-${createdFrom}-${createdTo}-${lastActivityFrom}-${lastActivityTo}`;
    
    
    //check if cache data is present ,if yes serve the cache data
    const cacheData = cache.get(cacheKey);
    if(cacheData){
      // console.log(`✅ Cache HIT: Served from cache [${cacheKey}]`);

      return { ...cacheData as { totalItems: number; totalPages: number; currentPage: number; leads: ILead[] }, dataSource: "cache" }; // Return cache source
    }else{
      // console.log(`❌ Cache MISS: Fetching from DB [${cacheKey}]`);
    }

    // Searching logic (separate from filtering)
    if (search) {
      whereClause[Op.or] = [
        { clientName: { [Op.like]: `%${search}%` } },
        { clientEmail: { [Op.like]: `%${search}%` } }
      ];
    }

    // Fetch filtered leads from database
    const { count: totalItems, rows: leads } = await LeadModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit,
      offset: (page - 1) * limit,
    });

    const result = {
      totalItems,
      totalPages: Math.max(1, Math.ceil(totalItems / limit)),
      currentPage: totalItems === 0 ? 1 : page,
      leads: leads.map((lead) => lead.get({ plain: true })),
    }

    //set cache data
    cache.set(cacheKey,result);
    // console.log(`🟡 Cache SET: Stored in cache [${cacheKey}]`);
    return {...result,dataSource:"database"};


  }

  /**
   * Add a new lead
   */
  async addLead(data: { contactNo: string; source: string; urlLink: string; clientName: string; clientEmail: string,userId:number }): Promise<ILead> {
    const newLead = await LeadModel.create({
      ...data,
      currentStatus: "New",
    });
    return newLead.toJSON() as ILead;
  }

  /**
   * Delete a lead
   */
  async deleteLead(id: number): Promise<boolean> {
    try {
      const deletedLeadCount = await LeadModel.destroy({ where: { id } });
      return deletedLeadCount > 0;
    } catch (error) {
      console.error("Error deleting lead:", error);
      throw new Error("Failed to delete lead");
    }
  }
}

export default new LeadService();
