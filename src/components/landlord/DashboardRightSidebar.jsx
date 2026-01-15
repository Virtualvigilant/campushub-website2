import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardRightSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="h-full p-4 flex flex-col justify-between border-l border-border bg-card">
      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold">{user?.username || "Unknown User"}</p>
          <p className="text-xs text-muted-foreground">{user?.status || "Free Plan"}</p>
        </div>
      </div>

      {/* Logout button */}
      <Button
        onClick={logout}
        variant="ghost"
        className="justify-start gap-2 text-destructive md:hidden"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>

      {/* On larger screens, the logout can also appear elsewhere */}
      <Button
        onClick={logout}
        variant="ghost"
        className="justify-start gap-2 text-destructive hidden md:flex mt-6"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </aside>
  );
}
