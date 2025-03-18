import LeadModel from "../models/leadModel";

export const getLeadById = async (id: string) => {
    try {
        const lead = await LeadModel.findByPk(id, {
            include: { all: true },  
        });
        return lead;
    } catch (error) {
        console.error("Error in leadDetailsService:", error);
        throw error;
    }
};
