"use strict"
const dbo = require("../config/db");

class RecordStorage {
    static async save(record) {
        return new Promise((resolve, reject) => {
            const db_connect = dbo.getDb();
            const recordObj = {
                file: record.file,
                cpm: record.cpm,
                name: record.name,
                message: record.message,
                correctChr:  record.correctChr,
                worngChr: record.wrongChr,
            }
            
            db_connect.collection("leaderboard").insertOne(recordObj, (err, res) => {
                if (err) reject(err);
                resolve({ success: true });
            })
        });
    };
}

module.exports = RecordStorage;