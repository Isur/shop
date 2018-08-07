const winston = require('winston');
const date = require('./date');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({json:true, filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/combined.log' })
    ]
  });
  logger.log({
    level: 'info',
    message: 'Server has started!',
    date: date.localDateString,
    time: date.localTimeString
  });
  

module.exports = logger;
