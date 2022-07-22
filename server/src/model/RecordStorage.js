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

  static async load() {
    return new Promise((resolve, reject) => {
      const db_connect = dbo.getDb();

      db_connect
        .collection("leaderboard")
        .find({})
        .sort({ cpm: -1, wrongChr: 1, createAt: 1 })
        .toArray((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }
}

module.exports = RecordStorage;
