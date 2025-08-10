import React, { useState } from "react";
import DiagnosisForm from "../../../component/user/diagnostic/DiagnosisForm.jsx";
import { createAdminDiagnosticTest } from "../../../api/user/diagnostic/diagnosisAdminApi.jsx";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";

const DiagnosisAdminCreatePage = () => {
  const [resetKey, setResetKey] = useState(0); // 폼 리셋용 key

  const handleCreate = (dto) => {
    createAdminDiagnosticTest(dto)
      .then(() => {
        alert("검사 등록 완료");
        setResetKey((prev) => prev + 1); // 폼 초기화
      })
      .catch((err) => {
        alert("등록 실패");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <main className="max-w-7xl mx-auto px-6 pb-10">
        {/* 헤더 (Outlet 안쪽 헤더 가이드 적용) */}
        <div className="pt-6">
          <AdminSectionHeader title="진단평가 생성" />
        </div>

        {/* 본문 카드 컨테이너: overflow-x-auto, rounded-lg, shadow-sm, bg-white */}
        <section className="overflow-x-auto rounded-lg shadow-sm bg-white p-8 mt-6">
          {/* 제목 줄 */}
          <div className="flex items-center gap-2">
            <span className="text-[26px] text-blue-600">|</span>
            <h2 className="text-[26px] font-semibold">새로운 검사 등록</h2>
          </div>
          <hr className="my-4 border-gray-200" />

          {/* 안내문 */}
          <p className="text-gray-700 mb-4">
            아래 폼을 작성해 내부 진단검사를 등록하세요. 필수 항목을 확인한 뒤 저장을 눌러주세요.
          </p>

          {/* 액션 바: 우측 정렬 (리셋 버튼) */}
          <div className="flex items-center ml-auto mb-4">
            <button
              type="button"
              onClick={() => setResetKey((v) => v + 1)}
              className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition"
            >
              폼 초기화
            </button>
          </div>

          {/* 폼 */}
          <div className="max-w-4xl w-full mx-auto">
            <DiagnosisForm key={resetKey} onSubmit={handleCreate} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DiagnosisAdminCreatePage;