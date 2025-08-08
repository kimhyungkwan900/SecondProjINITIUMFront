import React, { useEffect, useState } from "react";
import { fetchAllResultsByStudent } from "../../../api/user/diagnostic/diagnosisApi";
import StudentDiagnosticResultsTable from "./StudentDiagnosticResultsTable";

export default function StudentDiagnosticResultsContainer({ studentNo }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studentNo) return;
        setLoading(true);
        setError(null);
        fetchAllResultsByStudent(studentNo)
            .then(data => setResults(data || []))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [studentNo]);

    const handleViewResult = (result) => {
        alert(`진단평가 결과 상세: ${result.testName}\n점수: ${result.totalScore}`);
    };

    if (loading) return <div className="text-center py-8 text-[#222E8D] font-semibold">진단검사 결과 로딩 중...</div>;
    if (error) return <div className="text-center py-8 text-red-500">결과 조회 실패: {error.message}</div>;

    return (
        <StudentDiagnosticResultsTable results={results} onViewResult={handleViewResult} />
    );
}
