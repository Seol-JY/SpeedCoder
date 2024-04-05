"use strict";
const dbo = require("../config/db");

class CounterStorage {
  static async increaseValue(amount) {
    return new Promise((resolve, reject) => {
      const db_connect = dbo.getDb();

      // 현재 값 가져오기
      db_connect.collection("counter").findOne({}, (err, result) => {
        if (err) reject(err);

        let currentValue = 0;
        if (result && result.value) {
          currentValue = result.value;
        }

        // 증가한 값을 업데이트
        const newValue = currentValue + amount;
        db_connect
          .collection("counter")
          .updateOne(
            {},
            { $set: { value: newValue } },
            { upsert: true },
            (err, res) => {
              if (err) reject(err);
              resolve({ success: true, value: newValue });
            }
          );
      });
    });
  }

  static async getValue() {
    return new Promise((resolve, reject) => {
      const db_connect = dbo.getDb();

      // 현재 값 가져오기
      db_connect.collection("counter").findOne({}, (err, result) => {
        if (err) reject(err);

        let currentValue = 0;
        if (result && result.value) {
          currentValue = result.value;
        }

        resolve(currentValue);
      });
    });
  }
}

module.exports = CounterStorage;
