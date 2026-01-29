import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardRightSidebar from "./DashboardRightSidebar";
import DashboardTopbar from "./DashboardTopbar";
import FloatingSupport from "./FloatingSupport";
import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingAI from "./FloatingAI";

export default function DashboardLayout({ active, setActive, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:static z-50 h-full transform bg-card border-r border-border
        transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-64`}
            >
                
                <DashboardSidebar
                    active={active}
                    setActive={(key) => {
                        setActive(key);
                        setSidebarOpen(false);
                    }}
                />
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
            <FloatingSupport />

            {/* Right sidebar (desktop only) */}
            <div className="hidden lg:block w-72 border-l border-border bg-card">
                
                <DashboardRightSidebar />
                <FloatingWhatsApp />
                <FloatingAI/>
                
            </div>
        </div>
    );
}
