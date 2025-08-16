import React, { useEffect, useState, useCallback } from "react";
import { getConsultList } from "../../../api/user/consult/ConsultUserApi";
import PageButton from "../../../component/admin/extracurricular/PageButton.jsx";

const PAGE_SIZE = 5;

const StudentConsultList = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1); // 1-based
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = {
        page: page - 1, // 0부터 시작
        size: PAGE_SIZE,
        sort: "consultDate,DESC",
      };
      const result = await getConsultList(params);
      setData(result.dscsnInfos?.content || []);
      setCurrent((result.dscsnInfos?.number ?? 0) + 1);
      setTotal(result.dscsnInfos?.totalElements ?? 0);
    } catch (e) {
      setError("상담 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page !== current && page > 0 && page <= totalPages) {
      fetchData(page);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담자명</th>
              <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담명</th>
              <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담일자</th>
              <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담내용</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-8">
                  불러오는 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-8">
                  상담 내역이 없습니다.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.dscsnInfoId}>
                  <td className="px-3 py-2 text-center border-b border-gray-200">{item.counselorName}</td>
                  <td className="px-3 py-2 text-center border-b border-gray-200">{item.consultTitle}</td>
                  <td className="px-3 py-2 text-center border-b border-gray-200">
                    {item.consultDate ? item.consultDate.split("T")[0] : ""}
                  </td>
                  <td className="px-3 py-2 text-center border-b border-gray-200">{item.consultContent}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PageButton totalPages={totalPages} currentPage={current} onPageChange={handlePageChange} />
    </div>
  );
};

export default StudentConsultList;
