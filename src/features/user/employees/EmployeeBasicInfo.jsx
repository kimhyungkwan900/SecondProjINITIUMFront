import { CodeDisplay } from "../../../component/common/CodeConverter/CodeSelect";

const EmployeeBasicInfo = ({ employee }) => {
    if (!employee) return null;
    
    // 플레이스홀더 이미지 URL
    const placeholderImg = `/Logo/Logo.png`;

    return (
        <section className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#354649]">기본 정보</h3>
            
            <div className="flex items-center gap-10">
                {/* 왼쪽: 프로필 이미지 + 버튼 */}
                <div className="flex flex-col items-center flex-shrink-0">
                    <img
                        src={employee.imageUrl || placeholderImg}
                        alt="교직원 사진"
                        className="w-36 h-36 rounded-full object-cover border-4 border-[#A3C6C4] shadow-md"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = placeholderImg;
                        }}
                    />
                    <button className="py-2 px-4 rounded-md bg-[#354649] text-white font-semibold text-sm hover:bg-[#6C7A89] transition-colors disabled:opacity-50 mt-3">
                        사진등록
                    </button>
                </div>

                {/* 오른쪽: 정보 그리드 테이블 */}
                <div className="flex-1">
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                        {/* 정보 그리드 */}
                        <div className="grid grid-cols-4">
                            {/* 1행 */}
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">이름</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-white">{employee.name}</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">교번</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-white">{employee.empNo}</div>

                            {/* 2행 */}
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">소속</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-gray-50/50">
                                <CodeDisplay category="SCHOOL_SUBJECT" code={employee.subjectCode}/>
                            </div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">생년월일</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-gray-50/50">{employee.birthDate}</div>

                            {/* 3행 */}
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">상태</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-white">
                                <CodeDisplay category="EMPLOYEE_STATUS" code={employee.employeeStatusCode} />
                            </div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">성별</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-white">
                                <CodeDisplay category="GENDER" code={employee.genderCode} />
                            </div>

                            {/* 4행 */}
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">연락처</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-gray-50/50 col-span-3">{employee.tel || "-"}</div>

                            {/* 5행 */}
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">이메일</div>
                            <div className="px-4 py-2 border-b border-gray-300 text-center bg-white col-span-3">{employee.email}</div>

                            {/* 6행 */}
                            <div className="px-4 py-2 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">은행</div>
                            <div className="px-4 py-2 text-center bg-gray-50/50">{employee.bankName || "신한은행"}</div>
                            <div className="px-4 py-2 text-center bg-[#E0E7E9] text-[#354649] text-sm font-semibold">계좌번호</div>
                            <div className="px-4 py-2 text-center bg-gray-50/50">{employee.bankAccountNo || "111-444-5565"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmployeeBasicInfo;