// src/features/user/diagnostic/ExternalTestListFeature.jsx
import React from 'react';
import ExternalTestList from '../../../component/user/diagnostic/ExternalTestList.jsx';
import { useNavigate } from 'react-router-dom';

const ExternalTestListFeature = ({ studentNo }) => {
  const navigate = useNavigate();

  const handleSelectTest = (test) => {
    navigate(`/external-diagnosis/conduct/${test.id}`, {
      state: {
        questionApiCode: test.questionApiCode,
        targetCode: test.targetCode,
        name: test.name,
        studentNo
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-start py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#222E8D] mb-6 text-center">
          진단검사 목록
        </h1>
        <div className="space-y-4">
          <ExternalTestList onSelectTest={handleSelectTest} />
        </div>
      </div>
    </div>
  );
};

export default ExternalTestListFeature;
