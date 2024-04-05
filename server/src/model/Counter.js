"use strict";
const CounterStorage = require("./CounterStorage");
const logger = require("../config/logger");

class Counter {
  constructor() {
    // 필요한 경우 생성자에서 초기화 작업 수행
  }

  static async increaseValue(amount) {
    try {
      const response = await CounterStorage.increaseValue(amount);
      logger.info(`Value increased by ${amount}. New value: ${response.value}`);
      return response;
    } catch (err) {
      logger.error(`Failed to increase value: ${err}`);
      return { success: false, msg: err };
    }
  }

  static async getValue() {
    try {
      const value = await CounterStorage.getValue();
      logger.info(`Current value: ${value}`);
      return value;
    } catch (err) {
      logger.error(`Failed to get value: ${err}`);
      return { success: false, msg: err };
    }
  }
}

module.exports = Counter;
