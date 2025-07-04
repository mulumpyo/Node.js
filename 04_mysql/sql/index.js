// sql/index.js

const mysql = require('mysql2');
const customerSql = require('./customerSql');

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT
});

async function query(alias, values) {

  return new Promise((resolve, reject) => {

    pool.query(customerSql[alias]
              , values
              , (err, result) => {

      if (err) {
        console.error(err); reject(err);
      }
      else {
        console.log(result); resolve(result);
      }
      
    });
  });
}

module.exports = { query };