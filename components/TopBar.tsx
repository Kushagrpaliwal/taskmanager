"use client";

import { Bell, Search, ChevronDown, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const workspaces = [
    { id: 1, name: "Acme Corp", color: "bg-blue-500" },
    { id: 2, name: "Startup Inc", color: "bg-purple-500" },
    { id: 3, name: "Personal", color: "bg-green-500" },
];

export function TopBar() {
    return (
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-card/80 backdrop-blur-xl border-b border-border">
            {/* Left Section - Workspace Switcher */}
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-3 py-2 h-auto rounded-xl hover:bg-accent"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">A</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-semibold">Acme Corp</span>
                                <span className="text-xs text-muted-foreground">Pro Plan</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {workspaces.map((workspace) => (
                            <DropdownMenuItem key={workspace.id} className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-6 h-6 rounded-md ${workspace.color} flex items-center justify-center`}>
                                    <span className="text-xs font-bold text-white">{workspace.name[0]}</span>
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

            {/* Center Section - Search */}
            <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tasks, teams, or members..."
                        className="pl-10 h-10 rounded-xl bg-accent/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-card"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <Button variant="ghost" size="icon" className="rounded-xl">
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative rounded-xl">
                            <Bell className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive">
                                3
                            </Badge>
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            Notifications
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                                Mark all as read
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-80 overflow-y-auto">
                            {[1, 2, 3].map((i) => (
                                <DropdownMenuItem key={i} className="flex items-start gap-3 p-3 cursor-pointer">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium">John Doe</span> assigned you to{" "}
                                            <span className="text-primary">Design System Update</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2 py-1.5 h-auto rounded-xl">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm font-medium">
                                    KP
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-sm font-medium">Kushagr</span>
                                <span className="text-xs text-muted-foreground">Admin</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
