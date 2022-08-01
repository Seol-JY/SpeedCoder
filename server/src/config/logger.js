const { createLogger, transports, format} = require("winston");
const winstonDaily = require('winston-daily-rotate-file')
const { printf, combine, timestamp, label, simple, colorize} = format;

const printFormat = printf(({ timestamp, label, level, message })=>{
    return `[${label}] [${timestamp}] ${level}: ${message}`
})

const logFormat = {
    file: combine(
        label({
            label: "Server"
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd",
        }),
        printFormat 
    ),
    console: combine(
        colorize(),
        simple()
    )
}

const opts = {
    fileInfo: new winstonDaily({
        datePattern: 'YYYY-MM-DD',
        filename: `%DATE%.log`,
        dirname: "./logs/info",
        maxFiles: 7,
        level: "info",
        format: logFormat.file,
        zippedArchive: true,
    }),
    fileError: new winstonDaily({
        datePattern: 'YYYY-MM-DD',
        filename: `%DATE%.error.log`,
        dirname: "./logs/error",
        maxFiles: 7,
        level: "error",
        format: logFormat.file,
        zippedArchive: true,
        handleExceptions: true,
    }),
    console: new transports.Console({
        level: "info",
        format: logFormat.console
    }),
}

const logger = createLogger({
    transports: [opts.fileInfo, opts.fileError]
});

if (process.env.NODE_ENV !== "production") {
    // only dev
    logger.add(opts.console);
}

logger.stream = {
    write: (message) => logger.info(message.slice(0, -1)),
}

module.exports = logger;