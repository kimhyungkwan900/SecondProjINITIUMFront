import { useState } from "react";
import { findLoginIdByEmail, sendEmailCode, verifyEmailCode } from "../../../api/user/auth/findAccountApi";

export default function FindIdTab() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (!email.trim()) return alert("이메일을 입력해주세요.");
    setLoading(true);
    try {
      await sendEmailCode(email.trim());
      setSent(true);
      alert("인증코드를 전송했습니다.");
    } catch (e) {
      // unwrap 에서 throw 된 에러 핸들링
      alert(e?.message || "이메일 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async () => {
    if (!code.trim()) return alert("인증코드를 입력해주세요.");
    setLoading(true);
    try {
      const ok = await verifyEmailCode({ email: email.trim(), authCode: code.trim() });
      if (ok) setVerified(true);
      else alert("인증코드가 올바르지 않습니다.");
    } catch (e) {
      alert(e?.message || "인증코드 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onFindId = async () => {
    setLoading(true);
    try {
      const data = await findLoginIdByEmail(email.trim()); // { loginId }
      setResult(`회원님의 아이디는 [${data?.loginId}] 입니다.`);
    } catch (e) {
      alert(e?.message || "아이디 조회에 실패했습니다.");
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
      <input
        className="w-full mb-2 px-3 py-2 rounded-md border border-[#A3C6C4] text-[#354649] placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-[#6C7A89] focus:border-[#6C7A89]
                   disabled:bg-gray-100 disabled:text-gray-500 disabled:opacity-70"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={sent || verified}
        placeholder="이메일 입력"
      />

      {!sent ? (
        <button
          className="w-full py-2 rounded-md bg-[#354649] text-white font-semibold
                     hover:bg-[#6C7A89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSend}
          disabled={loading || !email.trim()}
        >
          인증코드 전송
        </button>
      ) : !verified ? (
        <>
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
        <button
          className="w-full py-2 mt-4 rounded-md bg-[#354649] text-white font-semibold
                     hover:bg-[#6C7A89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onFindId}
          disabled={loading}
        >
          아이디 찾기
        </button>
      )}
    </div>
  );
}