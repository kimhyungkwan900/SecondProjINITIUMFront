import { useEffect, useState } from "react";
import { getMileageSummary } from "../../../api/user/mileage/mileageApi"; // 경로 맞게 조정

export default function useMileageSummary(studentNo, page = 1, size = 10) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentNo) return;
    setLoading(true);
    setError("");

    getMileageSummary(studentNo, page, size)
      .then((data) => setSummary(data))
      .catch((e) => {
        console.error(e);
        setError("마일리지 정보를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [studentNo, page, size]);

  return { summary, loading, error };
}
