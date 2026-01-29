import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import Support from "./Support"; // your form component

export default function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-24 right-6
          w-16 h-16 rounded-full
          bg-primary hover:bg-primary/90
          shadow-lg flex items-center justify-center
          transition-all duration-300
          animate-bounce-slow
          z-50
        "
        title="Contact Support"
      >
        <MessageSquare className="w-8 h-8 text-white" />
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-card rounded-md shadow-lg w-full max-w-md relative p-6">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Support Form */}
            <Support />
          </div>
        </div>
      )}
    </>
  );
}
