import LeadModel from "../models/leadModel";
import { ILead } from "../interfaces/leadInterface";
import { Op } from "sequelize";
import NodeCache from "node-cache";
import { log } from "console";

const cache = new NodeCache({ stdTTL: 600, checkperiod: 920 }); // Caching for 10 min

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
  ): Promise<{ totalItems: number; totalPages: number; currentPage: number; leads: ILead[]; dataSource: string }> {
    const whereClause: any = {};

    // Filtering logic
    if (clientName) whereClause.clientName = { [Op.like]: `%${clientName}%` };
    if (clientEmail) whereClause.clientEmail = { [Op.like]: `%${clientEmail}%` };
    if (status) whereClause.currentStatus = status;
    if (createdFrom) whereClause.createdAt = { [Op.gte]: new Date(createdFrom) };
    if (createdTo) whereClause.createdAt = { ...whereClause.createdAt, [Op.lte]: new Date(createdTo) };
    if (lastActivityFrom) whereClause.updatedAt = { [Op.gte]: new Date(lastActivityFrom) };
    if (lastActivityTo) whereClause.updatedAt = { ...whereClause.updatedAt, [Op.lte]: new Date(lastActivityTo) };

    // Generate cache key
    const cacheKey = `leads-${page}-${search}-${sortBy}-${sortOrder}-${clientName}-${clientEmail}-${status}-${createdFrom}-${createdTo}-${lastActivityFrom}-${lastActivityTo}`;

    // Check cache
    const cacheData = cache.get(cacheKey);
    if (cacheData) {
      return { ...cacheData as { totalItems: number; totalPages: number; currentPage: number; leads: ILead[] }, dataSource: "cache" };
    }

    // Searching logic
    if (search) {
      whereClause[Op.or] = [
        { clientName: { [Op.like]: `%${search}%` } },
        { clientEmail: { [Op.like]: `%${search}%` } }
      ];
    }

    // Fetch from database
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
    };

    // Set cache
    cache.set(cacheKey, result);
    return { ...result, dataSource: "database" };
  }

  /**
   * Add a new lead
   */
  async addLead(data: { contactNo: string; source: string; urlLink: string; clientName: string; clientEmail: string; userId: number }): Promise<ILead> {
    const newLead = await LeadModel.create({ ...data, currentStatus: "New" });
    cache.flushAll(); // Invalidate cache after insertion
    return newLead.toJSON() as ILead;
  }

  /**
   * Delete a lead with cache invalidation
   */
  async deleteLead(id: number): Promise<boolean> {
    try {
      const deletedLeadCount = await LeadModel.destroy({ where: { id } });
      if (deletedLeadCount > 0) {
        cache.flushAll(); // Invalidate entire cache
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting lead:", error);
      throw new Error("Failed to delete lead");
    }
  }
}

export default new LeadService();
