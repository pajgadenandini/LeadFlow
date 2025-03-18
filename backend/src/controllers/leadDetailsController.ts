
import { Request, Response } from "express";
import { getLeadById } from "../services/leadDetailsService";

const getLeadDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("Received ID:", id);  

        const lead = await getLeadById(id);

        if (!lead) {
            console.log("Lead not found for ID:", id);  
            return res.status(404).json({ message: "Lead not found" });
        }

        console.log("Lead found:", lead);  
        res.json(lead);
    } catch (error) {
        console.error("Error in leadDetailsController:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export default getLeadDetails;
