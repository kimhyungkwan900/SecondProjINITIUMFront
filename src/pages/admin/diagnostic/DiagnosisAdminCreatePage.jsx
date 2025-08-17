import { useState } from "react";
import { createAdminDiagnosticTest } from "../../../api/user/diagnostic/diagnosisAdminApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import DiagnosisForm from "../../../component/user/diagnostic/DiagnosisForm.jsx";

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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-4">
        {/* 헤더 (제공 컴포넌트 사용) */}
        <AdminSectionHeader title="진단평가 생성" />

        {/* 본문 카드 */}
        <section className="adm-card p-6">
          {/* 제목 */}
          <h2 className="text-lg font-semibold text-gray-700">새로운 검사 등록</h2>
          <div className="my-4 border-t border-gray-200" />

          {/* 안내문 */}
          <p className="text-gray-600 mb-4">
            아래 폼을 작성해 내부 진단검사를 등록하세요. 필수 항목을 확인한 뒤 저장을 눌러주세요.
          </p>

          {/* 액션 바: 우측 정렬 (리셋 버튼) */}
          <div className="flex items-center justify-end mb-4">
            <button
              type="button"
              onClick={() => setResetKey((v) => v + 1)}
              className="adm-btn adm-btn--secondary"
              aria-label="폼 초기화"
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
