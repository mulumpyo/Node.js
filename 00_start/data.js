const members = [
  { id: "guest", name: "손님" },
  { id: "user", name: "회원" },
  { id: "admin", name: "관리자" },
];

let add = (a, b) => a + b;

let getPerson = () => {
  return {
    firstName: "장",
    lastName: "문복",
    age: 72,
    email: "moonboks12@naver.com",
  };
};

module.exports = { members, add, getPerson };
