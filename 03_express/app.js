// app.js
const express = require("express");
const fs = require("fs");
const app = express();
const bp = require("body-parser");
const cors = require("cors");

// path (내장)
const path = require('path');

// multipart form file upload
const multer = require("multer");

const customerRoute = require("./routes/customer");
const productRoute = require("./routes/product");

// app.{}
// get, post, put, delete (CRUD)

// application/json request
app.use(bp.json());

// application/urlencoded request
app.use(bp.urlencoded());

// file upload. (multer library)
const storage = multer.diskStorage({
  destination: (req, file, successCallBack) => {
    // save path
    successCallBack(null, 'uploads');
  }
  , filename: (req, file, successCallBack) => {
    // charset utf-8
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8");
    // upload file name
    successCallBack(null
      , Date.now()
      + "_"
      + fn
    ); // {date}_{filename}.jpg
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024},
  fileFilter: (req, file, successCallBack) => {
    // .test method return type (boolean)
    const mimetype = /jpg|jpeg|png|gif/.test(file.mimetype);
    return successCallBack(null, mimetype);
  }
});

// cors 원칙
app.use(cors({}));

app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

// request get "/upload"
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

// express error exception middleware
app.use((err, req, res, next) => {
  console.log(err, req, res);
});

// 파일 업로드 실행 Logic
app.post("/upload", upload.array("myFile"), (req, res) => {
  console.log(req.files); // upload file info
  console.log(req.body); // upload file body
  let msg = !req.files ? "이미지만 업로드 가능합니다." : "Upload Successfully";
  res.send(msg);
});

// cors (동일 출처 원칙)
app.get('/getCors', (req, res) => {
  let result = { id: "user01", name: "Hong" };
  res.json(result);
});

// app.get("/customer", (req, res) => {
//   res.send("customer 경로");
// });

// app.post("/customer", (req, res) => {
//   // res.send("포스트라서 안뜨지롱");
//   res.json({ id: 10, name: "hongkilldong" });
// });

// body-parse를 활용해서 요청정보의 body 정보를 해석
app.post("/json-data", (req, res) => {
  console.log(req.body);
  res.send("json 요청");
});

app.post("/form-data", (req, res) => {
  console.log(req.body);
  res.send("form-data 요청");
});

// router
app.use("/customer", customerRoute);
app.use("/product", productRoute);

// listen (port, res-function)
app.listen(3000, () => {
  console.log("http://localhost:3000 서버실행");
});
