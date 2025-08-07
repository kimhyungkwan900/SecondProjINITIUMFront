import { useState } from "react";
import { programApply } from "../../../api/user/extracurricular/UserApplyApi";

const ApplyModal = ({programId, onClose}) => {
  const [checked, setChecked] = useState(false);

  const [content, setContent] = useState(""); // 신청 내용
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const logNo = "S000000001"; // 하드코딩

  const handleSubmit = async() => {
    if (!checked){
        alert("개인정보 활용에 동의해주세요.")
        return;
    }

     try {
      const result = await programApply(logNo, programId, content);
      alert("신청 완료 되었습니다."); 
      console.log(result)
      onClose();
        } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        width: 800,
        padding: 20,
        border: "1px solid black",
        borderRadius: 10,
        backgroundColor: "#f8f8f8",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 15 }}>
        신청서
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
          marginBottom: 15,
        }}
      >
        <tbody>
          <tr>
            <th
              style={{
                border: "1px solid #999",
                backgroundColor: "#aec3ed",
                padding: 8,
                width: "30%",
                textAlign: "center",
              }}
            >
              신청 목표
            </th>
            <td
              style={{
                border: "1px solid #999",
                padding: 8,
                textAlign: "left",
              }}
            >
               <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}  // 수정!
                className="w-full focus:outline-none p-1 bg-white border"
                />
            </td>
          </tr>
          <tr>
            <th
              style={{
                border: "1px solid #999",
                backgroundColor: "#aec3ed",
                padding: 8,
                textAlign: "center",
              }}
              rowSpan={4}
            >
              개인정보활용동의
            </th>
            <td
              style={{
                border: "1px solid #999",
                padding: 8,
                textAlign: "left",
                whiteSpace: "pre-line",
              }}
            >
              법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속,
              휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고있습니다.
              <br />
              <br />
              신청시 신청자의 모든 개인정보는 사업진행을 위하여 수집 및 이용될 수 있습니다.
              또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게
              관리될 예정입니다.
              <br />
              <br />
              수집된 개인정보는 5년 경과(대학 평가 관련 요청 기간) 후 즉시 파기 됩니다. 위와
              관련하여 보인의 개인 고유식별번호 수집, 이용에 관한 내용을 숙지하였고 이에
              동의한다면 해당란에 체크해 주십시오.
              <br />
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />{" "}
                개인정보 활용에 동의 합니다.
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        disabled={!checked}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "8px 16px",
          backgroundColor: checked ? "#90caf9" : "#ccc",
          border: "none",
          borderRadius: 4,
          cursor: checked ? "pointer" : "not-allowed",
          fontWeight: "bold",
          fontSize: 16,
          userSelect: "none",
        }}
      >
        작성 완료
      </button>
    </div>
  );
};

export default ApplyModal;