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
    <div className="min-h-screen flex bg-white">
      <main className="flex-1 px-6">
        <AdminSectionHeader title="진단평가 생성" />

        {/* 본문 카드 컨테이너 (가이드: overflow-x-auto, rounded-lg, shadow-sm, bg-white) */}
        <div className="overflow-x-auto rounded-lg shadow-sm bg-white p-8 max-w-4xl w-full mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            새로운 검사 등록
          </h2>

          <DiagnosisForm key={resetKey} onSubmit={handleCreate} />
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminCreatePage;
