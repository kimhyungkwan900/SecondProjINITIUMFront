import { useEffect, useState } from "react";
import { fetchEmployeeByNo } from "../api/user/auth/employeesApi";

export default function useEmployeeInfo(empNo) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(!!empNo);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!empNo) return;
    setLoading(true);
    setError(null);
    fetchEmployeeByNo(empNo)
      .then(setEmployee)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [empNo]);

  return { employee, loading, error };
}
