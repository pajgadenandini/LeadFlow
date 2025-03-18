
import { Router } from "express";
import getLeadDetails from "../controllers/leadDetailsController";
import { getLeadActivities} from "../controllers/leadActivityController";

const router = Router();

// Get lead details by ID
router.get("/:id", getLeadDetails as any);

// Get lead activities/comments
router.get("/:id/activities", getLeadActivities as any);

export default router;