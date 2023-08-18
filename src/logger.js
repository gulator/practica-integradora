import winston from "winston";
import config from "./config/config.js";

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
};

export let logger 
if (config.environment === "development") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({ level: "debug" }),
      new winston.transports.File({ filename: "errors.log", level: "error" }),
    ],
  });
}
if (config.environment === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports:[
            new winston.transports.Console({ level: "info" }),
            new winston.transports.File({ filename: "errors.log", level: "error" })
        ]
    })
  
}

export const addLogger = (req, res, next) => {
  req.logger = logger;
//   req.logger.http(
//     `${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`
//   );
  next();
};
