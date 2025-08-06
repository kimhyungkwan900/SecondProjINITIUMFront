import { useState } from "react";
import AplicationButton from "../../../component/admin/extracurricular/aplication/AplicationButton";
import ApplicationInput from "../../../component/admin/extracurricular/aplication/AplicationInput";
import { aplicationProgram } from "../../../api/admin/extracurricular/program/ProgramApi";

const ExtracurricularProgramAplicationPage = () => {
  const [programName, setProgramName] = useState("");
  const [programType, setProgramType] = useState("");
  const [programTarget, setProgramTarget] = useState("");
  const [genderLimit, setGenderLimit] = useState("");
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
  
  const empNo = "E000000001"; // 로그인한 관리자 


const dayToEnum = (day) => {
  switch (day) {
    case "월요일":
      return "MONDAY";
    case "화요일":
      return "TUESDAY";
    case "수요일":
      return "WEDNESDAY";
    case "목요일":
      return "THURSDAY";
    case "금요일":
      return "FRIDAY";
    case "토요일":
      return "SATURDAY";
    case "일요일":
      return "SUNDAY";
    default:
      return null;
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
    console.log(imageFile)
    const result = await aplicationProgram(formDTO, empNo, imageFile);
    alert("저장 성공: " + result);
  } catch (error) {
    alert("저장 실패: " + error.message);
  }
};
  const handleDelete = () => {
    // 초기화 함수 예시
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
    <div className="w-full p-4">
      <div className="sticky top-0 bg-white z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-cyan-700 w-1 text-cyan-700 select-none">1</span>
          <span className="ml-3">프로그램 등록 신청 페이지</span>
        </h1>
        <hr className="border" />

        {/* 상태 + 변경함수들을 ApplicationInput에 props로 전달 */}
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

        {/* 저장, 취소 버튼에 함수 전달 */}
        <AplicationButton onInsert={handleInsert} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ExtracurricularProgramAplicationPage;