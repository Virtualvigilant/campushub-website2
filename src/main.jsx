// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LandlordProvider } from "@/contexts/LandlordContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LandlordProvider>
      <App />
      </LandlordProvider>
    </AuthProvider>
  </React.StrictMode>
);
