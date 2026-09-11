"use strict";
const app = require("../app");
const db = require("../src/config/db");
const logger = require("../src/config/logger");

const PORT = process.env.PORT || 80;
const CONNECT_RETRIES = Number(process.env.DB_CONNECT_RETRIES) || 12;
const CONNECT_DELAY_MS = Number(process.env.DB_CONNECT_DELAY_MS) || 5000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connectWithRetry() {
  for (let attempt = 1; attempt <= CONNECT_RETRIES; attempt++) {
    try {
      await db.ping();
      return;
    } catch (err) {
      logger.warn(
        `Database not ready (${attempt}/${CONNECT_RETRIES}): ${err.message}`
      );
      if (attempt === CONNECT_RETRIES) throw err;
      await sleep(CONNECT_DELAY_MS);
    }
  }
}

let server;

async function start() {
  await connectWithRetry();
  logger.info("Database connection... OK.");
  server = app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
}

// 기동에 실패하면 살아있는 척하지 않고 종료한다, 재시작은 오케스트레이터가 판단한다
start().catch((err) => {
  logger.error(`Startup failed: ${err.message}`);
  process.exit(1);
});

function shutdown(signal) {
  logger.info(`${signal} received, shutting down`);
  const done = () => db.close().catch(() => {}).finally(() => process.exit(0));
  if (server) server.close(done);
  else done();
}

["SIGTERM", "SIGINT"].forEach((s) => process.on(s, () => shutdown(s)));
