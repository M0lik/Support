const fs = require("fs");
const crypto = require("crypto");
const KEY = require('./constant.js');

const algorithm = "aes-256-cbc";
const bufferedKey = Buffer.from(KEY);

function decrypt(text) {
  let res = text.split(":");
  let iv = Buffer.from(res[0], "hex");
  let encryptedText = Buffer.from(res[1], "hex");
  let decipher = crypto.createDecipheriv(algorithm, bufferedKey, iv);
  decipher.update(encryptedText);
  return decipher.final().toString();
}

fs.readFile("./encryptedData", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(decrypt(data));
});
