import { CodeDisplay } from "../../../component/common/CodeConverter/CodeSelect";

const EmployeeBasicInfo = ({ employee }) => {
    if (!employee) return null;

    const buttonStyle = "mt-3 px-4 py-2 bg-[#354649] text-white rounded-md text-sm hover:bg-[#6C7A89] transition-colors";
    
    // 플레이스홀더 이미지 URL
    const placeholderImg = `/Logo/Logo.png`;

    return (
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
                <button className={buttonStyle}>
                    사진등록
                </button>
            </div>

            {/* 오른쪽: 정보 그리드 */}
            <div className="flex-1 text-sm">
                <div className="grid grid-cols-4 border-t border-gray-300">
                    <div className="info-grid-th">이름</div>
                    <div className="info-grid-td">{employee.name}</div>
                    <div className="info-grid-th">교번</div>
                    <div className="info-grid-td">{employee.empNo}</div>

                    <div className="info-grid-th">소속</div>
                    <div className="info-grid-td"><CodeDisplay category="DEPARTMENT" code={employee.deptCode}/></div>
                    <div className="info-grid-th">생년월일</div>
                    <div className="info-grid-td">{employee.birthDate}</div>

                    <div className="info-grid-th">상태</div>
                    <div className="info-grid-td">
                        <CodeDisplay category="EMPLOYEE_STATUS" code={employee.employeeStatusCode} />
                    </div>
                    <div className="info-grid-th">성별</div>
                    <div className="info-grid-td">
                        <CodeDisplay category="GENDER" code={employee.genderCode} />
                    </div>

                    <div className="info-grid-th">연락처</div>
                    <div className="info-grid-td col-span-3">{employee.phoneNumber || "-"}</div>

                    <div className="info-grid-th">이메일</div>
                    <div className="info-grid-td col-span-3">{employee.email}</div>

                    <div className="info-grid-th">은행</div>
                    <div className="info-grid-td"><CodeDisplay category="BANK" code={employee.bankCd} /></div>
                    <div className="info-grid-th">계좌번호</div>
                    <div className="info-grid-td">{employee.accountNumber}</div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeBasicInfo;