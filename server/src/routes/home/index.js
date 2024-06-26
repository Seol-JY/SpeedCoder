"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.main);
router.post("/records", ctrl.process.addRecord);
router.get("/records", ctrl.process.getRecordByPage);
router.post("/counter", ctrl.process.increaseCounter);
router.get("/counter", ctrl.process.getCounterValue);

module.exports = router;
