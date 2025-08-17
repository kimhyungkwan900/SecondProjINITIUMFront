import { useState } from "react";
import { getUserEmailByLoginId, resetPassword, sendEmailCodeByLoginId, verifyEmailCode } from "../../../api/user/auth/findAccountApi";

export default function FindPasswordTab() {
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");     // 서버에서 조회한 실제 이메일(검증용)
  const [masked, setMasked] = useState("");   // 화면 노출용 마스킹 이메일
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 1) 로그인 ID로 이메일 조회 + 코드 전송
  const onSend = async () => {
    if (!loginId.trim()) return alert("로그인 ID를 입력해주세요.");
    setLoading(true);
    try {
      // 단일 엔드포인트 우선 시도(또는 폴백 포함)
      const info = await sendEmailCodeByLoginId(loginId.trim()); // { maskedEmail, (optional) email }
      setMasked(info?.maskedEmail || "");
      if (info?.email) setEmail(info.email); // 폴백 경로에선 email 포함

      // 일부 구현에서는 email을 주지 않으므로 sent 후 검증 시점에 따로 조회
      setSent(true);
      alert("인증코드를 전송했습니다.");
    } catch (e) {
      alert(e?.message || "인증코드 전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 2) 인증코드 검증 (email 필요 → 없으면 조회)
  const onVerify = async () => {
    if (!code.trim()) return alert("인증코드를 입력해주세요.");
    setLoading(true);
    try {
      let targetEmail = email;
      if (!targetEmail) {
        // 단일 엔드포인트 분기에서 email 미제공 시 조회
        const info = await getUserEmailByLoginId(loginId.trim());
        targetEmail = info?.email || "";
        setEmail(targetEmail);
      }

      if (!targetEmail) {
        alert("인증에 필요한 이메일 정보를 찾지 못했습니다.");
      } else {
        const ok = await verifyEmailCode({ email: targetEmail, authCode: code.trim() });
        if (ok) setVerified(true);
        else alert("인증코드가 올바르지 않습니다.");
      }
    } catch (e) {
      alert(e?.message || "인증코드 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 3) 임시 비밀번호 발급 (loginId 기준)
  const onReset = async () => {
    if (!loginId.trim()) return alert("로그인 ID가 필요합니다.");
    setLoading(true);
    try {
      const res = await resetPassword(loginId.trim()); // { message: "...메일로 발송..." }
      setResult(res?.message || "임시 비밀번호가 이메일로 발송되었습니다.");
    } catch (e) {
      alert(e?.message || "임시 비밀번호 발급에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="text-center font-bold my-8 text-[#354649] bg-[#E0E7E9] border border-[#A3C6C4] rounded-md px-4 py-3">
        {result}
      </div>
    );
  }

  return (
    <div className="border border-[#A3C6C4] rounded-md p-4 bg-[#E0E7E9] mb-2">
      {/* 로그인 ID 입력 */}
      <input
        className="w-full mb-2 px-3 py-2 rounded-md border border-[#A3C6C4] text-[#354649] placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-[#6C7A89] focus:border-[#6C7A89]
                   disabled:bg-gray-100 disabled:text-gray-500 disabled:opacity-70"
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        disabled={sent || verified}
        placeholder="학번/사번 입력"
      />

      {/* 전송 前 */}
      {!sent ? (
        <button
          className="w-full py-2 rounded-md bg-[#354649] text-white font-semibold
                     hover:bg-[#6C7A89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSend}
          disabled={loading || !loginId.trim()}
        >
          인증코드 전송
        </button>
      ) : !verified ? (
        <>
          {/* 전송된 이메일 안내(마스킹) */}
          <div className="mt-3 text-sm text-[#354649]">
            인증코드를 <span className="font-semibold">{masked || "등록된 이메일"}</span> 로 전송했습니다.
          </div>

          {/* 코드 입력 + 확인 */}
          <input
            className="w-full mt-2 px-3 py-2 rounded-md border border-[#A3C6C4] text-[#354649] placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[#6C7A89] focus:border-[#6C7A89]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증코드 입력"
          />
          <button
            className="w-full py-2 mt-2 rounded-md bg-[#354649] text-white font-semibold
                       hover:bg-[#6C7A89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onVerify}
            disabled={loading || !code.trim()}
          >
            인증코드 확인
          </button>
        </>
      ) : (
        <>
          <div className="mt-3 text-sm text-[#354649]">
            인증이 완료되었습니다. 아래 버튼을 눌러 임시 비밀번호를 발급받으세요.
          </div>
          <button
            className="w-full py-2 mt-4 rounded-md bg-[#354649] text-white font-semibold
                       hover:bg-[#6C7A89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onReset}
            disabled={loading || !loginId.trim()}
          >
            임시비밀번호 발급
          </button>
        </>
      )}
    </div>
  );
}