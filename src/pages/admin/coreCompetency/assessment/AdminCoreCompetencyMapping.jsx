import axios from "axios";
import { useEffect, useState } from "react";

const AdminCoreCompetencyMapping = ({ assessmentId }) => {
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [subList, setSubList] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  // 페이징 관련
  const itemsPerPage = 5;

  const [currentPageLeft, setCurrentPageLeft] = useState(1); // 왼쪽 테이블
  const [currentPageRight, setCurrentPageRight] = useState(1); // 오른쪽 테이블

  // 페이징 계산
  const totalPagesLeft = Math.ceil(subList.length / itemsPerPage);
  const totalPagesRight = Math.ceil(questionList.length / itemsPerPage);

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
        console.log(res.data)
        setSubList(res.data);
        setCurrentPageLeft(1); // 새로 로딩 시 페이지 초기화
      })
      .catch((err) => console.error("하위역량 불러오기 실패", err));
  }, [assessmentId]);

  // 문항 불러오기
  useEffect(() => {
    if (selectedSubId) {
      axios
        .get(`/api/admin/${assessmentId}/${selectedSubId}/questions`)
        .then((res) => {
          setQuestionList(res.data.questions);
          console.log('정상적으로 API 호출:', selectedSubId);
          setCurrentPageRight(1); // 문항 클릭 시 초기화
        })
        .catch((err) => console.error("문항 불러오기 실패", err));
    } else {
      setQuestionList([]);
    }
  }, [selectedSubId]);

  return (
    <div className="mt-3 px-6 py-6 bg-white rounded-xl shadow-md border border-gray-300">
      <div className="flex gap-4">
        {/* 왼쪽: 하위역량 목록 테이블 */}
        <div className="w-1/3">
          <span className="text-xl text-black font-bold">▐ 분석정보</span>
          <table className="w-full mt-3 text-[16px] border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-center">
              <tr>
                <th className="border p-2 w-1/4 text-center">분석번호</th>
                <th className="border p-2">분석기준명</th>
              </tr>
            </thead>
            <tbody>
              {currentSubList.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`cursor-pointer hover:bg-blue-50 ${
                    selectedSubId === sub.id ? "bg-blue-100 font-semibold" : ""
                  }`}
                >
                  <td className="border p-2 text-center">{sub.id}</td>
                  <td className="border p-2 text-center">{sub.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 왼쪽 페이징 */}
          {subList.length > itemsPerPage && (
            <div className="mt-3 flex justify-center gap-2 items-center text-sm">
              <button
                onClick={() =>
                  setCurrentPageLeft((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPageLeft === 1}
                className="mr-2 px-3 py-2 border rounded disabled:opacity-40"
              >
                이전
              </button>
              <span>
                {currentPageLeft} / {totalPagesLeft}
              </span>
              <button
                onClick={() =>
                  setCurrentPageLeft((prev) =>
                    Math.min(prev + 1, totalPagesLeft)
                  )
                }
                disabled={currentPageLeft === totalPagesLeft}
                className="ml-2 px-3 py-2 border rounded disabled:opacity-40"
              >
                다음
              </button>
            </div>
          )}
        </div>

        {/* 오른쪽: 문항 테이블 */}
        <div className="w-2/3">
          <span className="text-xl text-black font-bold">▐ 문항정보</span>
          <table className="w-full text-[16px] border border-gray-300 rounded-md overflow-hidden mt-3">
            <thead className="bg-gray-100 text-gray-700 text-center">
              <tr>
                <th className="border p-2 w-28 text-center">문항번호</th>
                <th className="border p-2">문항명</th>
                <th className="border p-2 w-32 text-center">답변문항개수</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestionList.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    문항이 없습니다.
                  </td>
                </tr>
              ) : (
                currentQuestionList.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{q.questionNo}</td>
                    <td className="border p-2">{q.questionName}</td>
                    <td className="border p-2 text-center">{q.choiceCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* 오른쪽 페이징 */}
          {questionList.length > itemsPerPage && (
            <div className="mt-3 flex justify-center gap-2 items-center text-sm">
              <button
                onClick={() =>
                  setCurrentPageRight((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPageRight === 1}
                className="mr-2 px-3 py-2 border rounded disabled:opacity-40"
              >
                이전
              </button>
              <span>
                {currentPageRight} / {totalPagesRight}
              </span>
              <button
                onClick={() =>
                  setCurrentPageRight((prev) =>
                    Math.min(prev + 1, totalPagesRight)
                  )
                }
                disabled={currentPageRight === totalPagesRight}
                className="ml-2 px-3 py-2 border rounded disabled:opacity-40"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCoreCompetencyMapping;
