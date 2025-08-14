import { useState } from "react";
import ApplyModal from "./ApplyModal";

const HeaderContent = ({...program}) => {
  console.log(program);
  const baseUrl = "http://localhost:8080";
  const imageList = program.extracurricularImageDTO || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

   console.log(program.eduSlctnType);
  const applyStart = program.eduAplyBgngDt ? new Date(program.eduAplyBgngDt) : null;
  const applyEnd = program.eduAplyEndDt ? new Date(program.eduAplyEndDt) : null;
  const now = new Date();

  const isWithinApplyPeriod =
  applyStart && applyEnd && now >= applyStart && now <= applyEnd;

  const isFull =
  typeof program.accept === "number" &&
  typeof program.eduPtcpNope === "number" &&
  program.accept >= program.eduPtcpNope;

  const isButtonActive = isWithinApplyPeriod && !isFull;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg  p-6 flex gap-6">
      {/* 왼쪽 이미지 및 운영부서 영역 */}
      <div className="flex flex-col w-2/5 rounded overflow-hidden shadow-inner">
        <div className="h-50 overflow-hidden">
          {imageList.length > 0 ? (
            <img
              src={baseUrl + imageList[0].imgFilePathNm}
              alt="프로그램 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg font-semibold">
              이미지 없음
            </div>
          )}
        </div>

        {/* 운영 부서 정보 */}
        <div className="px-6 py-4 bg-white flex flex-col border-t border-gray-200 border mt-4 rounded">
          <p>
            <span className="text-gray-600">운영부서 :</span>{" "}
            <span className="font-semibold">{program.subjectName || "-"}</span>
          </p>
          <p>
            <span className="text-gray-600">분류 :</span>{" "}
            <span className="font-semibold">{program.ctgryNm || "-"}</span>
          </p>
          <p>
            <span className="text-gray-600">담당자 :</span>{" "}
            <span className="font-semibold">{program.name || "-"}</span>
          </p>
          <p>
            <span className="text-gray-600">Email :</span>{" "}
            <span className="font-semibold">{program.email || "-"}</span>
          </p>
        </div>
      </div>

      {/* 오른쪽 프로그램 정보 영역 */}
      <div className="flex-1 flex flex-col gap-4">
        {/* 프로그램 명, 유형, 마일리지 */}
    <div
        className="bg-gray-50 border border-gray-200 rounded p-4"
        style={{ flexShrink: 0, width: "500px" }}
        >
        <div className="flex items-center gap-2 mb-2">
            <span
            className={` px-3 font-semibold border ${
                program.eduType === "TEAM" ? "border-green-600 text-green-600" : "border-blue-500 text-blue-600"
            }`}
            >
            {program.eduType === "TEAM" ? "팀" : "개인"}
            </span>

            <span className="text-lime-600 border font-semibold px-2">
            {program.eduSlctnType === "FIRSTCOME" ? "선착순" : "선발식" }
           
            </span>
            <span className="bg-purple-500 text-white font-semibold px-2">
            Ⓜ {program.eduMlg || 0}점
            </span>
        </div>
        <h2
            className="text-xl font-bold overflow-hidden"
            style={{
            height: "72px",
            lineHeight: "24px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            }}
        >
            {program.eduNm || "프로그램 명"}
        </h2>
        </div>

        {/* 모집 대상 및 기타 안내 */}
        <div className="bg-white border border-gray-200 rounded p-4 text-sm space-y-1">
          <p className="font-bold">모집 대상 및 프로그램 정보</p>
          <p>신청 대상 : <span className="font-bold">
                {program.eduTrgtLmt === "STUDENT" ? "학생" : program.eduTrgtLmt === "ALL" ? "전체" : "교원"}
            </span> 
          </p>
          <p>제한 성별 : <span className="font-bold">{program.eduGndrLmt === "MALE" ? "남자" : program.eduGndrLmt === "FEMALE" ? "여자" : "제한없음"}</span>
          </p>
          <p>
            👪신청 현황: <span className="font-semibold">{program.accept || 0}</span> /{" "}
            <span className="font-semibold">{program.eduPtcpNope || 0}</span>명
          </p>
          <p>📅신청일 : <span className="font-bold">
                {program.eduAplyBgngDt?.replace("T", " ")} ~ {program.eduAplyEndDt?.replace("T", " ")}
          </span>
         </p>
         <p>
            수료 조건 : <span className="font-bold">출석 <span className="text-red-500">{program.cndCn}</span>이상</span>
         </p>
        </div>

        {/* 신청 버튼 */}
          <button
          onClick={openModal}
          disabled={!isButtonActive}
          className={`mt-auto font-semibold py-3 rounded transition ${
            isButtonActive
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          신청 버튼
        </button>
      </div>
       {/* 모달 노출 */}
     {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6"
          >
            <ApplyModal
              programName={program.eduNm}
              programId={program.eduMngId}
            />

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderContent;