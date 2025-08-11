
import React from 'react';

const AdminQuestionOption = ({ options, onOptionChange }) => {

  // options 데이터가 없으면 아무것도 렌더링하지 않음
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pt-4 border-t">
      <span className="text-xl text-black font-bold">▐ 답변 선택지</span>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-1 text-center font-medium text-gray-600">{index + 1}.</span>
            <div className="col-span-8">
              <label className="sr-only">Label</label>
              <input
                type="text"
                placeholder={`선택지 ${index + 1} 내용`}
                value={option.label}
                // 변경이 생기면 onOptionChange 함수를 호출하여 부모에게 알림
                onChange={(e) => onOptionChange(index, 'label', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-3">
              <label className="sr-only">Score</label>
              <input
                type="number"
                placeholder="점수"
                value={option.score}
                // 변경이 생기면 onOptionChange 함수를 호출하여 부모에게 알림
                onChange={(e) => onOptionChange(index, 'score', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuestionOption;