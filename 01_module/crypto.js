// crypto.js
const crypto = require("crypto");

let pw = crypto.createHash("sha512").update("pw1234").digest("base64");

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      }
      resolve(buf);
    });
  });
};

createSalt()
  .then((result) => result.toString("base64"))
  .catch((err) => console.error(err));

const createCryptoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve({
        salt: salt.toString("base64"),
        password: key.toString("base64"),
      });
    });
  });
};

async function main() {
  const salt = await createSalt();
  console.log("소금값: " + salt.toString("base64"));

  const pw = await createCryptoPassword("1111", salt);
  console.log("해쉬된 비밀번호: " + pw.password);
}

main();
