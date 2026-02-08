// components/CookieConsentModal.jsx
import React from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function CookieConsentModal() {
  const { consentGiven, giveConsent } = useCookieConsent();

  if (consentGiven) return null; // hide if consent already given

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md text-center shadow-lg">
        <h2 className="text-lg font-bold mb-2">We value your privacy</h2>
        <p className="mb-4">
          This site uses cookies and local storage to improve your experience. Please accept to continue.
        </p>
        <button
          onClick={giveConsent}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
