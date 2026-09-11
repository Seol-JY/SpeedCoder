"use strict";
const { Pool } = require("pg");
const logger = require("./logger");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PGPOOL_MAX) || 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// 유휴 커넥션이 끊겨도 프로세스가 죽지 않도록 받아둔다
pool.on("error", (err) => {
  logger.error(`Idle client error: ${err.message}`);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  ping: () => pool.query("SELECT 1"),
  close: () => pool.end(),
};
