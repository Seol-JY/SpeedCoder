"use strict";
const Record = require("../../model/Record");

const output = {
  main: (req, res) => {
    res.status(200).sendfile("../../views/index.html");
  },
};

const process = {
  addRecord: async (req, res) => {
    const record = new Record(req.body);
    const response = await record.insertRecord();
    const url = {
      method: "POST",
      path: "/records",
      status: response.success ? 201 : 409,
    };
    return res.status(url.status).json(response);
  },

  getRecordByPage: async (req, res) => {
    const response = await Record.selectRecordByPage(req.query.page);
    const url = {
      method: "GET",
      path: "/records",
      status: response ? 200 : 409,
    };
    return res.status(url.status).json(response);
  },
  increaseCounter: async (req, res) => {
    const amount = parseInt(req.query.amount) || 1; // 기본값은 1
    const response = await Counter.increaseValue(amount);
    const url = {
      method: "POST",
      path: "/counter",
      status: response.success ? 201 : 409,
    };
    return res.status(url.status).json(response);
  },

  getCounterValue: async (req, res) => {
    const value = await Counter.getValue();
    const url = {
      method: "GET",
      path: "/counter",
      status: value !== null ? 200 : 404,
    };
    return res.status(url.status).json({ value });
  },
};

module.exports = {
  output,
  process,
};
