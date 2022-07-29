const { createLogger, transports, format} = require("winston");
const { printf, combine, timestamp, label, simple, colorize} = format;

const printFormat = printf(({ timestamp, label, level, message })=>{
    return `${timestamp} [${label}] ${level} : ${message}`
})

const logFormat = {
    file: combine(
        label({
            label: "맛보기"
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
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: logFormat.file
    }),
    console: new transports.Console({
        level: "info",
        format: logFormat.console
    }),
}

const logger = createLogger({
    transports: [opts.file]
});

if (process.env.NODE_ENV !== "production") {
    console.log(process.env.NODE_ENV);
    logger.add(opts.console);
}

module.exports = logger;