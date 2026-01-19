"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    UserCircle,
    MessageSquare,
    Activity,
    Settings,
    ChevronLeft,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Members", href: "/members", icon: UserCircle },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Activity", href: "/activity", icon: Activity },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        TaskFlow
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                "hover:bg-accent/80",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0")} />
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <Separator />

            {/* Bottom Section */}
            <div className="p-3 space-y-1">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                    )}
                >
                    <Settings className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>Settings</span>}
                </Link>

                {/* Collapse Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        "w-full justify-start gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <ChevronLeft
                        className={cn(
                            "w-5 h-5 shrink-0 transition-transform duration-200",
                            collapsed && "rotate-180"
                        )}
                    />
                    {!collapsed && <span>Collapse</span>}
                </Button>
            </div>
        </aside>
    );
}
