"use strict";
const db = require("../config/db");

const ITEMS_PER_PAGE = 15;

class RecordStorage {
  static async save(record) {
    await db.query(
      `INSERT INTO leaderboard
         (file, cpm, name, message, correct_chr, wrong_chr)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        record.file,
        record.cpm,
        record.name,
        record.message,
        record.correctChr,
        record.wrongChr,
      ]
    );
    return { success: true };
  }

  static async load(page) {
    const { rows } = await db.query(
      `SELECT id                AS "_id",
              created_at        AS "createAt",
              file, cpm, name, message,
              correct_chr       AS "correctChr",
              wrong_chr         AS "wrongChr"
         FROM leaderboard
        ORDER BY cpm DESC, wrong_chr ASC, created_at ASC
        LIMIT $1 OFFSET $2`,
      [ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE]
    );
    return rows;
  }
}

module.exports = RecordStorage;
