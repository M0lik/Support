const fs = require("fs");
const crypto = require("crypto");
const KEY = require("./constant.js");

const algorithm = "aes-256-cbc";
const bufferedKey = Buffer.from(KEY);
const iv = crypto.randomBytes(16);

const content = "NodeJS";

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, bufferedKey, iv);
  cipher.update(text);
  return iv.toString("hex") + ":" + cipher.final().toString("hex");
}

fs.writeFile("./encryptedData", encrypt(content), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
