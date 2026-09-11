"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const morgan = require("morgan");
const logger = require("./src/config/logger");
const db = require("./src/config/db");
const home = require("./src/routes/home");

const app = express();
app.use(morgan("short", { stream: logger.stream }));

// liveness 는 DB 를 보지 않는다, DB 가 잠깐 흔들릴 때 파드까지 재시작되면 더 나빠진다
app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));

app.get("/readyz", async (req, res) => {
  try {
    await db.ping();
    res.status(200).json({ status: "ready" });
  } catch (err) {
    res.status(503).json({ status: "unready", reason: err.message });
  }
});

app.use(express.static(`${__dirname}/src/views`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home);

module.exports = app;
