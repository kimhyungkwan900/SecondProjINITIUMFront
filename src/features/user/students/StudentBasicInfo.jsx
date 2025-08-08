import CodeDisplay from "../../../component/common/CodeDisplay";
import EmployeeDisplay from "../../../component/common/EmployeeDisplay";

const StudentBasicInfo = ({ student }) => {
    if (!student) return null;

    const expectedCreditsByGrade = {
        1: 36,
        2: 72,
        3: 108,
        4: 140,
    };

    return (
        <div className="flex items-start gap-8 mb-10">
            {/* 왼쪽: 프로필 이미지 + 버튼 */}
            <div className="flex flex-col items-center">
                <img
                    src={student.imageUrl || "/images/default-profile.png"}
                    alt="학생사진"
                    className="w-32 h-32 rounded object-cover border"
                />
                <button className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded text-sm border border-blue-200 hover:bg-blue-200">
                    사진등록
                </button>
            </div>
            {/* 오른쪽: 정보 테이블 */}
            <table className="min-w-[600px] text-sm border">
                <tbody>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 w-28 border">성명</th>
                        <td className="px-3 py-2 border">{student.name}</td>
                        <th className="bg-gray-100 text-left px-3 py-2 w-28 border">생년월일</th>
                        <td className="px-3 py-2 border">{student.birthDate}</td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">학과</th>
                        <td className="px-3 py-2 border">{student.schoolSubjectName || student.schoolSubjectCode}</td>
                        <th className="bg-gray-100 text-left px-3 py-2 border">학년</th>
                        <td className="px-3 py-2 border">{student.grade}</td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">학적상태</th>
                        <td className="px-3 py-2 border">
                            <CodeDisplay category="studentStatus" code={student.studentStatusCode} />
                        </td>
                        <th className="bg-gray-100 text-left px-3 py-2 border">성별</th>
                        <td className="px-3 py-2 border">
                            <CodeDisplay category="CO0001" code={student.genderCode} />
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">전화번호</th>
                        <td className="px-3 py-2 border">{student.phoneNumber || "01022221111"}</td>
                        <th className="bg-gray-100 text-left px-3 py-2 border">휴대폰번호</th>
                        <td className="px-3 py-2 border">{student.phoneNumber || "01011112222"}</td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">주소</th>
                        <td className="px-3 py-2 border" colSpan={3}>{student.address || "충북 옥천군 옥천읍 대학길 15 충북도립대학교"}</td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">메일주소</th>
                        <td className="px-3 py-2 border">{student.email}</td>
                        <th className="bg-gray-100 text-left px-3 py-2 border">외국인여부</th>
                        <td className="px-3 py-2 border">{student.isForeigner ? "예" : "아니오"}</td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">평점</th>
                        <td className="px-3 py-2 border">{student.gpa || "2.75"}</td>
                        <th className="bg-gray-100 text-left px-3 py-2 border">이수학점</th>
                        <td className="px-3 py-2 border">
                            {expectedCreditsByGrade[student.grade]
                                ? `${expectedCreditsByGrade[student.grade]}`
                                : "-"}
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 text-left px-3 py-2 border">입학년월일</th>
                        <td className="px-3 py-2 border">{student.admissionDate}</td>
                        <th className="bg-gray-100 text-left px-3 py-2 border">지도교수명</th>
                        <td className="px-3 py-2 border">
                            <EmployeeDisplay empNo={student.advisorId || "-"} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StudentBasicInfo;
