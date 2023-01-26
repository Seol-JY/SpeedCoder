"use strict";
const Record = require("../../model/Record");

const output = {
  main: (req, res) => {
    res.status(200).sendfile("../../views/index.html");
  },
};

const process = {
  redir: (req, res) => {
    res.redirect("/");
  },
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
};

module.exports = {
  output,
  process,
};
