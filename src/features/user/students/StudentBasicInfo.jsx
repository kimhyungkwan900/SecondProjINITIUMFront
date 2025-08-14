import { CodeDisplay } from "../../../component/common/CodeConverter/CodeSelect";
import EmployeeDisplay from "../../../component/common/CodeConverter/EmployeeDisplay";

const StudentBasicInfo = ({ student }) => {
    if (!student) return null;

    const expectedCreditsByGrade = {
        1: 36,
        2: 72,
        3: 108,
        4: 140,
    };

    const buttonStyle = "mt-3 px-4 py-2 bg-[#354649] text-white rounded-md text-sm hover:bg-[#6C7A89] transition-colors";
    
    // 플레이스홀더 이미지 URL
    const placeholderImg = `/Logo/Logo.png`;

    return (
        <div className="flex items-center gap-10">
            {/* 왼쪽: 프로필 이미지 + 버튼 */}
            <div className="flex flex-col items-center flex-shrink-0">
                <img
                    src={student.imageUrl || placeholderImg}
                    alt="학생사진"
                    className="w-36 h-36 rounded-full object-cover border-4 border-[#A3C6C4] shadow-md"
                    // 이미지 로드 실패 시 플레이스홀더로 대체
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
                    <div className="info-grid-th">성명</div>
                    <div className="info-grid-td">{student.name}</div>
                    <div className="info-grid-th">생년월일</div>
                    <div className="info-grid-td">{student.birthDate}</div>

                    <div className="info-grid-th">학과</div>
                    <div className="info-grid-td"><CodeDisplay category="SCHOOL_SUBJECT" code={student.subjectCode}/></div>
                    <div className="info-grid-th">학년</div>
                    <div className="info-grid-td">{student.grade}</div>

                    <div className="info-grid-th">학적상태</div>
                    <div className="info-grid-td">
                        <CodeDisplay category="STUDENT_STATUS" code={student.studentStatusCode} />
                    </div>
                    <div className="info-grid-th">성별</div>
                    <div className="info-grid-td">
                        <CodeDisplay category="GENDER" code={student.genderCode} />
                    </div>

                    <div className="info-grid-th">연락처</div>
                    <div className={`info-grid-td col-span-3`}>{student.phoneNumber || "01022221111" }</div>

                    <div className="info-grid-th">주소</div>
                    <div className={`info-grid-td col-span-3`}>{student.address || "충북 옥천군 옥천읍 대학길 15 충북도립대학교"}</div>

                    <div className="info-grid-th">메일주소</div>
                    <div className="info-grid-td">{student.email}</div>
                    <div className="info-grid-th">외국인</div>
                    <div className="info-grid-td">{student.isForeigner ? "예" : "아니오"}</div>

                    <div className="info-grid-th">평점</div>
                    <div className="info-grid-td">{student.gpa || "2.75"} / 4.5</div>
                    <div className="info-grid-th">이수학점</div>
                    <div className="info-grid-td">
                        {expectedCreditsByGrade[student.grade]
                            ? `${expectedCreditsByGrade[student.grade]}`
                            : "-"}
                    </div>

                    <div className="info-grid-th">입학년월일</div>
                    <div className="info-grid-td">{student.admissionDate}</div>
                    <div className="info-grid-th">지도교수</div>
                    <div className="info-grid-td">
                        <EmployeeDisplay empNo={student.empNo || "-"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentBasicInfo;
