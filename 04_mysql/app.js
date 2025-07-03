const mysql = require("mysql2");
const custSql = require("./sql/customerSql"); // {custList,}

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});
let data = ["name01", "test@email.com", "010-1111-1111"];
data = [
  {
    name: "username",
    email: "user@email.com",
    phone: "010-0101-0101",
    address: "",
  },
  1,
];

// console.log(custSql["customerInsert"]);
function query(alias, values) {
  pool.query(custSql[alias], values, (err, result) => {
    if (err) {
      console.log("처리중 에러", err);
    } else {
      console.log(result);
    }
  });
}

query("customerUpdate", [
  {
    name: "username",
    email: "user@email.com",
    phone: "010-0101-0101",
    address: "",
  },
  1,
]);
