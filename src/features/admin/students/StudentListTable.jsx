import { CodeDisplay } from "../../../component/common/CodeConverter/CodeSelect";

export default function StudentListTable({
  students = [],       // 기본값 지정
  loading = false,
  selectedNo = "",
  onRowClick,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {/* 헤더 */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="flex w-full">
          <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">학번</div>
          <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">이름</div>
          <div className="flex-grow-[9] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">학과</div>
          <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">학적상태</div>
          <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">성별</div>
          <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">생년월일</div>
          <div className="flex-grow-[10] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">이메일</div>
          <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium text-gray-700">입학일자</div>
        </div>
      </div>

      {/* 데이터 섹션 */}
      <div>
        {loading ? (
          <div className="text-gray-400 py-6 text-center border-b border-gray-200">로딩 중...</div>
        ) : students.length === 0 ? (
          <div className="text-gray-400 py-6 text-center border-b border-gray-200">데이터가 없습니다</div>
        ) : (
          students.map((s, idx) => {
            const isSelected = selectedNo === s.studentNo;
            return (
              <div
                key={s.studentNo || idx}
                className={[
                  "border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer",
                  isSelected ? "bg-blue-50 ring-1 ring-blue-300" : "",
                ].join(" ")}
                onClick={() => onRowClick?.(s.studentNo)}
              >
                <div className="flex w-full">
                  <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium border-r border-gray-200">
                    {s.studentNo}
                  </div>
                  <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm font-medium border-r border-gray-200">
                    {s.name}
                  </div>
                  <div className="flex-grow-[9] flex-shrink-0 basis-0 px-3 py-3 text-sm border-r border-gray-200">
                    <CodeDisplay category="schoolSubject" code={s.schoolSubjectCode} />
                  </div>
                  <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm border-r border-gray-200">
                    <CodeDisplay category="studentStatus" code={s.studentStatusCode} />
                  </div>
                  <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm border-r border-gray-200">
                    <CodeDisplay category="CO0001" code={s.genderCode} />
                  </div>
                  <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm border-r border-gray-200">
                    {s.birthDate}
                  </div>
                  <div className="flex-grow-[10] flex-shrink-0 basis-0 px-3 py-3 text-sm border-r border-gray-200">
                    {s.email}
                  </div>
                  <div className="flex-grow-[7] flex-shrink-0 basis-0 px-3 py-3 text-sm">
                    {s.admissionDate}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}