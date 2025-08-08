// import { useEffect, useState } from "react";

// // AdminAssessmentDetailPanel: 진단 평가 상세 정보를 보여주고 일부 수정 가능한 폼 컴포넌트
// const AdminCoreCompetencyCategoryDetail = ({ assessment }) => {

//   // 폼 상태: 수정 가능한 로컬 form 상태로 관리
//   const [form, setForm] = useState(null);


//   /**
//     input/select 변경 시 해당 필드만 갱신하는 핸들러
//    */
//   const handleChange = (field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // form이 아직 준비되지 않았다면 렌더링하지 않음
//   if (!form) return null;

//   return (
//     <div className="mt-6 border p-8 rounded bg-white shadow">
//       <h2 className="text-xl font-bold mb-6 text-gray-800">상세 정보</h2>

//       {/* 필드들을 2열 그리드로 구성 */}
//       <div className="grid grid-cols-2 gap-6 text-sm">
        
//         {/* 진단번호 (PK, 읽기 전용) */}
//         <div>
//           <label className="block text-gray-600 font-medium mb-1 text-[16px]">분석번호</label>
//           <input type="text" value={assessment.assessmentNo} className="w-full border mt-1 px-3 py-2 rounded" readOnly />
//         </div>

//         {/* 진단명 */}
//         <div>
//           <label className="block text-gray-600 font-medium mb-1 text-[16px]">분석기준명</label>
//           <input
//             type="text"
//             value={form.assessmentName}
//             onChange={(e) => handleChange("assessmentName", e.target.value)}
//             className="w-full border mt-1 px-3 py-2 rounded"
//           />
//         </div>

//         {/* 등록일자 (수정 불가) */}
//         <div>
//           <label className="block text-gray-600 font-medium mb-1 text-[16px]">분석기준설명</label>
//           <input
//             type="date"
//             value={form.registerDate}
//             className="w-full border mt-1 px-3 py-2 rounded"
//             readOnly
//           />
//         </div>

//         {/* 진단 시작일 */}
//         <div>
//           <label className="block text-gray-600 font-medium mb-1 text-[16px]">핵심역량레벨구분</label>
//           <select
//             value={form.onlineYn}
//             onChange={(e) => handleChange("onlineYn", e.target.value)}
//             className="w-full border mt-1 px-3 py-2 rounded"
//           >
//             <option value="Y">핵심역량</option>
//             <option value="N">하위역량</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCoreCompetencyCategoryDetail;
