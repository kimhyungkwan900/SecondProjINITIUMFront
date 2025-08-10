import React from 'react';

const MileageSummary = ({ totalScore }) => {
  return (
    <div className="text-2xl font-bold mb-4">
      총 마일리지: {totalScore}점
    </div>
  );
};

export default MileageSummary;
