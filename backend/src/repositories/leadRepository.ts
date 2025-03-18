import LeadModel from "../models/leadModel";

class LeadRepository {
  // Fetch all leads
  async findAll(): Promise<LeadModel[]> {
    return await LeadModel.findAll();
  }

  // Create a new lead
  async create(data: { clientName: string; clientEmail: string }): Promise<LeadModel> {
    return await LeadModel.create(data);
  }

  // Delete a lead by ID
  async delete(id: number): Promise<boolean> {
    const deletedCount = await LeadModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

export default new LeadRepository();
