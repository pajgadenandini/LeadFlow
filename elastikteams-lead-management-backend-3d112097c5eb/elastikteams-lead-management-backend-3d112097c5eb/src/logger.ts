import winston, { format } from "winston";
import { NODE_ENV } from "./env"; // load variables from env file

const logger = winston.createLogger({
    level: 'info', // default level
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(info => {
            return `${info.timestamp} [${info.level}] : ${info.message} \n ${info.stack}`;
        })
    ),
    transports: [
        // Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Write all logs of info and above to `application.log`
        new winston.transports.File({ filename: 'logs/application.log', level: 'info' }),
        // write debug logs to debug.log
        new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    ]
});

// for dev environment, log to console
if (NODE_ENV === 'development') {
    // console.log(NODE_ENV === 'development');
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;