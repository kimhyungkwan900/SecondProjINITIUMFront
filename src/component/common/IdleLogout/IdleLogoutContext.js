import { createContext, useContext } from "react";

export const IdleLogoutContext = createContext({
  remainingMs: 0,
  resetTimer: () => {},
  timeoutMs: 0,
  expiresAt: 0,
});

export const useIdleLogout = () => useContext(IdleLogoutContext);
