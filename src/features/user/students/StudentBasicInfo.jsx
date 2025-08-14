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

    // --- 공통 스타일 변수 정의 ---
    // 모든 셀에 동일한 테두리를 적용하여 높이 문제를 해결하고, 색상을 진하게 변경
    const thStyle = "bg-[#E0E7E9] text-[#354649] text-left px-4 py-2 w-32 font-semibold border border-gray-300";
    const tdStyle = "px-4 py-2 text-[black] border border-gray-300";
    const buttonStyle = "mt-3 px-4 py-2 bg-[#354649] text-white rounded-md text-sm hover:bg-[#6C7A89] transition-colors";
    
    // 플레이스홀더 이미지 URL
    const placeholderImg = `/Logo/Logo.png`;

    return (
        <div className="flex items-start gap-10">
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

            {/* 오른쪽: 정보 테이블 */}
            <div className="flex-1">
                {/* 테이블에 border-collapse를 적용하여 셀 테두리를 한 줄로 만듭니다. */}
                <table className="w-full border-collapse text-sm">
                    <tbody>
                        <tr>
                            <th className={thStyle}>성명</th>
                            <td className={tdStyle}>{student.name}</td>
                            <th className={thStyle}>생년월일</th>
                            <td className={tdStyle}>{student.birthDate}</td>
                        </tr>
                        <tr>
                            <th className={thStyle}>학과</th>
                            <td className={tdStyle}><CodeDisplay category="SCHOOL_SUBJECT" code={student.subjectCode}/></td>
                            <th className={thStyle}>학년</th>
                            <td className={tdStyle}>{student.grade}</td>
                        </tr>
                        <tr>
                            <th className={thStyle}>학적상태</th>
                            <td className={tdStyle}>
                                <CodeDisplay category="STUDENT_STATUS" code={student.studentStatusCode} />
                            </td>
                            <th className={thStyle}>성별</th>
                            <td className={tdStyle}>
                                <CodeDisplay category="GENDER" code={student.genderCode} />
                            </td>
                        </tr>
                        <tr>
                            <th className={thStyle}>연락처</th>
                            <td className={tdStyle} colSpan={3}>{student.phoneNumber || "010-1234-5678"}</td>
                        </tr>
                        <tr>
                            <th className={thStyle}>주소</th>
                            <td className={tdStyle} colSpan={3}>{student.address || "충북 옥천군 옥천읍 대학길 15 충북도립대학교"}</td>
                        </tr>
                        <tr>
                            <th className={thStyle}>메일주소</th>
                            <td className={tdStyle}>{student.email}</td>
                            <th className={thStyle}>외국인</th>
                            <td className={tdStyle}>{student.isForeigner ? "예" : "아니오"}</td>
                        </tr>
                        <tr>
                            <th className={thStyle}>평점</th>
                            <td className={tdStyle}>{student.gpa || "2.75"} / 4.5</td>
                            <th className={thStyle}>이수학점</th>
                            <td className={tdStyle}>
                                {expectedCreditsByGrade[student.grade]
                                    ? `${expectedCreditsByGrade[student.grade]}`
                                    : "-"}
                            </td>
                        </tr>
                        <tr>
                            <th className={thStyle}>입학년월일</th>
                            <td className={tdStyle}>{student.admissionDate}</td>
                            <th className={thStyle}>지도교수</th>
                            <td className={tdStyle}>
                                <EmployeeDisplay empNo={student.empNo || "-"} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentBasicInfo;
