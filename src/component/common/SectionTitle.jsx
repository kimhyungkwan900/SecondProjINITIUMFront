// component/common/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({
  tag = 'h2',
  size = 22,
  children,
  className = '',
  borderColorClass = 'border-blue-600',
  showDivider = false,
  dividerClassName = 'my-2 border-gray-200',
}) => {
  const Tag = tag || 'h2';
  return (
    <>
      <Tag
        className={`font-semibold text-[#222E8D] leading-tight pl-3 border-l-4 ${borderColorClass} ${className}`}
        style={{ fontSize: size }}
      >
        {children}
      </Tag>
      {showDivider && <hr className={dividerClassName} />}
    </>
  );
};

export default SectionTitle;
