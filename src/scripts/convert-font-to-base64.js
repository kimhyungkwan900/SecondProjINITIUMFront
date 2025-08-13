import fs from "fs";
import path from "path";

const fontPath = path.resolve("./src/font/NotoSansKR-Regular.ttf"); // 루트 기준
const fontBuffer = fs.readFileSync(fontPath);
const base64Font = fontBuffer.toString("base64");

fs.writeFileSync(
  "./src/font/notoSansKRBase64.js",
  `export default "${base64Font}";\n`
);
console.log("Base64 변환 완료");