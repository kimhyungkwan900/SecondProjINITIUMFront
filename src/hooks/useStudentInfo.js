import { useEffect, useState, useCallback } from "react";
import { fetchStudentByNo } from "../api/user/auth/studentsApi";

export default function useStudentInfo(studentNo) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudentByNo(studentNo);
      setStudent(data);
    } catch (err) {
      setError(err);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, [studentNo]); // studentNo가 바뀔 때만 새로 만듦

  useEffect(() => {
    if (studentNo) fetchStudent();
  }, [studentNo, fetchStudent]);

  return { student, loading, error, refetch: fetchStudent };
}
