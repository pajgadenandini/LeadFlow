import { Request, Response } from "express";
import { OpenAI } from "openai";
import { LeadModel } from "../models/leadModel";
import { ActivityModel } from "../models/activityModel";
import { AIResponse } from "../services/aiService";
import { OPENAI_KEY } from "../env";

const openai = new OpenAI({ apiKey: OPENAI_KEY });

export const getAIResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userQuery } = req.body;
    if (!userQuery) {
      res.status(400).json({ error: "Query is required" });
      return;
    }

    // Calls service layer function to get AI response
    const response = await AIResponse(userQuery);

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
