// src/component/admin/mileage/MileagePerfSearchBar.jsx
import React, { useState } from "react";

const MileagePerfSearchBar = ({ onSearch }) => {
  const [studentNo, setStudentNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      studentNo: studentNo.trim(),
      studentName: studentName.trim(),
      subjectName: subjectName.trim(),
    });
  };

  const handleReset = () => {
    setStudentNo("");
    setStudentName("");
    setSubjectName("");
    onSearch({
      studentNo: "",
      studentName: "",
      subjectName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="학번"
        value={studentNo}
        onChange={(e) => setStudentNo(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="이름"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="학과명"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        검색
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        초기화
      </button>
    </form>
  );
};

export default MileagePerfSearchBar;
