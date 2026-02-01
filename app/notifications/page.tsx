"use client";

import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    Bell,
    CheckCircle2,
    MessageSquare,
    UserPlus,
    AlertCircle,
    Clock,
    AtSign,
    CheckCheck,
    Trash2,
    Settings,
} from "lucide-react";
import { useEffect, useState } from "react";


interface Notification {
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

}

export default function NotificationsPage() {

    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(true)

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/getTasks")
            const data = await res.json();

            if (res.ok) {
                setNotifications(data.res)
            } else {
                console.log("data not fetched")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const markAsSeen = async (taskcode: string) => {
        try {
            const res = await fetch("/api/taskUpdate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskcode }),
            });

            if (res.ok) {
                // Optimistic update
                setNotifications((prev) =>
                    prev.map((n) =>
                        n.taskcode === taskcode ? { ...n, seen: true } : n
                    )
                );
            }
        } catch (error) {
            console.error("Failed to mark as seen:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [])

    const unreadCount = notifications.filter((n) => !n.seen).length;
    const unreadNotifications = notifications.filter((n) => !n.seen);

    const getPriorityColor = (p: string) => {
        if (!p) return 'bg-secondary text-secondary-foreground';
        switch (p.toLowerCase()) {
            case 'high': return 'bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/25';
            case 'medium': return 'bg-orange-500/15 text-orange-600 dark:text-orange-400 hover:bg-orange-500/25';
            case 'low': return 'bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/25';
            default: return 'bg-secondary text-secondary-foreground';
        }
    }

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'No due date';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    }

    const renderNotificationList = (list: Notification[]) => {
        if (list.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed border-muted-foreground/25">
                    <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-1">No notifications</h3>
                    <p className="text-sm text-muted-foreground">You're all caught up! No tasks pending.</p>
                </div>
            );
        }

        return (
            <div className="space-y-3">
                {list.map((notification) => (
                    <div
                        key={notification.id}
                        onClick={() => markAsSeen(notification.taskcode)}
                        className={`group relative flex flex-col sm:flex-row gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${notification.seen
                            ? "border-border bg-card hover:border-primary/20"
                            : "border-primary/30 bg-primary/5 shadow-sm"
                            }`}
                    >
                        {/* Unread indicator DOT */}
                        {!notification.seen && (
                            <span className="absolute right-3 top-3 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                        )}

                        {/* Avatar Section */}
                        <div className="hidden sm:block pt-0.5">
                            <Avatar className="h-9 w-9 border border-border shadow-sm">
                                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                                    {notification.assignby ? notification.assignby.substring(0, 2).toUpperCase() : 'NA'}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0 space-y-2">
                            {/* Header: Code + Tags + Icons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground shink-0">
                                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide">
                                        {notification.taskcode || "#TASK"}
                                    </span>
                                    {notification.tags && (
                                        <>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 line-clamp-1">
                                                {/* <Tag className="w-3 h-3" /> */}
                                                {notification.tags}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Main Title & status */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pr-6">
                                <div className="space-y-1">
                                    <h4 className={`text-sm font-semibold leading-snug tracking-tight ${!notification.seen ? "text-foreground" : "text-foreground/80"}`}>
                                        {notification.topic}
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                        {notification.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 shrink-0 mt-1 sm:mt-0">
                                    <Badge variant="outline" className={`${getPriorityColor(notification.priority)} border-transparent font-medium text-[10px] px-1.5 h-5`}>
                                        {notification.priority}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium border-transparent text-[10px] px-1.5 h-5">
                                        {notification.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Footer: Meta Info */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 mt-1 border-t border-border/50">
                                {/* Mobile Assigner */}
                                <div className="flex sm:hidden items-center gap-1.5 text-[10px] text-muted-foreground">
                                    <Avatar className="h-4 w-4">
                                        <AvatarFallback className="text-[8px]">
                                            {notification.assignby ? notification.assignby.substring(0, 2).toUpperCase() : 'NA'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>By <span className="font-medium text-foreground">{notification.assignby}</span></span>
                                </div>

                                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                    <span>Assigned by</span>
                                    <span className="font-medium text-foreground">{notification.assignby}</span>
                                </div>

                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground ml-auto sm:ml-0">
                                    <Clock className="w-3 h-3" />
                                    <span>Due {formatDate(notification.duedate)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-9rem)] w-full"> {/* Adjusted fixed height to fit within AppLayout padding */}
                {/* Header - Fixed */}
                <div className="shrink-0 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-primary relative">
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">All Notifications</h1>
                            <p className="text-muted-foreground text-sm">
                                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up!"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search notifications..."
                                className="pl-9 w-full sm:w-56 h-8 rounded-sm bg-background border-border focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs - Flex Container */}
                <Tabs defaultValue="all" className="flex flex-col flex-1 min-h-0 w-full">
                    <div className="shrink-0 pb-4"> {/* TabsList Fixed */}
                        <TabsList className="h-9 bg-secondary/50 p-1 rounded-sm w-full sm:w-auto justify-start">
                            <TabsTrigger value="all" className="text-xs rounded-sm data-[state=active]:bg-background">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-xs rounded-sm data-[state=active]:bg-background">
                                Unread
                                {unreadCount > 0 && (
                                    <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px] bg-red-500/10 text-red-500">
                                        {unreadCount}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Scrollable Content Area */}
                    <TabsContent value="all" className="flex-1 overflow-y-auto mt-0 pr-2">
                        {renderNotificationList(notifications)}
                    </TabsContent>
                    <TabsContent value="unread" className="flex-1 overflow-y-auto mt-0 pr-2">
                        {renderNotificationList(unreadNotifications)}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

function NotificationList({ notifications }: { notifications: Notification[] }) {
    // This component is no longer used, we are using renderNotificationList inside the main component
    return null;
}
