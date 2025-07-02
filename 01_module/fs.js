// fs.js
const fs = require("fs");

console.log("start");

fs.readFile("./sample/output.log", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("비동기\n" + data);
});

data2 = fs.readFileSync("./sample/output.log", "utf8");
console.log("동기\n" + data2);

fs.writeFile("./sample/write.txt", "글쓰기..", "utf8", (err) => {
  if (err) {
    throw err;
  }
  console.log("글쓰기 완.");
});

console.log("end");
