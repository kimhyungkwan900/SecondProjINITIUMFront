import React, { useEffect, useState } from "react";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import { getAppliedProgramList } from "../../../api/user/extracurricular/UserProgramApi";

export default function StudentParticipatedProgramList() {
    const [programs, setPrograms] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        page: 0,      // 0-based
        size: 5,
        totalElements: 0,
        totalPages: 1,
    });

    const fetchPrograms = async (page = 0, size = 5) => {
        try {
            const res = await getAppliedProgramList({ page, size });
            setPrograms(res.content || []);
            setPageInfo({
                page: res.number ?? 0,
                size: res.size ?? size,
                totalElements: res.totalElements ?? 0,
                totalPages: res.totalPages ?? 1,
            });
        } catch (e) {
            console.error("신청 프로그램 목록 조회 실패:", e);
            setPrograms([]);
        }
    };

    useEffect(() => {
        fetchPrograms(pageInfo.page, pageInfo.size);
    }, [pageInfo.page, pageInfo.size]);

    const handlePageChange = (newPage1Based) => {
        // PageButton이 1-based라면 0-based로 변환
        const zeroBased = Math.max(newPage1Based - 1, 0);
        setPageInfo((prev) => ({ ...prev, page: zeroBased }));
    };

    const renderRows = () => {
        if (!programs.length) {
            return (
                <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                        신청한 프로그램이 없습니다.
                    </td>
                </tr>
            );
        }
        return programs.map((item, idx) => (
            <tr key={item.eduMngId ?? idx} className="text-center">
                <td className="px-3 py-2 border-b border-gray-200">
                    {idx + 1 + pageInfo.page * pageInfo.size}
                </td>
                <td className="px-3 py-2 border-b border-gray-200">{item.eduMngId}</td>
                <td className="px-3 py-2 border-b border-gray-200">{item.eduNm}</td>
                <td className="px-3 py-2 border-b border-gray-200">{item.ctgryNm || "-"}</td>
                <td className="px-3 py-2 border-b border-gray-200">
                    {(item.eduAplyBgngDt || "").slice(0, 10)} ~ {(item.eduAplyEndDt || "").slice(0, 10)}
                </td>
                <td className="px-3 py-2 border-b border-gray-200">{item.aprySttsNm}</td>
                <td className="px-3 py-2 border-b border-gray-200">
                    {(item.eduAplyBgngDt || "-").slice(0, 10)}
                </td>
            </tr>
        ));
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4 space-y-4">
            <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
                <table className="w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 text-center">
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">구분</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">프로그램코드</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">프로그램</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">그룹명</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">운영기간</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">지원상태</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">신청일</th>
                        </tr>
                    </thead>
                    <tbody>{renderRows()}</tbody>
                </table>
            </div>

            <div className="flex justify-between items-center">
                <div>검색결과: {pageInfo.totalElements}건</div>
                <PageButton
                    currentPage={pageInfo.page + 1}
                    totalPages={pageInfo.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
