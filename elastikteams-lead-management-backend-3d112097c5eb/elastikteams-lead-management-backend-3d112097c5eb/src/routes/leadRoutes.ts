import { Router } from "express";
import { getLeads, createLead, deleteLead } from "../controllers/leadController";
import { validateLead } from "../middleware/validateLead";

const router = Router();

router.get("/", getLeads);
router.post("/", validateLead, createLead);
router.delete("/:id", deleteLead);

export default router;
