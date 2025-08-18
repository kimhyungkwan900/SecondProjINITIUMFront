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
      const url = `/api/admin/core-competency/result/assessments/${assessmentId}/response/students/${encodeURIComponent(
        String(studentNo).trim()
      )}`;
      const res = await axios.get(url);

      const list = Array.isArray(res.data) ? res.data : [];
      list.sort(
        (a, b) => (Number(a.questionNo) || 0) - (Number(b.questionNo) || 0)
      );
      setResponses(list);
    } catch (e) {
      console.error("응답 로딩 실패", e);
      setResponses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [assessmentId, studentNo]);

  // 진단/학생/페이지크기 변경 시 1페이지로 리셋
  useEffect(() => {
    setPage(1);
  }, [assessmentId, studentNo, pageSize]);

  const totalPages = useMemo(() => {
    const t = Math.ceil((responses?.length || 0) / pageSize);
    return t > 0 ? t : 1;
  }, [responses, pageSize]);

  // 전체 페이지 수가 변할 때 현재 page 보정
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
    <div className="adm-card">
      {/* 카드 헤더 */}
      <div className="p-2">
        <h3 className="text-base font-semibold text-gray-800">응답정보</h3>
      </div>


      {/* 카드 + DataGrid 규격 */}
      <div className="adm-card overflow-hidden">
        {/* 헤더 */}
        <div className="grid grid-cols-2">
          <div className="adm-th">문항번호</div>
          <div className="adm-th">선택지</div>
        </div>

        {/* 본문 */}
        <div>
          {!studentNo ? (
            <div className="adm-empty">학생을 선택하세요.</div>
          ) : loading ? (
            <div className="adm-loading">불러오는 중…</div>
          ) : current.length === 0 ? (
            <div className="adm-empty">응답이 없습니다.</div>
          ) : (
            current.map((r, idx) => (
              <div
                key={`${r.questionNo}-${idx}`}
                className={`grid grid-cols-2 items-center border-t hover:bg-gray-50 ${idx % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"
                  }`}
              >
                <div className="adm-td">{r.questionNo}</div>
                <div className="adm-td">{r.label}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 페이지네이션 (하단 컨트롤 바 규격과 톤 맞춤) */}
      {studentNo && totalPages > 1 && (
        <div className="mt-3 flex justify-center gap-2 items-center text-sm">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="min-w-9 h-9 px-3 inline-flex items-center justify-center rounded border text-sm transition border-gray-300 text-[#354649] hover:bg-[#E0E7E9] disabled:opacity-50 disabled:pointer-events-none"
          >
            이전
          </button>
          <span className="font-semibold">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="min-w-9 h-9 px-3 inline-flex items-center justify-center rounded border text-sm transition border-gray-300 text-[#354649] hover:bg-[#E0E7E9] disabled:opacity-50 disabled:pointer-events-none"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentResponsePage;
