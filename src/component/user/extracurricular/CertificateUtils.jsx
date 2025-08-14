import { jsPDF } from "jspdf";
import fontBase64 from "../../../font/notoSansKRBase64"

const loadImageAsDataURL = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });

// async로 변경
export const generateCertificatePDF = async (userName, programName, studentNo, schoolSubject) => {
  const doc = new jsPDF();

  doc.addFileToVFS("NotoSansKR-Regular.ttf", fontBase64);
  doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
  doc.setFont("NotoSansKR", "normal");

  doc.setLineWidth(1.5);
  doc.rect(10, 10, 190, 277);

  doc.setFontSize(50);
  doc.text("수  료  증", 105, 60, { align: "center" });

  doc.setFontSize(18);
  doc.text("이름 : " + userName, 20, 80);
  doc.text("학과 : " + schoolSubject, 20, 90);
  doc.text("학번 : " + studentNo, 20, 100);
  doc.text("프로그램 명 : " + programName, 20, 110);

  doc.setFontSize(20);
  doc.text("귀하는 본 프로그램을 성공적으로 수료하셨음을 증명합니다.", 105, 140, { align: "center" });

  // 발급일
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  doc.setFontSize(12);
  doc.text(`발급일: ${dateStr}`, 180, 270, { align: "right" });

  // 로고 이미지 삽입
  const logoUrl = "/Logo/Logo.png";
  const logoBase64 = await loadImageAsDataURL(logoUrl);
  doc.addImage(logoBase64, "PNG", 15, 15, 30, 30);

  doc.save(`${programName}_수료증.pdf`);
};