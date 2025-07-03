const mysql = require('mysql2');
const customerSql = require('./sql/customerSql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'dev01',
  password: 'dev01',
  database: 'dev',
  connectionLimit: 10
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

function query(alias, values) {
  pool.query(customerSql[alias], values, (err, result) => {
    if (err) console.error(err);
    else console.log(result);
  });
}

query("customerDelete", [2]);