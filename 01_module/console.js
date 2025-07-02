// 01_module/console.js

const { Console } = require("console");
const fs = require("fs");
const express = require("express");

const output = fs.createWriteStream("./sample/output.log", { flags: "a" });
const errlog = fs.createWriteStream("./sample/error.log", { flags: "a" });

const logger = new Console({
  stdout: output,
  stderr: errlog,
});

logger.log("로그기록");
logger.error("에러로그기록");

console.log("end");
