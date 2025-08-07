import React from "react";
import PageButton from "../../../component/admin/extracurricular/PagaButton";

export default function StudentParticipatedProgramList() {
    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            {/* 결과 카운트 */}
            <div className="mb-2 text-[#D93C47] font-bold">
                Total <span className="text-lg">2</span> ea
            </div>

            {/* 결과 테이블 */}
            <div className="overflow-x-auto">
                <table className="w-full border border-[#E5E7EB] border-collapse bg-white text-sm">
                    <thead>
                        <tr className="bg-[#F9FAFB] text-center">
                            <th className="border px-2 py-2">구분</th>
                            <th className="border px-2 py-2">프로그램코드</th>
                            <th className="border px-2 py-2">프로그램</th>
                            <th className="border px-2 py-2">그룹명</th>
                            <th className="border px-2 py-2">운영기간</th>
                            <th className="border px-2 py-2">주관부서</th>
                            <th className="border px-2 py-2">진행상태</th>
                            <th className="border px-2 py-2">지원상태</th>
                            <th className="border px-2 py-2">만족도조사</th>
                            <th className="border px-2 py-2">신청일</th>
                            <th className="border px-2 py-2">활동내역</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            {/* 페이지네이션 */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    검색결과: 건
                </div>
                <PageButton
                />
            </div>
        </div>
    );
}
