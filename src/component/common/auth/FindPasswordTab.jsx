import { useState } from "react";
import axios from "axios";

export default function FindPasswordTab() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 인증코드 발송
  const handleSendCode = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/send-email-code", { email });
      setSent(true);
      alert("인증코드가 전송되었습니다.");
    } catch {
      alert("이메일 전송에 실패했습니다.");
    }
    setLoading(false);
  };

  // 인증코드 검증
  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/verify-email-code", { email, authCode: code });
      if (res.data) {
        setVerified(true);
      } else {
        alert("인증코드가 올바르지 않습니다.");
      }
    } catch {
      alert("인증코드 확인 중 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  // 임시 비밀번호 발급
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/reset-password", { loginId });
      setResult(`임시 비밀번호: [${res.data.temporaryPassword}]`);
    } catch {
      alert("임시 비밀번호 발급에 실패했습니다.");
    }
    setLoading(false);
  };

  if (result) {
    return <div className="text-green-600 text-center font-bold my-8">{result}</div>;
  }

  return (
    <div className="border rounded p-4 bg-gray-50 mb-2">
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={sent || verified}
        placeholder="가입한 이메일"
      />
      {!sent ? (
        <button className="w-full py-2 bg-blue-500 text-white rounded" onClick={handleSendCode} disabled={loading || !email}>
          인증코드 전송
        </button>
      ) : !verified ? (
        <>
          <input
            className="border rounded px-2 py-1 w-full mt-2"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="인증코드 입력"
          />
          <button className="w-full py-2 mt-2 bg-green-500 text-white rounded" onClick={handleVerify} disabled={loading || !code}>
            인증코드 확인
          </button>
        </>
      ) : (
        <>
          <input
            className="border rounded px-2 py-1 w-full mt-3"
            type="text"
            value={loginId}
            onChange={e => setLoginId(e.target.value)}
            placeholder="로그인 ID 입력"
          />
          <button className="w-full py-2 mt-4 bg-indigo-500 text-white rounded" onClick={handleResetPassword} disabled={loading || !loginId}>
            임시비밀번호 발급
          </button>
        </>
      )}
    </div>
  );
}