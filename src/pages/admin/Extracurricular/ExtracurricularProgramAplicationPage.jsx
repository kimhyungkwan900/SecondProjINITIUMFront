import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth.jsx";
import AplicationButton from "../../../component/admin/extracurricular/aplication/AplicationButton";
import ApplicationInput from "../../../component/admin/extracurricular/aplication/AplicationInput";
import { aplicationProgram } from "../../../api/admin/extracurricular/program/ProgramApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader.jsx";

const ExtracurricularProgramAplicationPage = () => {
  const [programName, setProgramName] = useState("");
  const [programType, setProgramType] = useState("");
  const [programTarget, setProgramTarget] = useState("");
  const [genderLimit, setGenderLimit] = useState("ALL");
  const [category, setCategory] = useState(null);
  const [selectionType, setSelectionType] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [startApply, setStartApply] = useState("");
  const [endApply, setEndApply] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [detail, setDetail] = useState("");
  const [cndCn, setCndCn] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  const { user } = useAuth();
  const empNo = user?.empNo || "";

  const dayToEnum = (day) => {
    switch (day) {
      case "월요일": return "MONDAY";
      case "화요일": return "TUESDAY";
      case "수요일": return "WEDNESDAY";
      case "목요일": return "THURSDAY";
      case "금요일": return "FRIDAY";
      case "토요일": return "SATURDAY";
      case "일요일": return "SUNDAY";
      default: return null;
    }
  };

  const handleInsert = async () => {
    const formDTO = {
      eduNm: programName,
      eduType: programType,
      eduTrgtLmt: programTarget,
      eduGndrLmt: genderLimit,
      ctgryId: Number(category),
      eduSlctnType: selectionType,
      eduPtcpNope: participantCount,
      eduPrps: purpose,
      eduAplyBgngDt: startApply,
      eduAplyEndDt: endApply,
      eduBgngYmd: startDate,
      eduEndYmd: endDate,
      eduStartTime: startTime,
      eduEndTime: endTime,
      eduPlcNm: place,
      cndCn: cndCn,
      eduDtlCn: detail,
      eduDays: selectedDays.map(dayToEnum).filter(Boolean),
    };

    try {
      const result = await aplicationProgram(formDTO, empNo, imageFile);
      alert("저장 성공: " + result);
      // NOTE: 기능 변경 없이 유지 (성공 후 초기화는 아래 onDelete 사용)
      // handleDelete();
    } catch (error) {
      alert("저장 실패: " + error.message);
    }
  };

  const handleDelete = () => {
    setProgramName("");
    setProgramType("");
    setProgramTarget("");
    setGenderLimit("");
    setCategory("");
    setSelectionType("");
    setParticipantCount(0);
    setPurpose("");
    setStartApply("");
    setEndApply("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setPlace("");
    setDetail("");
    setImageFile(null);
    setSelectedDays([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">

      {/* 섹션 헤더 라인 */}
      <div className="py-4">
      <AdminSectionHeader title="프로그램 등록 신청" />
      </div>

      <section className="adm-card p-6 mt-4">
        {/* 폼 본문 */}
        <ApplicationInput
          programName={programName}
          setProgramName={setProgramName}
          programType={programType}
          setProgramType={setProgramType}
          programTarget={programTarget}
          setProgramTarget={setProgramTarget}
          genderLimit={genderLimit}
          setGenderLimit={setGenderLimit}
          category={category}
          setCategory={setCategory}
          selectionType={selectionType}
          setSelectionType={setSelectionType}
          participantCount={participantCount}
          setParticipantCount={setParticipantCount}
          purpose={purpose}
          setPurpose={setPurpose}
          startApply={startApply}
          setStartApply={setStartApply}
          endApply={endApply}
          setEndApply={setEndApply}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          place={place}
          setPlace={setPlace}
          cndCn={cndCn}
          setCndCn={setCndCn}
          detail={detail}
          setDetail={setDetail}
          imageFile={imageFile}
          setImageFile={setImageFile}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          empNo={empNo}
        />

        {/* 액션 바 */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="flex items-center justify-end">
            <AplicationButton onInsert={handleInsert} onDelete={handleDelete} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtracurricularProgramAplicationPage;
