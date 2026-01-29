import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

import Profile from "./Profile";
import Account from "./Account";

export default function RightSidebar() {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <aside className="h-full p-4 flex flex-col gap-4 border-l border-border bg-card">
      {/* Profile */}
      <Profile />

      {/* Account */}
      <Account />

      {/* Logout */}
      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="justify-start gap-2 text-destructive w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
