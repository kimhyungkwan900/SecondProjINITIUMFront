import { jsPDF } from "jspdf";

export const generateCertificatePDF = (userName, programName) => {
  const doc = new jsPDF();

  // 순서: VFS → Font 등록 → 사용
  doc.addFileToVFS("NotoSansKR-Regular.ttf");
  doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
  doc.setFont("NotoSansKR", "normal");

  doc.setFontSize(20);
  doc.text("수료증", 20, 20);
  doc.setFontSize(14);
  doc.text("본인은 아래 프로그램을 성공적으로 이수하였음을 증명합니다.", 20, 40);
  doc.setFontSize(16);
  doc.text(userName, 20, 60);
  doc.setFontSize(14);
  doc.text(programName, 20, 80);

  doc.save(`${programName}이수증.pdf`);
};