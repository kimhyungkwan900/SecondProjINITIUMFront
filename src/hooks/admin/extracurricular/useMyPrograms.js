import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatDate } from "../../../utils/dateUtils";
import { fetchMyProgramsByEmp } from "../../../api/user/auth/employeesApi";

export default function useMyPrograms(empNo) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const alive = useRef(true);

  const load = useCallback(async () => {
    if (!empNo) { setRows([]); return; }
    setLoading(true);
    try {
      const data = await fetchMyProgramsByEmp(empNo);
      const list = Array.isArray(data) ? data : [];
      setRows(list.map(p => ({
        ...p,
        statusLabel: p.sttsNm ?? "-",
        applyPeriodText: `${formatDate(p.eduAplyBgngDt)} ~ ${formatDate(p.eduAplyEndDt)}`
      })));
    } finally {
      if (alive.current) setLoading(false);
    }
  }, [empNo]);

  useEffect(() => {
    alive.current = true;
    load();
    return () => { alive.current = false; };
  }, [load]);

  const filtered = useMemo(() => rows, [rows]);

  return { rows, filtered, loading, refetch: load };
}