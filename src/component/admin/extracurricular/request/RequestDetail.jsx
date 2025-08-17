const RequestDerail = ({ program }) => {
  const statusMap = {
    REQUESTED: "요청",
    APPROVED: "승인",
    REJECTED: "반려",
    IN_PROGRESS: "운영중",
    ENDED: "운영종료",
  };
  const eduTypeMap = { PERSONAL: "개인", TEAM: "팀" };

  const fmtDate = (v) => {
    if (!v) return "-";
    const d = new Date(v);
    return isNaN(d) ? "-" : d.toLocaleDateString();
  };
  const fmtDateTime = (v) => {
    if (!v) return "-";
    const d = new Date(v);
    return isNaN(d) ? "-" : d.toLocaleString();
  };

  // 공통 레이아웃 블록
  const Heading = () => (
    <div className="flex items-center mb-4">
      <span className="text-2xl text-[#354649] select-none">|</span>
      <h2 className="ml-2 text-xl font-semibold text-[#354649]">프로그램 상세 정보</h2>
    </div>
  );

  if (!program) {
    return (
      <section className="adm-card mt-4 p-6">
        <Heading />
        <hr className="border-gray-200 mb-4" />
        <div className="text-sm text-gray-500">선택된 프로그램이 없습니다.</div>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500">ID</dt>
            <dd className="text-gray-900 font-medium">-</dd>
          </div>
          <div>
            <dt className="text-gray-500">프로그램 명</dt>
            <dd className="text-gray-900 font-medium">-</dd>
          </div>
          <div>
            <dt className="text-gray-500">상태</dt>
            <dd className="text-gray-900 font-medium">-</dd>
          </div>
        </dl>
      </section>
    );
  }

  return (
    <section className="adm-card mt-4 p-6">
      <Heading />
      <hr className="border-gray-200 mb-4" />

      {/* 기본 정보 */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm">
        <div>
          <dt className="text-gray-500">ID</dt>
          <dd className="text-gray-900 font-medium">{program.eduMngId}</dd>
        </div>
        <div>
          <dt className="text-gray-500">상태</dt>
          <dd className="text-gray-900 font-medium">
            {statusMap[program.eduSttsNm] || program.eduSttsNm || "-"}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-gray-500">프로그램 명</dt>
          <dd className="text-gray-900 font-semibold break-words">
            {program.eduNm || "-"}
          </dd>
        </div>
      </dl>

      {/* 구분선 */}
      <div className="my-4 border-t border-gray-200" />

      {/* 운영 정보 */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm">
        <div>
          <dt className="text-gray-500">교육 타입</dt>
          <dd className="text-gray-900">{eduTypeMap[program.eduType] || program.eduType || "-"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">선발 유형</dt>
          <dd className="text-gray-900">{program.eduSlctnType || "-"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">신청 시작일</dt>
          <dd className="text-gray-900">{fmtDateTime(program.eduAplyBgngDt)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">신청 마감일</dt>
          <dd className="text-gray-900">{fmtDateTime(program.eduAplyEndDt)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">교육 시작일</dt>
          <dd className="text-gray-900">{fmtDate(program.eduBgngYmd)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">교육 종료일</dt>
          <dd className="text-gray-900">{fmtDate(program.eduEndDt)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">현재 참여 인원</dt>
          <dd className="text-gray-900">{program.eduPtcpNope ?? "-"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">참여 인원 제한</dt>
          <dd className="text-gray-900">{program.eduTrgtLmt ?? "-"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-gray-500">교육 장소</dt>
          <dd className="text-gray-900">{program.eduPlcNm || "-"}</dd>
        </div>
      </dl>

      {/* 구분선 */}
      <div className="my-4 border-t border-gray-200" />

      {/* 신청/요청자 정보 */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm">
        <div>
          <dt className="text-gray-500">신청일</dt>
          <dd className="text-gray-900">{fmtDateTime(program.eduAplyDt)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">요청자 사번</dt>
          <dd className="text-gray-900">{program.empNo || "-"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">요청자 이름</dt>
          <dd className="text-gray-900">{program.name || "-"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">소속 부서</dt>
          <dd className="text-gray-900">{program.subjectName || "-"}</dd>
        </div>
      </dl>

      {/* 구분선 */}
      <div className="my-4 border-t border-gray-200" />

      {/* 목적 / 상세 */}
      <dl className="grid grid-cols-1 gap-y-3 text-sm">
        <div>
          <dt className="text-gray-500">목적</dt>
          <dd className="text-gray-900 break-words">{program.eduPrps || "-"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">상세 내용</dt>
          <dd className="text-gray-900 whitespace-pre-wrap break-words">
            {program.eduDtlCn || "-"}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default RequestDerail;
