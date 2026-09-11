const { createLogger, transports, format } = require("winston");
const { printf, combine, timestamp, label, colorize, errors } = format;

const printFormat = printf(
  ({ timestamp, label, level, message, stack }) =>
    `[${label}] [${timestamp}] ${level}: ${stack || message}`
);

const baseFormat = combine(
  label({ label: "Server" }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printFormat
);

// 컨테이너에서는 stdout 이 유일하게 수집되는 경로다, 파일 로그는 파드가 사라지면 같이 사라진다
const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new transports.Console({
      format:
        process.env.LOG_COLOR === "true"
          ? combine(colorize(), baseFormat)
          : baseFormat,
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

if (process.env.LOG_TO_FILE === "true") {
  const winstonDaily = require("winston-daily-rotate-file");
  const daily = (dirname, filename, level) =>
    new winstonDaily({
      datePattern: "YYYY-MM-DD",
      filename,
      dirname,
      maxFiles: 7,
      level,
      format: baseFormat,
      zippedArchive: true,
    });
  logger.add(daily("./logs/info", "%DATE%.log", "info"));
  logger.add(daily("./logs/error", "%DATE%.error.log", "error"));
}

logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
