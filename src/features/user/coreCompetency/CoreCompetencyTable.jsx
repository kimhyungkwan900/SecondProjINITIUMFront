import axios from "axios";
import { useEffect, useState } from "react";

const CoreCompetencyTable = () => {
  // 핵심역량 트리 데이터 저장용 state
  const [data, setData] = useState([]);

  // 컴포넌트 마운트 시 트리 데이터 불러오기
  useEffect(() => {
    axios
      .get("/api/user/ideal-talent-profile/tree", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰 인증
        },
      })
      .then((res) => {
        // 응답이 배열인지 확인
        if (Array.isArray(res.data)) {
          setData(res.data); // 정상 데이터 저장
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", res.data);
          setData([]); // 오류 시 빈 배열로 초기화
        }
      })
      .catch((err) => console.log(err)); // 에러 로그 출력
  }, []);

  return (
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-gray-800">
          {/* 테이블 헤더 */}
          <thead className="bg-blue-100 text-blue-900 text-lg font-semibold">
            <tr>
              <th className="px-6 py-4 border border-gray-300 text-center">인재상</th>
              <th className="px-6 py-4 border border-gray-300 text-center">핵심역량</th>
              <th className="px-6 py-4 border border-gray-300 text-center">핵심역량 정의</th>
              <th className="px-6 py-4 border border-gray-300 text-center">하위역량</th>
              <th className="px-6 py-4 border border-gray-300 text-center">하위역량 정의</th>
            </tr>
          </thead>

          {/* 테이블 바디 */}
          <tbody>
            {data.map((item, i) =>
              item.coreCompetencyCategories.map((core, j) =>
                core.subCompetencyCategories.map((sub, k) => {
                  // 하나의 핵심역량이 가진 하위역량 수 → core 역량에 rowspan 적용할 수 있도록
                  const coreRowSpan = core.subCompetencyCategories.length;

                  // 하나의 인재상이 가진 모든 하위역량 수 → idealTalent에 rowspan 적용할 수 있도록
                  const idealTalentRowSpan = item.coreCompetencyCategories.reduce(
                    (acc, curr) => acc + curr.subCompetencyCategories.length,
                    0
                  );

                  // 인재상은 처음 한 번만 표시 (j=0, k=0일 때)
                  const showIdealTalent = j === 0 && k === 0;

                  // 핵심역량은 하위역량 시작마다 한 번만 표시 (k=0일 때)
                  const showCore = k === 0;

                  return (
                    <tr
                      key={`${i}-${j}-${k}`}
                      className="hover:bg-blue-50 transition-all duration-200"
                    >
                      {/* 인재상 셀 (rowspan 적용) */}
                      {showIdealTalent && (
                        <td
                          className="px-4 py-4 border border-gray-300 align-middle text-center font-bold text-base bg-white whitespace-pre-line"
                          rowSpan={idealTalentRowSpan}
                        >
                          {item.idealTalent}
                        </td>
                      )}

                      {/* 핵심역량명, 정의 셀 (rowspan 적용) */}
                      {showCore && (
                        <>
                          <td
                            className="px-4 py-4 border border-gray-300 align-middle text-center font-semibold text-base whitespace-pre-line"
                            rowSpan={coreRowSpan}
                          >
                            {core.coreName}
                          </td>
                          <td
                            className="px-4 py-4 border border-gray-300 align-middle text-center text-sm leading-relaxed whitespace-pre-line"
                            rowSpan={coreRowSpan}
                          >
                            {core.coreDefinition}
                          </td>
                        </>
                      )}

                      {/* 하위역량명 */}
                      <td className="px-4 py-4 border border-gray-300 text-center text-sm font-medium">
                        {sub.subName}
                      </td>

                      {/* 하위역량 정의 */}
                      <td className="px-4 py-4 border border-gray-300 text-left text-sm leading-relaxed">
                        {sub.subDefinition}
                      </td>
                    </tr>
                  );
                })
              )
            )}
          </tbody>
        </table>
      </div>
  );
};

export default CoreCompetencyTable;
