// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LandlordProvider } from "@/contexts/LandlordContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext"; // ✅ import

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookieConsentProvider> {/* ✅ wrap everything in CookieConsentProvider */}
      <AuthProvider>
        <LandlordProvider>
          <App />
        </LandlordProvider>
      </AuthProvider>
    </CookieConsentProvider>
  </React.StrictMode>
);
