import {Request,Response,NextFunction} from 'express';
import logger from "../logger";

export const logAllRequests = (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
}