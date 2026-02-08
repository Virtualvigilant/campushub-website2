// contexts/CookieConsentContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CookieConsentContext = createContext(null);

export const CookieConsentProvider = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(() => {
    return localStorage.getItem("cookie_consent") === "true";
  });

  const giveConsent = () => {
    localStorage.setItem("cookie_consent", "true");
    setConsentGiven(true);
  };

  return (
    <CookieConsentContext.Provider value={{ consentGiven, giveConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};
