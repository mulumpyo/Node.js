const express = require("express");
const mysql = require("./sql");
const app = express();
const bp = require("body-parser");
require("dotenv").config({ path: "sql/.env" });

console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.PASSWORD);

// req data를 json으로 인식
app.use(bp.json());

app.get("/", (req, res) => {
  res.send("root 경로");
});

// get
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql.query("customerList");
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// post
app.post("/customer", async (req, res) => {
  try {
    console.log(req.body);
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// put
app.put("/customer", async (req, res) => {
  try {
    console.log(req.body);
    let data = req.body.param;
    let result = await mysql.query("customerUpdate", data);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// delete
app.delete("/customer/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // let name = req.params.name;
    console.log(id, " ", name);
    let result = await mysql.query("customerDelete", id);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/customers", (req, res) => {

//   mysql
//     .query("customerList")
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => res.send(err));

// });

app.listen(3000, () => {
  console.log("http://localhost:3000 Server Enable");
});

// db object
let data = [{}];

// // update
// data = {
//   name: "username",
//   email: "user2@email.com",
//   phone: "010-0202-0202",
//   address: ""
// };

// pool.query(
//   customerSql.customerUpdate
//   , [data, 2]
//   , (err, result) => {
//       if (err) {
//         console.error('처리 중 에러 발생 Error: ', err);
//       } else {
//         console.log(result);
//       }
// });

// // insert
// // let data = ["방예담", "yedam@yedam.ac", "010-5555-5555"];

// data = {
//   name: "username",
//   email: "user@email.com",
//   phone: "010-0101-0101",
//   address: ""
// };

// pool.query(
//   customerSql.customerInsert
//   , data
//   , (err, result) => {
//       if (err) {
//         console.error('처리 중 에러 발생 Error: ', err);
//       } else {
//         console.log(result);
//       }
// });

// // select
// pool.query(customerSql.customerList, (err, result) => {
//   if (err) {
//     console.error('처리 중 에러 발생 Error: ', err);
//   } else {
//     console.log(result);
//   }
// });

// // delete
// pool.query(customerSql.customerDelete, [4] ,(err, result) => {
//   if (err) {
//     console.error('처리 중 에러 발생 Error: ', err);
//   } else {
//     console.log(result);
//   }
// });