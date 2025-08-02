import React from "react";

export default function FindAccountLink() {
  return (
    <div className="w-full flex justify-end">
      <a
        href="/find-account"
        className="text-gray-400 text-sm mt-1 hover:underline"
      >
        아이디/비밀번호 찾기
      </a>
    </div>
  );
}
