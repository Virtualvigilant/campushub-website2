import React from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "254113899517";
  const defaultMessage = encodeURIComponent(
    "Hello! I need support with CampassHub."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-10 right-6
        w-16 h-16 rounded-full
        bg-green-500 hover:bg-green-600
        shadow-lg flex items-center justify-center
        transition-all duration-300
        animate-bounce-slow
        z-50
      "
      title="Contact Support via WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
}
