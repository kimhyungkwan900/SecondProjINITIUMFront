import { getCategoryInEmpNo } from "../../../../api/admin/extracurricular/category/CategoryApi";
import { useEffect, useState } from "react";
const ApplicationInput = ({
    programName,
  setProgramName,
  programType,
  setProgramType,
  programTarget,
  setProgramTarget,
  genderLimit,
  setGenderLimit,
  category,
  setCategory,
  selectionType,
  setSelectionType,
  participantCount,
  setParticipantCount,
  purpose,
  setPurpose,
  startApply,
  setStartApply,
  endApply,
  setEndApply,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  place,
  setPlace,
  cndCn,
  setCndCn,
  detail,
  setDetail,
  setImageFile,
  selectedDays,
  setSelectedDays,
  empNo,
}) => {
  const days = ["월요일", "화요일", "수요일", "목요일", "금요일"];
  console.log("empNo:", empNo);
const toggleDay = (day) => {
  if (selectedDays.includes(day)) {
    setSelectedDays([]);
  } else {
    setSelectedDays([day]);
  }
};

  const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryInEmpNo(empNo);
        setCategoryList(data);
      } catch (error) {
        console.error("카테고리 로딩 실패", error);
      }
    };

    if (empNo) {
      fetchCategories();
    }
  }, [empNo]);



  const isDateInvalid = startApply && endApply && startApply > endApply;
  return (
    <div className="p-6 bg-gray-200 space-y-4 rounded max-w-4xl mx-auto">
      {/* 프로그램 이름 */}
      <div>
        <label className="font-semibold flex flex-col">프로그램 이름</label>
        <input
          type="text"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          className="border rounded px-3 py-1 w-full focus:outline-none"
        />
      </div>

      {/* 기본 정보 */}
      <div className="flex justify-between flex-wrap gap-3">
        {/* 프로그램 유형 */}
        <div>
          <label className="font-semibold flex flex-col">프로그램 유형</label>
          <select
            value={programType}
            onChange={(e) => setProgramType(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none w-40"
          >
            <option value="">선택</option>
            <option value="PERSONAL">개인</option>
            <option value="TEAM">팀</option>
          </select>
        </div>

        {/* 신청 대상 */}
        <div>
          <label className="font-semibold flex flex-col">신청 대상</label>
          <select
            value={programTarget}
            onChange={(e) => setProgramTarget(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none w-40"
          >
            <option value="">선택</option>
            <option value="STUDENT">학생</option>
            <option value="FACULTY">교원</option>
            <option value="ALL">전체</option>
          </select>
        </div>

        {/* 성별 제한 */}
        <div>
          <label className="font-semibold flex flex-col">성별 제한</label>
          <select
            value={genderLimit}
            onChange={(e) => setGenderLimit(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none w-40"
          >
            <option value="ALL">제한 없음</option>
            <option value="MALE">남자</option>
            <option value="FEMALE">여자</option>
          </select>
        </div>
        </div>

        <div className="flex justify-between">
        {/* 분류 */}
      <div>
        <label className="font-semibold flex flex-col">분류</label>
            <select
          value={category ?? ""}
          onChange={(e) => setCategory(e.target.value ? parseInt(e.target.value) : "")}
          className="border rounded px-3 py-1 focus:outline-none w-40"
        >
          <option value="">선택</option>
          {categoryList.map((item) => (
           
            <option key={item.ctgryId} value={item.ctgryId}>
              {item.ctgryNm}
            </option>
          ))}
        </select>
        </div>

        {/* 선발 방식 */}
        <div>
          <label className="font-semibold flex flex-col">선발 방식</label>
          <select
            value={selectionType}
            onChange={(e) => setSelectionType(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none w-40"
            >
            <option value="">선택</option>
            <option value="FIRSTCOME">선착순</option>
            <option value="SELECTION">선발식</option>
          </select>
        </div>

        {/* 모집 인원 */}
        <div>
          <label className="font-semibold flex flex-col">모집 인원</label>
          <input
            type="number"
            value={participantCount}
            onChange={(e) => setParticipantCount(Number(e.target.value))}
            className="border rounded px-3 py-1 w-40 focus:outline-none"
            />
        </div>
        </div>

      {/* 프로그램 목적 */}
      <div>
        <label className="font-semibold flex flex-col">프로그램 목적</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="border rounded px-3 py-1 w-full focus:outline-none"
        />
      </div>

      {/* 신청 기간 */}
      <div className="flex gap-6">
        <div>
          <label className="font-semibold">신청 시작일</label>
          <input
            type="datetime-local"
            value={startApply}
            onChange={(e) => setStartApply(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="font-semibold">신청 마감일</label>
          <input
            type="datetime-local"
            value={endApply}
            onChange={(e) => setEndApply(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
          />
        </div>
      </div>
      {isDateInvalid && (
        <p className="text-red-600 text-sm ml-2">※ 신청 마감일은 시작일보다 이후여야 합니다.</p>
      )}

      {/* 교육 기간 */}
      <div className="flex gap-6">
        <div>
          <label className="font-semibold">교육 시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="font-semibold">교육 종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
          />
        </div>
      </div>

      {/* 요일 선택 */}
      <div>
        <label className="font-semibold block mb-1">운영 요일</label>
        <div className="flex gap-2 flex-wrap">
          {days.map((day) => (
           <button
                type="button"
                key={day}
                className={`px-4 py-1 rounded-full border ${
                selectedDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => toggleDay(day)}
            >
                {day}
            </button>
          ))}
        </div>
      </div>

      {/* 시작/종료 시간 */}
      <div className="flex gap-6">
        <div>
          <label className="font-semibold">시작 시간</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="font-semibold">종료 시간</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
          />
        </div>

         <div>
          <label className="font-semibold ">수료 조건</label>
          <select
            value={cndCn}
            onChange={(e) => setCndCn(e.target.value)}
            className="border rounded px-3 py-1 ml-2 focus:outline-none"
            >
            <option value="">선택</option>
            <option value="100%">출석100%이상</option>
            <option value="90%">출석90%이상</option>
            <option value="80%">출석80%이상</option>
            <option value="70%">출석70%이상</option>
            <option value="60%">출석60%이상</option>
            <option value="50%">출석50%이상</option>
            <option value="40%">출석40%이상</option>
            <option value="30%">출석30%이상</option>
            <option value="20%">출석20%이상</option>
            <option value="10%">출석10%이상</option>
          </select>
        </div>
      </div>

      {/* 교육 장소 */}
      <div>
        <label className="font-semibold flex flex-col">교육 장소</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border rounded px-3 py-1 w-full focus:outline-none"
        />
      </div>

      {/* 프로그램 상세 내용 */}
      <div>
        <label className="font-semibold block mb-1">프로그램 상세 내용</label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="border rounded px-3 py-2 w-full resize-none focus:outline-none"
          rows={4}
        />
      </div>

      {/* 프로그램 이미지 등록 */}
      <div>
        <label className="font-semibold block mb-1">프로그램 이미지</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
};

export default ApplicationInput;
