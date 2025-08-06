const RequestDerail = ({ program }) => {
  if (!program) {
    return (
      <div className="mt-4 border rounded p-4 bg-white">
        <h2 className="text-xl font-bold mb-2">프로그램 상세 정보</h2>
        <p><strong>ID:</strong> -</p>
        <p><strong>프로그램 명:</strong> -</p>
        <p><strong>상태:</strong> -</p>
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded p-4 bg-gray-200">
      <h2 className="text-xl font-bold mb-2">프로그램 상세 정보</h2>
      <p><strong>ID:</strong> {program.eduMngId}</p>
      <p><strong>프로그램 명:</strong> {program.eduNm}</p>
      <p><strong>상태:</strong> {program.eduSttsNm}</p>

      <p><strong>교육 타입:</strong> {program.eduType}</p>
      <p><strong>목적:</strong> {program.eduPrps}</p>
      <p><strong>상세 내용:</strong> {program.eduDtlCn}</p>
      
      <p><strong>신청 시작일:</strong> {program.eduAplyBgngDt ? new Date(program.eduAplyBgngDt).toLocaleString() : "-"}</p>
      <p><strong>신청 종료일:</strong> {program.eduAplyEndDt ? new Date(program.eduAplyEndDt).toLocaleString() : "-"}</p>
      <p><strong>교육 시작일:</strong> {program.eduBgngYmd ? new Date(program.eduBgngYmd).toLocaleDateString() : "-"}</p>
      <p><strong>교육 종료일:</strong> {program.eduEndDt ? new Date(program.eduEndDt).toLocaleDateString() : "-"}</p>
      
      <p><strong>교육 장소:</strong> {program.eduPlcNm}</p>
      <p><strong>신청일:</strong> {program.eduAplyDt ? new Date(program.eduAplyDt).toLocaleString() : "-"}</p>
      
      <p><strong>요청자 이름:</strong> {program.name}</p>
      <p><strong>요청자 사번:</strong> {program.empNo}</p>
      <p><strong>소속 부서:</strong> {program.subjectName}</p>
      <p><strong>참여 인원 제한:</strong> {program.eduTrgtLmt}</p>
      <p><strong>성별 제한:</strong> {program.eduGndrLmt}</p>
      <p><strong>선발 유형:</strong> {program.eduSlctnType}</p>
      <p><strong>현재 참여 인원:</strong> {program.eduPtcpNope}</p>
    </div>
  );
};

export default RequestDerail;
