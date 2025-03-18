import { Request, Response } from "express";
import LeadModel from "../models/leadModel";
import ActivityModel from "../models/activityModel";
import UserModel from "../models/userModel";


// Get lead activities/comments
export const getLeadActivities = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find all activities for this lead, include user information
        const activities = await ActivityModel.findAll({
            where: { leadId: id },
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'name'] // Only include necessary user fields
                }
            ],
            order: [['createdAt', 'DESC']] // Sort by newest first
        });

        res.json(activities);
    } catch (error) {
        console.error("Error in getLeadActivities:", error);
        res.status(500).json({ message: "Server error" });
    }
};

