
export default function LogoHeader({
  logoSrc = "/logo.png",
  schoolName = "TeamINITIUM",
  englishName = "University",
  subtitle = "학생역량통합관리 시스템 로그인"
}) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <img
        src={logoSrc}
        alt={schoolName + " 로고"}
        className="w-28 mb-4"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-[#222E8D] mb-2">
        {schoolName}
      </h2>
      <span className="text-[#222E8D] text-lg font-bold mb-2">
        {englishName}
      </span>
      <div className="text-[#222E8D] text-xl font-bold mt-2 mb-6">
        {subtitle}
      </div>
    </div>
  );
}