"use strict";
const db = require("../config/db");

class CounterStorage {
  static async increaseValue(amount) {
    // 읽고 나서 쓰면 동시 요청이 서로의 증가분을 덮어쓰므로 한 문장으로 처리한다
    const { rows } = await db.query(
      `UPDATE counter SET value = value + $1 WHERE id = 1 RETURNING value`,
      [amount]
    );
    return { success: true, value: Number(rows[0].value) };
  }

  static async getValue() {
    const { rows } = await db.query(`SELECT value FROM counter WHERE id = 1`);
    return rows.length ? Number(rows[0].value) : 0;
  }
}

module.exports = CounterStorage;
