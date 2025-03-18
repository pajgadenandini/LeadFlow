import Joi from "joi";

export const leadValidationSchema = Joi.object({
  clientName: Joi.string().trim().min(1).required().messages({
    "string.empty": "Lead Name is required.",
    "any.required": "Lead Name is required.",
  }),

  clientEmail: Joi.string()
    .pattern(/^\S+@\S+\.\S+$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid email format.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

  contactNo: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits.",
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
    }),

  urlLink: Joi.string()
    .pattern(/^https?:\/\/.+$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid URL format.",
      "string.empty": "Website URL is required.",
      "any.required": "Website URL is required.",
    }),

  source: Joi.string().trim().min(1).required().messages({
    "string.empty": "Source is required.",
    "any.required": "Source is required.",
    
  }),
});

