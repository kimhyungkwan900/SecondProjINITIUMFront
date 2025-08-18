import { useEffect, useState } from "react";

const CoreCompetencyPrivacy = ({
  orgName = "INITIUM",
  centerName = "핵심역량센터",
  phone = "02-123-4567",
  retentionYears = 2,
  onChange, 
  size = "md", 
}) => {
  const [requiredConsent, setRequiredConsent] = useState(false);
  const [optionalConsent, setOptionalConsent] = useState(false);

  useEffect(() => {
    onChange?.({ required: requiredConsent, optional: optionalConsent });
  }, [requiredConsent, optionalConsent, onChange]);

  const sizes = {
    sm: { body: "text-sm leading-6", h3: "text-base" },
    md: { body: "text-base leading-7", h3: "text-xl" },
    lg: { body: "text-lg leading-8", h3: "text-2xl" },
    xl: { body: "text-xl leading-9", h3: "text-3xl" },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <section
      role="region"
      aria-labelledby="core-privacy-title"
      className={`space-y-4 ${s.body}`}
    >
      <h3 id="core-privacy-title" className={`font-semibold ${s.h3}`}>
        핵심역량진단 개인정보 수집·이용 동의
      </h3>

      <p>
        {orgName}는 핵심역량진단의 실시 및 결과 제공, 상담 연계, 비교과 프로그램 추천을 위하여
        개인정보를 수집·이용합니다.
      </p>

      <div>
        <strong>수집 항목</strong>
        <ul className="list-disc pl-5 mt-1">
          <li>필수: 성명, 학번, 학과/전공, 학년, 진단 응답·점수·결과, 응시 일시</li>
          <li>선택: 연락처, 비교과 참여 이력, 상담 이력</li>
        </ul>
      </div>

      <p>
        <strong>보유·이용 기간</strong>: 진단 종료 후 {retentionYears}년간 보관하며,
        관련 법령에 별도 보존 의무가 있는 경우 해당 기간까지 보관합니다.
      </p>

      <p>
        <strong>결과 제공</strong>: 내부 학생지원 부서에 결과 요약을 제공할 수 있습니다.
        (외부 제공 또는 처리위탁 발생 시 관련 법령에 따라 사전 고지합니다.)
      </p>

      <p>
        <strong>동의 거부권 및 불이익</strong>: 동의는 거부할 수 있으나, 필수 항목 미동의 시
        진단 서비스 이용이 제한될 수 있습니다.
      </p>

      <p>
        <strong>정보주체 권리</strong>: 열람·정정·삭제·동의 철회 등 권리는 [{centerName}/{phone}]로
        요청할 수 있습니다.
      </p>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={requiredConsent}
            onChange={(e) => setRequiredConsent(e.target.checked)}
            aria-required="true"
            required
          />
          <span>필수 항목 수집·이용에 동의합니다.</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={optionalConsent}
            onChange={(e) => setOptionalConsent(e.target.checked)}
          />
          <span>선택 항목 수집·이용에 동의합니다.</span>
        </label>
      </div>
    </section>
  );
};

export default CoreCompetencyPrivacy;
