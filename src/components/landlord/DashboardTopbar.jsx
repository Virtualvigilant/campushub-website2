import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardTopbar({ onMenuClick }) {
    return (
        <header className="md:hidden flex items-center gap-3 p-4 border-b border-border">
            <Button size="icon" variant="ghost" onClick={onMenuClick}>
                <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold">Landlord Dashboard</h1>
        </header>
    );
}
