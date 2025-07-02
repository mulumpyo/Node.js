const { members, add, getPerson } = require("./data.js");

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

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

console.log(arr1, arr2);
let result = [...arr1, ...arr2];
console.log(result);

let { firstName, lastName, email } = getPerson();

console.log(firstName, lastName, email);

function getScore() {
  return [70, 80, 90, 50, 60, 40];
}

let [x, y, ...z] = getScore();

console.log(x, y, z);

function sumAry(...ary) {
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}

sumAry(z);
