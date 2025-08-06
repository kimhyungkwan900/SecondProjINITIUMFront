import axios from "axios";
import { useEffect, useState } from "react";

const CoreCompetencyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/ideal-talent-profile/tree", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", res.data);
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-[1100px] mx-auto">

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-gray-800">
          <thead className="bg-blue-100 text-blue-900 text-lg font-semibold">
            <tr>
              <th className="px-6 py-4 border border-gray-300 text-center">인재상</th>
              <th className="px-6 py-4 border border-gray-300 text-center">핵심역량</th>
              <th className="px-6 py-4 border border-gray-300 text-center">핵심역량 정의</th>
              <th className="px-6 py-4 border border-gray-300 text-center">하위역량</th>
              <th className="px-6 py-4 border border-gray-300 text-center">하위역량 정의</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) =>
              item.coreCompetencyCategories.map((core, j) =>
                core.subCompetencyCategories.map((sub, k) => {
                  const coreRowSpan = core.subCompetencyCategories.length;
                  const idealTalentRowSpan = item.coreCompetencyCategories.reduce(
                    (acc, curr) => acc + curr.subCompetencyCategories.length,
                    0
                  );

                  const showIdealTalent = j === 0 && k === 0;
                  const showCore = k === 0;

                  return (
                    <tr
                      key={`${i}-${j}-${k}`}
                      className="hover:bg-blue-50 transition-all duration-200"
                    >
                      {showIdealTalent && (
                        <td
                          className="px-4 py-4 border border-gray-300 align-middle text-center font-bold text-base bg-white whitespace-pre-line"
                          rowSpan={idealTalentRowSpan}
                        >
                          {item.idealTalent}
                        </td>
                      )}
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

                      <td className="px-4 py-4 border border-gray-300 text-center text-sm font-medium">
                        {sub.subName}
                      </td>
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
    </div>
  );
};

export default CoreCompetencyTable;
