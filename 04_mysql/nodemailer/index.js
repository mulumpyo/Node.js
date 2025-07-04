const nodemailer = require("nodemailer");
// require("dotenv").config({ path: "./.env" });

const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.DAUM_EMAIL,
    pass: process.env.DAUM_APP_PASSWORD,
  },
};

const sendEmail = async (data) => {
  // Promise객체로 반환.
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("메일성공 ", result);
      resolve(result);
    } catch (err) {
      console.log("메일실패 ", err);
      reject(err);
    }
  });
};

module.exports = {
  sendEmail,
};
