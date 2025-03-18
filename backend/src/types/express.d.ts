import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: { id: number,object?:any }; // Extend Request to include `user`
    object?: any;
  }
}
