import { Link } from 'react-router-dom';

export default function LogoHeader({
  logoSrc,
  schoolName,
  englishName,
  subtitle,
  logoLink = '/',
  variant = 'center',
  className = '',
  imgClassName = 'h-16',
}) {
  if (variant === 'inline') {
    return (
      <Link to={logoLink} className={`flex items-center no-underline text-current ${className}`}>
        <img src={logoSrc} alt="로고" className={`${imgClassName} mr-4`} />
        <div>
          <div className="font-bold text-xl text-[#222E8D]">{schoolName}</div>
          <div className="text-sm text-gray-500">{englishName}</div>
        </div>
      </Link>
    );
  }

  return (
    <div className={`text-center mb-8 ${className}`}>
      <Link to={logoLink} className="inline-block">
        <img src={logoSrc} alt="로고" className={`${imgClassName} mx-auto`} />
      </Link>
      <h1 className="text-3xl font-bold text-[#222E8D] mt-4">{schoolName}</h1>
      <p className="text-sm text-gray-500">{englishName}</p>
      {subtitle && <h2 className="text-xl text-gray-700 mt-6">{subtitle}</h2>}
    </div>
  );
}