const cron = require("node-cron");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
require("dotenv").config({ path: "./sql/.env" });
require("dotenv").config({ path: "./nodemailer/.env" });
const nodemailer = require("./nodemailer");
const cleaner = require("./cleaner.js");

// Cron 스케줄러 설정
cron.schedule(
  "30 * * * *",
  () => {
    cleaner.deleteExcelFiles();
  },
  {
    scheduled: true,
    timezone: "Asia/Seoul", // 대한민국 시간대 (KST) 설정
  }
);

const mysql = require("./sql");

// 파일업로드. multer.
// 저장경로와 파일명 지정.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 저장경로.
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // 업로드 파일명.
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8");
    cb(null, Date.now() + "_" + fn); // 121212131_sample.jpg
  },
});
// Multer 인스턴스 생성.
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root 경로");
});

// 이메일 발송 화면.
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 이메일 전송.
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.json({ retCode: "success", retVal: result }); // {"retCode":"success"}
  } catch (err) {
    res.json({ retCode: "fail" });
  }
});

// 엑셀 업로드 -> DB insert.
// multer.
// 이메일 발송 화면.
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html"));
});

// 첨부처리.
app.post("/excel", upload.single("myFile"), (req, res) => {
  console.log(req.file); //업로드된 파일의 정보.
  console.log(req.body); // 요청몸체의 정보.
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`);
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트.
  // 시트명으로 첫번째 시트가져오기.
  const firstSheet = workbook.Sheets[firstSheetName];
  // 첫번째 시트의 데이터를 json으로 생성.
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  console.log(firstSheetJson);
  // 반복문 활용. insert.
  const fsj = firstSheetJson // [{a},{c},{k},{b}]
    .sort((a, b) => {
      return a.name < b.name; // 오름차순(1, 2, 3, 5), 내림차순
    });
  // 정렬된 배열을 다시 생성.

  fsj.forEach(async (customer) => {
    let result = await mysql.query("customerInsert", customer);
  });

  if (!req.file) {
    res.send("이미지 처리가능함.");
  } else {
    res.send("업로드 완료");
  }
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
