import axios from "axios";
import { useEffect, useState } from "react";

const AdminCoreCompetencyMapping = ({ assessmentId }) => {
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [subList, setSubList] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  // 페이징 관련
  const itemsPerPage = 5;
  const [currentPageLeft, setCurrentPageLeft] = useState(1);
  const [currentPageRight, setCurrentPageRight] = useState(1);

  // 페이징 계산
  const totalPagesLeft = Math.ceil(subList.length / itemsPerPage) || 1;
  const totalPagesRight = Math.ceil(questionList.length / itemsPerPage) || 1;

  const currentSubList = subList.slice(
    (currentPageLeft - 1) * itemsPerPage,
    currentPageLeft * itemsPerPage
  );

  const currentQuestionList = questionList.slice(
    (currentPageRight - 1) * itemsPerPage,
    currentPageRight * itemsPerPage
  );

  // 하위역량 불러오기
  useEffect(() => {
    axios
      .get(`/api/admin/${assessmentId}/subcategories`)
      .then((res) => {
        setSubList(res.data || []);
        setCurrentPageLeft(1);
      })
      .catch((err) => console.error("하위역량 불러오기 실패", err));
  }, [assessmentId]);

  // 문항 불러오기
  useEffect(() => {
    if (selectedSubId) {
      axios
        .get(`/api/admin/${assessmentId}/${selectedSubId}/questions`)
        .then((res) => {
          setQuestionList(res.data?.questions || []);
          setCurrentPageRight(1);
        })
        .catch((err) => console.error("문항 불러오기 실패", err));
    } else {
      setQuestionList([]);
    }
  }, [selectedSubId, assessmentId]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        {/* 왼쪽: 하위역량 목록 */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          <div className="adm-card overflow-hidden">
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800">분석정보</h3>
            </div>
            <div className="border-t border-gray-200" />

            {/* 헤더 */}
            <div className="grid grid-cols-2">
              <div className="adm-th">분석번호</div>
              <div className="adm-th">분석기준명</div>
            </div>

            {/* 본문 */}
            <div>
              {currentSubList.length > 0 ? (
                currentSubList.map((sub, idx) => {
                  const selected = selectedSubId === sub.id;
                  return (
                    <div
                      key={sub.id}
                      role="row"
                      aria-selected={selected ? "true" : "false"}
                      onClick={() => setSelectedSubId(sub.id)}
                      className={`grid grid-cols-2 border-t hover:bg-gray-50 cursor-pointer transition-colors
                        ${idx % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"}
                        ${selected ? "bg-indigo-50 ring-1 ring-inset ring-indigo-200 font-semibold" : ""}`}
                    >
                      <div className="adm-td text-center">{(currentPageLeft - 1) * itemsPerPage + idx + 1}</div>
                      <div className="adm-td">{sub.name}</div>
                    </div>
                  );
                })
              ) : (
                <div className="adm-empty">하위역량이 없습니다.</div>
              )}
            </div>

            {/* 페이징 */}
            {subList.length > itemsPerPage && (
              <div className="px-4 py-3 flex justify-center items-center gap-3 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPageLeft((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPageLeft === 1}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  이전
                </button>
                <span className="text-sm text-gray-700">
                  <b>{currentPageLeft}</b> / {totalPagesLeft}
                </span>
                <button
                  onClick={() => setCurrentPageLeft((prev) => Math.min(prev + 1, totalPagesLeft))}
                  disabled={currentPageLeft === totalPagesLeft}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 문항 목록 */}
        <div className="col-span-12 lg:col-span-8 space-y-3">
          <div className="adm-card overflow-hidden">
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800">문항정보</h3>
            </div>
            <div className="border-t border-gray-200" />

        {/* 헤더 */}
        <div className="grid grid-cols-[80px_minmax(0,1fr)_120px] w-full">
          <div className="adm-th text-center">번호</div>
          <div className="adm-th">문항명</div>
          <div className="adm-th text-center">답변문항개수</div>
        </div>

        {/* 본문 */}
        <div>
          {currentQuestionList.length === 0 ? (
            <div className="adm-empty">문항이 없습니다.</div>
          ) : (
            currentQuestionList.map((q, idx) => (
              <div
                key={q.id}
                className={`grid grid-cols-[80px_minmax(0,1fr)_120px] border-t hover:bg-gray-50 transition-colors ${
                  idx % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"
                }`}
              >
                <div className="adm-td text-center">{q.questionNo}</div>

                <div className="adm-td min-w-0">
                  {/* line-clamp 플러그인 쓰면, 위 span 대신 아래 사용(2줄까지) */}
                  <span className="line-clamp-2 text-left" title={q.questionName}>{q.questionName}</span>
                </div>
                <div className="adm-td text-center">{q.choiceCount}</div>
              </div>
            ))
          )}
        </div>

            {/* 페이징 */}
            {questionList.length > itemsPerPage && (
              <div className="px-4 py-3 flex justify-center items-center gap-3 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPageRight((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPageRight === 1}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  이전
                </button>
                <span className="text-sm text-gray-700">
                  <b>{currentPageRight}</b> / {totalPagesRight}
                </span>
                <button
                  onClick={() =>
                    setCurrentPageRight((prev) => Math.min(prev + 1, totalPagesRight))
                  }
                  disabled={currentPageRight === totalPagesRight}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoreCompetencyMapping;
