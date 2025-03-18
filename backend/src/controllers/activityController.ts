import { Request, Response } from 'express';
import { ActivityModel } from '../models/activityModel';
import { LeadModel } from '../models/leadModel';

class ActivityController {
  // Save a new activity
  static async createActivity(req: Request, res: Response): Promise<void> {
    const { timestamp, comment, status, userId, leadId } = req.body;

    try {
      const newActivity = await ActivityModel.create({
        timestamp,
        comment,
        status,
        userId,
        leadId,
      });
      // Update the lead's currentStatus
      await LeadModel.update(
        { currentStatus: status }, // New status
        { where: { id: leadId } } // Condition to find the lead
      );
      res.status(201).json(newActivity);
    } catch (err) {
      console.error('Error creating activity:', err);
      res.status(500).json({ error: 'Failed to save activity' });
    }
  }

  // Fetch activities for a lead
  static async getActivitiesByLeadId(req: Request, res: Response): Promise<void> {
    const { leadId } = req.query;

    // Parse leadId as an integer
    const parsedLeadId = parseInt(leadId as string, 10);

    // Check if leadId is a valid number
    if (isNaN(parsedLeadId)) {
      res.status(400).json({ error: 'Invalid leadId' });
      return;
    }

    try {
      const activities = await ActivityModel.findAll({
        where: { leadId: parsedLeadId },
        order: [['timestamp', 'DESC']], // Sort by timestamp (newest first)
      });
      res.status(200).json(activities);
    } catch (err) {
      console.error('Error fetching activities:', err);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  }
}

export default ActivityController;