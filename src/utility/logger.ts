import winston from 'winston'  // recommended by Express team https://www.npmjs.com/package/winston

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // always log to console.  This will be on a container where the log display only works with console
        new winston.transports.Console({ format: winston.format.simple() })
    ]
})
export default logger
