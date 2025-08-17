import { CodeDisplay } from "../../component/common/CodeConverter/CodeSelect";
import { formatDate } from "../../utils/dateUtils";

export const programColumns = [
  // 프로그램명
  { key: "eduNm", header: "프로그램명", minWidth: "16rem", flex: 2, ellipsis: true },

  // 유형 (영문 enum → 한글)
  { key: "eduType", header: "유형", minWidth: "8rem",
    render: (r) => <CodeDisplay category="EDU_TYPE" code={r.eduType} /> },

  // 대상 (영문 enum → 한글)
  { key: "eduTrgtLmt", header: "대상", minWidth: "8rem",
    render: (r) => <CodeDisplay category="EDU_TRGT_LMT" code={r.eduTrgtLmt} /> },

  // 성별제한 (영문 enum → 한글)
  { key: "eduGndrLmt", header: "성별제한", minWidth: "8rem",
    render: (r) => <CodeDisplay category="EDU_GNDR_LMT" code={r.eduGndrLmt} /> },

  // 모집인원
  { key: "eduPtcpNope", header: "모집인원", minWidth: "7rem",
    className: "text-right tabular-nums" },

  // 프로그램 시작일
  { key: "eduBgngYmd", header: "프로그램 시작일", minWidth: "10rem",
    className: "whitespace-nowrap",
    render: (r) => (r?.eduBgngYmd ? formatDate(r.eduBgngYmd) : "-") },

  // 프로그램 종료일
  { key: "eduEndYmd", header: "프로그램 종료일", minWidth: "10rem",
    className: "whitespace-nowrap",
    render: (r) => (r?.eduEndYmd ? formatDate(r.eduEndYmd) : "-") },

  // 프로그램 상태 (영문 enum → 한글)
  { key: "sttsNm", header: "프로그램 상태", minWidth: "8rem",
    render: (r) => <CodeDisplay category="PROGRAM_STATUS" code={r.sttsNm} /> },

  // 프로그램 마일리지
  { key: "eduMlg", header: "프로그램 마일리지", minWidth: "7rem",
    className: "text-right tabular-nums" },

  //  신청인원
  { key: "request", header: "신청인원", minWidth: "7rem",
    className: "text-right tabular-nums" },

  //  참여인원
  { key: "accept", header: "참여인원", minWidth: "7rem",
    className: "text-right tabular-nums" },
];