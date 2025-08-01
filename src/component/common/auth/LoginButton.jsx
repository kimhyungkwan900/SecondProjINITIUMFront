import React from "react";

export default function LoginButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full py-3 mt-4 rounded-xl bg-[#2862B2] text-white text-lg font-bold hover:bg-[#1c4173] transition"
    >
      {children}
    </button>
  );
}
