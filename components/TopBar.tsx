"use client";

import { Bell, Search, ChevronDown, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import { MobileNav } from "@/components/MobileNav";

export function TopBar() {

    interface Task {
        id: number,
        topic: string,
        description: string,
        priority: string,
        assignby: string,
        assignee: string,
        companycode: string,
        taskcode: string,
        status: string,
        tags: string,
        duedate: string,
        seen: boolean,
        created_at: string

    }

    const [task, setTask] = useState<Task[]>([])

    const fetchTask = async () => {
        try {

            const res = await fetch("/api/getTasks")

            const data = await res.json()

            setTask(data.res)

            console.log("All Task Fetched", data.res)

        } catch (error) {
            console.log("Internal Server Error", error)
        }
    }

    useEffect(() => {
        fetchTask();
    }, [])

    const timeAgo = (dateString: string): string => {
        const past = new Date(dateString).getTime();
        const current = Date.now();

        const seconds = Math.floor((current - past) / 1000);

        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
        if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;

        return new Date(dateString).toLocaleDateString();
    };


    return (
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 bg-card/80 backdrop-blur-xl border-b border-border">
            {/* Left Section - Mobile Nav & Workspace Switcher */}
            <div className="flex items-center gap-2 md:gap-4">
                <MobileNav />

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
                            {task.filter(t => !t.seen).length > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive animate-in zoom-in">
                                    {task.filter(t => !t.seen).length}
                                </Badge>
                            )}
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0">
                        <DropdownMenuLabel className="p-4 flex items-center justify-between border-b bg-muted/40">
                            <span className="font-semibold">Notifications</span>
                            {task.filter(t => !t.seen).length > 0 && (
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary hover:text-primary/80">
                                    Mark all as read
                                </Button>
                            )}
                        </DropdownMenuLabel>
                        <div className="max-h-[22rem] overflow-y-auto">
                            {task.length === 0 ? (
                                <div className="p-8 text-center text-sm text-muted-foreground">
                                    No notifications
                                </div>
                            ) : (
                                task.slice(0, 3).map((i) => (
                                    <DropdownMenuItem key={i.id} className="flex gap-4 p-4 cursor-pointer focus:bg-muted/50 border-b last:border-0 border-border/50 items-start">
                                        <div className="relative shrink-0">
                                            <Avatar className="h-9 w-9 border">
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                                    {i.assignby?.substring(0, 2).toUpperCase() || "SY"}
                                                </AvatarFallback>
                                            </Avatar>
                                            {!i.seen && (
                                                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-background" />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <p className={`text-sm leading-none ${!i.seen ? 'font-semibold text-foreground' : 'font-medium text-foreground/80'}`}>
                                                    {i.topic}
                                                </p>
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                                                    {timeAgo(i.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                {i.description}
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            )}
                        </div>
                        <div className="p-2 border-t bg-muted/20 text-center">
                            <Button variant="ghost" size="sm" className="w-full text-xs h-8" asChild>
                                <a href="/notifications">View all notifications</a>
                            </Button>
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
