"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({
  path: "./server/.env",
});
const morgan = require("morgan");
const app = express();

const home = require("./src/routes/home");

app.use(express.static(`${__dirname}/src/views`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", home);

module.exports = app;
