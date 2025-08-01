import React from "react";

export default function LogoHeader() {
  return (
    <div className="mb-10 flex flex-col items-center">
      <img
        src="/logo.png"
        alt="대학 로고"
        className="w-28 mb-4"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-[#222E8D] mb-2">
        TeamINITIUM
      </h2>
      <span className="text-[#222E8D] text-lg font-bold mb-2">
        University
      </span>
      <div className="text-[#222E8D] text-xl font-bold mt-2 mb-6">
        종합정보시스템 로그인
      </div>
    </div>
  );
}