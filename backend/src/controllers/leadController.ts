import { Request, Response } from "express";
import LeadService from "../services/leadService";

/**
 * Controller for fetching leads with pagination, search, and sorting.
 */
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = "1", 
      search = "", 
      sortBy = "createdAt", 
      sortOrder = "desc",
      clientName,
      clientEmail,
      status,
      createdFrom,
      createdTo,
      lastActivityFrom,
      lastActivityTo
    } = req.query;

    const parsedPage = Number(page) || 1;

    // Validate date inputs
    const dateFields = { createdFrom, createdTo, lastActivityFrom, lastActivityTo };
    for (const [key, value] of Object.entries(dateFields)) {
      if (value && isNaN(Date.parse(value as string))) {
        res.status(400).json({ error: `Invalid date format for ${key}` });
        return;
      }
    }

    // Fetch leads using LeadService with filters
    const result = await LeadService.getLeads(
      parsedPage,
      10,
      search as string,
      sortBy as string,
      sortOrder as "asc" | "desc",
      clientName as string,
      clientEmail as string,
      status as string,
      createdFrom as string,
      createdTo as string,
      lastActivityFrom as string,
      lastActivityTo as string
    );

    // Return the data
    res.status(200).json({
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      leads: result.leads
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

/**
 * Controller for creating a new lead.
 */
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { contactNo, source, urlLink, clientName, clientEmail } = req.body;
    
    // console.log("Created Lead By ID ",userId)
    if (!userId) {
      res.status(400).json({ error: "User Need to login first, Please Try Again" });
      return;
    }
    
    if (!contactNo || !clientName || !clientEmail || !source || !urlLink) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    // Create new lead via LeadService
    const newLead = await LeadService.addLead({ contactNo, source, urlLink, clientName, clientEmail,userId });
    res.status(201).json(newLead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ error: "Failed to create lead" });
  }
};

/**
 * Controller for deleting a lead by ID.
 */
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ error: "Lead ID is required" });
      return;
    }
    
    // Delete lead via LeadService
    const deleted = await LeadService.deleteLead(Number(id));
    
    if (!deleted) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ error: "Failed to delete lead" });
  }
};
