"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({path: "./.env",});
const morgan = require("morgan");
const logger = require("./src/config/logger");
const home = require("./src/routes/home");

const app = express();
app.use(morgan('short', { stream: logger.stream }));
app.use(express.static(`${__dirname}/src/views`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home);

module.exports = app;
