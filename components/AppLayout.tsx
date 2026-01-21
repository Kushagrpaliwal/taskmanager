import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <div className="hidden md:flex h-full">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
