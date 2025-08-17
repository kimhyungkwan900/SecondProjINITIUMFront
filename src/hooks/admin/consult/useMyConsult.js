import { useCallback, useEffect, useRef, useState } from "react";
import { formatDate } from "../../../utils/dateUtils";
import { getDscsnInfoByEmp } from "../../../api/user/consult/ConsultUserApi";

const ynLabel = (v) => (String(v ?? "").toUpperCase() === "Y" ? "공개" : "비공개");
const summarize = (text, len = 120) => {
  if (!text) return "-";
  const s = String(text);
  return s.length > len ? `${s.slice(0, len)}…` : s;
};

export default function useMyConsults(empNo) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const alive = useRef(true);

  const load = useCallback(async () => {
    if (!empNo) {
      setRows([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getDscsnInfoByEmp(empNo);
      const list = Array.isArray(data) ? data : [];

      const view = list.map((c) => {
        const a = c?.dscsnApplyDto ?? {};
        const studentNo = a?.studentNo ?? a?.stdNo ?? a?.applicantNo ?? "-";
        const studentName = a?.studentName ?? a?.stdNm ?? a?.applicantName ?? "-";
        const applyId = a?.dscsnApplyId ?? a?.applyId ?? "-";

        return {
          ...c,
          statusLabel: c?.sttsNm ?? c?.dscsnStatus ?? "-",
          appliedAtText: c?.aplyDt ? formatDate(c.aplyDt) : "-",
          releaseLabel: ynLabel(c?.dscsnReleaseYn),
          applicantText: `${studentNo} ${studentName}`.trim() || "-",
          applyIdText: applyId,
          resultSummary: summarize(c?.dscsnResultCn, 120),
        };
      });

      if (alive.current) setRows(view);
    } catch (e) {
      if (alive.current) setError(e);
    } finally {
      if (alive.current) setLoading(false);
    }
  }, [empNo]);

  useEffect(() => {
    alive.current = true;
    load();
    return () => { alive.current = false; };
  }, [load]);

  return { rows, loading, error, refetch: load };
}