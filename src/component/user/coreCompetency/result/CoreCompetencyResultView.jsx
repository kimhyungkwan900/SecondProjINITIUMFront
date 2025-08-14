import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../mainpage/UserTopBar";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import StudentRadarChart from "../../../admin/coreCompetency/result/StudentRadarChart";
import StudentBarChart from "./StudentBarChart";
import ExtracurricularRecommand from "./ExtracurricularRecommand";
import CoreCompetecnyCategoryScore from "./CoreCompetecnyCategoryScore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SubCategoryDef from "./SubCategoryDef";

const CoreCompetencyResultView = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

   const pdfRef = useRef(null);

  const { studentNo, assessmentNo } = useParams();

  const name = user?.name ?? "";
  const isEmployee = !!user?.employeeNo;
  const canView = !!user && (studentNo || isEmployee);

   const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      // 1. html2canvas로 DOM을 이미지(canvas)로 변환
      const canvas = await html2canvas(element, {
        scale: 2, // 해상도를 높이기 위해 scale 값을 조정
        useCORS: true, // 외부 이미지가 있다면 필요
      });
      
      const imgData = canvas.toDataURL("image/png"); // 이미지를 데이터 URL로 변환

      // 2. jsPDF로 PDF 문서 생성
      const pdf = new jsPDF({
        orientation: 'portrait', // 'landscape' 또는 'portrait'
        unit: 'mm', // 단위
        format: 'a4' // 용지 포맷
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 이미지가 페이지 높이를 넘어갈 경우 처리 (선택적)
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 3. PDF 파일 저장
      pdf.save("student-result.pdf");

    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
    }
  };
  
  // 닫기 버튼 핸들러
  const handleClose = () => {
    // 브라우저 히스토리가 있으면 뒤로가기, 없으면 결과 목록으로 이동
    const hasHistory = window.history?.state && window.history.state.idx > 0;
    if (hasHistory) {
      navigate(-1);
    } else {
      // 프로젝트 라우트에 맞게 목록 경로 지정
      navigate("/competency/coreCompetency/result", { replace: true });
    }
  };

  if (!user) {
    return (
      <div className="max-w-[1000px] mt-10 p-6 border rounded-md text-center text-sm text-gray-700">
        <p className="mb-3">이 화면은 로그인한 사용자만 볼 수 있습니다.</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  if (!canView || !studentNo || !assessmentNo) {
    return (
      <div className="max-w-[1000px] p-6 border border-gray-200 rounded-md text-center text-sm text-gray-600">
        <p className="mb-2">접근 권한이 없거나 주소가 잘못되었습니다.</p>
        <p className="text-gray-500">학생번호와 평가 ID를 확인해 주세요.</p>
      </div>
    );
  }

  return (
    <div>
      <UserTopBar />
      <MainHeader />

      {/* 상단 배너 */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="w-[1200px] mx-auto px-6 py-8">
          <div className="flex justify-between items-end">
            <h1 className="ml-42 text-4xl font-semibold">핵심역량진단</h1>
            <div className="text-base text-gray-600 text-right">
              HOME &gt; 핵심역량진단 &gt; 진단결과 &gt; 결과보기
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="w-full h-full mx-auto px-6 py-12">
        {/* 상단 툴바 등 */}
            <div className="flex justify-end gap-2 mb-3 no-print">
              <button
                onClick={handleDownloadPdf}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded">
                PDF로 저장
              </button>
              <button
              onClick={handleClose}
              className="text-gray-700 hover:text-red-600 border border-gray-300 hover:border-red-400 px-4 py-2 rounded-md transition"
              type="button"
              aria-label="닫기"
            >
              닫기 ✕
            </button>
            </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-visible">
          <div ref={pdfRef}>
            <div className="p-8">
            {/* 제목 + 닫기 버튼 행 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[40px] font-semibold text-gray-800 ml-3 my-4">
                {name}님의 진단 결과
              </h2>
            </div>

            {/* 2열 레이아웃: 왼쪽 레이더 / 오른쪽 막대 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 왼쪽: 레이더 차트 */}
              <div className="rounded-lg border border-gray-100 p-4">
                <div className="relative h-[685px] mt-28">
                  <StudentRadarChart
                    assessmentNo={assessmentNo}
                    student={{ studentNo }}
                  />
                </div>
              </div>

              {/* 오른쪽: 막대 차트(가로형, 내용에 맞춰 자동 높이) */}
              <div className="rounded-lg border border-gray-100 p-4">
                <StudentBarChart
                  assessmentNo={assessmentNo}
                  student={{ studentNo }}
                  orientation="horizontal"
                  minHeight={620}
                />
              </div>
            </div>
             <div>
                <h2 className="text-[24px] font-semibold text-gray-800 ml-3 mt-5 mb-4 ">💡 핵심역량정의</h2>
                <SubCategoryDef/>
                <h2 className="text-[24px] font-semibold text-gray-800 ml-3 mt-5 mb-4 ">💡 역량별평가</h2>
                <CoreCompetecnyCategoryScore assessmentNo={assessmentNo} student={{ studentNo }}/>
              </div>
          </div>
          </div>
          <ExtracurricularRecommand assessmentNo={assessmentNo} student={{ studentNo }}/>
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencyResultView;
