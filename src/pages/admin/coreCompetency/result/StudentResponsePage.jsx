import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const StudentResponsePage = ({ assessmentId, studentNo, pageSize = 5 }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchResponses = async () => {
    if (!assessmentId || !studentNo) {
      setResponses([]);
      return;
    }
    setLoading(true);
    try {
      const url = `/api/admin/core-competency/result/assessments/${assessmentId}/response/students/${encodeURIComponent(String(studentNo).trim())}`;
      const res = await axios.get(url);

      const list = Array.isArray(res.data) ? res.data : [];
      list.sort((a, b) => (Number(a.questionNo) || 0) - (Number(b.questionNo) || 0));
      setResponses(list);
      // page는 아래 리셋 useEffect에서 처리함
    } catch (e) {
      console.error("응답 로딩 실패", e);
      setResponses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResponses(); }, [assessmentId, studentNo]);

  // ① 진단/학생/페이지크기 변경 시 1페이지로 리셋
  useEffect(() => { setPage(1); }, [assessmentId, studentNo, pageSize]);

  // totalPages를 메모이제이션
  const totalPages = useMemo(() => {
    const t = Math.ceil((responses?.length || 0) / pageSize);
    return t > 0 ? t : 1;
  }, [responses, pageSize]);

  // ② 전체 페이지 수가 변할 때 현재 page를 안전 범위로 보정
  useEffect(() => {
    setPage((p) => {
      if (p < 1) return 1;
      if (p > totalPages) return totalPages;
      return p;
    });
  }, [totalPages]);

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return responses.slice(start, start + pageSize);
  }, [responses, page, pageSize]);

  return (
    <div className="px-0">
      <span className="text-xl text-black font-bold">▐ 응답정보</span>
      <table className="w-full text-[16px] border border-gray-300 rounded-md overflow-hidden mt-3">
        <thead className="bg-gray-100 text-gray-700 text-center">
          <tr>
            <th className="border p-2 w-45 text-center">문항번호</th>
            <th className="border p-2">선택지</th>
          </tr>
        </thead>
        <tbody>
          {!studentNo ? (
            <tr><td colSpan="2" className="p-4 text-center text-gray-500">학생을 선택하세요.</td></tr>
          ) : loading ? (
            <tr><td colSpan="2" className="p-4 text-center text-gray-500">불러오는 중…</td></tr>
          ) : current.length === 0 ? (
            <tr><td colSpan="2" className="p-4 text-center text-gray-500">응답이 없습니다.</td></tr>
          ) : (
            current.map((r, idx) => (
              <tr key={`${r.questionNo}-${idx}`} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{r.questionNo}</td>
                <td className="border p-2 text-center">{r.label}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지가 2페이지 이상일 때만 페이지네이션 표시 */}
      {studentNo && totalPages > 1 && (
        <div className="mt-3 flex justify-center gap-2 items-center text-sm">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="mr-2 px-3 py-2 border rounded disabled:opacity-40"
          >
            이전
          </button>
          <span>{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="ml-2 px-3 py-2 border rounded disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentResponsePage;
