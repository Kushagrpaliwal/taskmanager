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

    ChevronLeft,
    ChevronDown,
    Plus,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";

const workspaces = [
    { id: 1, name: "Acme Corp", color: "bg-primary" },
    { id: 2, name: "Startup Inc", color: "bg-primary" },
    { id: 3, name: "Personal", color: "bg-primary" },
];

export const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Members", href: "/members", icon: UserCircle },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Activity", href: "/activity", icon: Activity },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out font-sans",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Workspace Switcher */}
            <div className="p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full flex items-center gap-2 px-2 py-2 h-auto rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                                collapsed && "justify-center px-0"
                            )}
                        >
                            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-primary-foreground">A</span>
                            </div>
                            {!collapsed && (
                                <>
                                    <div className="flex flex-col items-start truncate overflow-hidden">
                                        <span className="text-sm font-semibold truncate">Acme Corp</span>
                                        <span className="text-xs text-muted-foreground truncate">Pro Plan</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
                                </>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 ml-2" side="right" sideOffset={10}>
                        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {workspaces.map((workspace) => (
                            <DropdownMenuItem key={workspace.id} className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-6 h-6 rounded-md ${workspace.color} flex items-center justify-center`}>
                                    <span className="text-xs font-bold text-primary-foreground">{workspace.name[0]}</span>
                                </div>
                                <span>{workspace.name}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-3 cursor-pointer text-primary">
                            <Plus className="w-4 h-4" />
                            <span>Create Workspace</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-[2px]">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-1.5 rounded-sm text-sm transition-colors",
                                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4 shrink-0 opacity-70")} />
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <Separator className="opacity-50" />

            {/* Bottom Section */}
            <div className="p-2 space-y-[2px]">
                <button
                    onClick={async () => {
                        await fetch("/api/auth/logout");
                        router.push("/")
                    }}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-1.5 rounded-sm text-sm transition-colors",
                        "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-left"
                    )}
                >
                    <LogOut className="w-4 h-4 shrink-0 opacity-70" />
                    {!collapsed && <span>Logout</span>}
                </button>

                {/* Collapse Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        "w-full justify-start gap-3 px-3 py-1.5 h-auto rounded-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-normal",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <ChevronLeft
                        className={cn(
                            "w-4 h-4 shrink-0 transition-transform duration-200 opacity-70",
                            collapsed && "rotate-180"
                        )}
                    />
                    {!collapsed && <span>Collapse</span>}
                </Button>
            </div>
        </aside>
    );
}
