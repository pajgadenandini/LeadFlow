import express from 'express';
import ActivityController from '../controllers/activityController';

const router = express.Router();

// Save a new activity
router.post('/activities', ActivityController.createActivity);

// Fetch activities for a lead
router.get('/activities', ActivityController.getActivitiesByLeadId);

export default router;