"use strict";
const dbo = require("../config/db");

class RecordStorage {
  static async save(record) {
    return new Promise((resolve, reject) => {
      const db_connect = dbo.getDb();
      const recordObj = {
        createAt: new Date(),
        file: record.file,
        cpm: record.cpm,
        name: record.name,
        message: record.message,
        correctChr: record.correctChr,
        worngChr: record.wrongChr,
      };

      db_connect.collection("leaderboard").insertOne(recordObj, (err, res) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    });
  }

  static async load(page) {
    const ITEMS_PER_PAGE = 15; // 페이지당 아이템 수
    return new Promise((resolve, reject) => {
      const db_connect = dbo.getDb();

      db_connect
        .collection("leaderboard")
        .find({})
        .sort({ cpm: -1, wrongChr: 1, createAt: 1 })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .toArray((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }
}

module.exports = RecordStorage;
