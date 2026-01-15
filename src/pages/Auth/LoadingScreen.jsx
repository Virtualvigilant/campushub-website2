import { Loader2 } from "lucide-react";

export default function LoadingScreen({
  title = "Loading CampusHub",
  subtitle = "Please wait a moment…",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Spinner */}
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

        {/* Text */}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
