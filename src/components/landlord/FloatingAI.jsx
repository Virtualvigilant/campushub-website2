import { useState } from "react";
import { Cpu } from "lucide-react"; // AI / tech icon
import { Button } from "@/components/ui/button";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-50 right-6 bg-blue-600 p-4 rounded-full shadow-lg 
          hover:bg-blue-700 transform hover:scale-110 transition-all z-50`}
        title="AI Assistant"
      >
        <Cpu className="w-6 h-6 text-white" />
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-card shadow-xl transform transition-transform z-40
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="text-lg font-semibold">CampassHub AI</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-destructive"
          >
            ✕
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          <p className="text-sm text-gray-500">
            Ask anything about CompassHub, properties, or listings...
          </p>
          {/* AI messages will go here */}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border flex gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
