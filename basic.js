const { members, add } = require("./data.js");

console.log("hello");
let myName = "홍길동";
let age = 20;

if (age > 20) {
  console.log(`${myName}은 성인`);
} else {
  console.log(`${myName}은 미성년`);
}

console.log(members);
console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) console.log(item);
});
