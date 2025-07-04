const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./sql/.env" });

const mysql = require("./sql");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root 경로");
});

// 조회.
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql.query("customerList");
    res.send(result);
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

// 추가.
app.post("/customer", async (req, res) => {
  try {
    console.log(req.body.param);
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

// 수정.
app.put("/customer", async (req, res) => {
  try {
    let data = req.body.param;
    let result = await mysql.query("customerUpdate", data);
    res.send(result);
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

// 삭제. http://localhost:3000/customer/?id=8&name=Hong&pont=23
// 삭제. http://localhost:3000/customer/8/Hong/23
app.delete("/customer/:id", async (req, res) => {
  try {
    console.log(req.params);
    let { id } = req.params; // {id: 8}
    let result = await mysql.query("customerDelete", id);
    res.send(result);
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running...!!!");
});

// console.log(custSql["customerInsert"]);

// query("customerList", [
//   {
//     name: "username",
//     email: "user@email.com",
//     phone: "010-0101-0101",
//     address: "",
//   },
//   1,
// ]);
