
import { Link } from 'react-router-dom';

export default function LogoHeader({ logoSrc, schoolName, englishName, subtitle, logoLink = '/' }) {
  return (
    <div className="text-center mb-8">
      <Link to={logoLink} className="inline-block">
        <img src={logoSrc} alt="로고" className="h-16 mx-auto" />
      </Link>
      <h1 className="text-3xl font-bold text-[#222E8D] mt-4">{schoolName}</h1>
      <p className="text-sm text-gray-500">{englishName}</p>
      {subtitle && <h2 className="text-xl text-gray-700 mt-6">{subtitle}</h2>}
    </div>
  );
}