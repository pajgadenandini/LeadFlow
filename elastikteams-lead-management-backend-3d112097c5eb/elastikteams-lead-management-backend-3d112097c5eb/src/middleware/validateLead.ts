import { Request, Response, NextFunction } from "express";
import { leadValidationSchema } from "../utils/formValidations";

export const validateLead = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = leadValidationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
    return; // Ensure we stop execution after sending the response
  }

  next(); // If validation passes, proceed to the next middleware/controller
};
