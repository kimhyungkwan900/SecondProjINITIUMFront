import { Link } from "react-router-dom";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";

const DiagnosisAdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-4">
        {/* 헤더 */}
        <AdminSectionHeader title="진단평가 대시보드" />

        {/* 본문 카드 */}
        <section className="adm-card p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">
            진단검사 관리자 기능 안내
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-center">
            학생들에게 제공되는 진단검사를 효율적으로 등록하고 관리할 수 있습니다. 아래는 제공되는 주요 기능들입니다.
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>📝 진단검사 등록:</strong> 새 심리검사를 등록할 수 있습니다.</li>
            <li><strong>📋 진단검사 목록 확인:</strong> 등록된 모든 진단검사들을 조회/삭제할 수 있습니다.</li>
            <li><strong>📊 결과 통계 확인:</strong> 검사 결과 기반 통계를 시각화하여 확인할 수 있습니다.</li>
            <li><strong>📥 결과 PDF 출력:</strong> 학생 개별 결과를 PDF로 저장 및 출력할 수 있습니다.</li>
            <li><strong>🔍 검색 및 필터링:</strong> 검사명 등을 기준으로 빠르게 검색할 수 있습니다.</li>
          </ul>

          {/* 버튼 영역 */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
            <Link
              to="/admin/diagnosis/create"
              className="adm-btn adm-btn--secondary min-w-[150px] text-center"
            >
              새 검사 등록
            </Link>
            <Link
              to="/admin/diagnosis/list"
              className="adm-btn adm-btn--primary min-w-[150px] text-center"
            >
              검사 목록
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            좌측 사이드바에서 원하는 기능을 선택하여 진단검사 관리 업무를 시작하세요.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DiagnosisAdminDashboardPage;
