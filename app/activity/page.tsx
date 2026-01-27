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

type NotificationType = "mention" | "task" | "comment" | "invite" | "deadline" | "system";

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
    avatar?: string;
    sender?: string;
}

const notifications: Notification[] = [
    {
        id: 1,
        type: "mention",
        title: "You were mentioned",
        message: "Sarah Chen mentioned you in Design System Update: \"@you can you review this?\"",
        time: "2 minutes ago",
        read: false,
        avatar: "https://i.pravatar.cc/150?img=1",
        sender: "Sarah Chen",
    },
    {
        id: 2,
        type: "task",
        title: "Task assigned to you",
        message: "Michael Ross assigned you to \"API Integration\" task in Backend project",
        time: "15 minutes ago",
        read: false,
        avatar: "https://i.pravatar.cc/150?img=3",
        sender: "Michael Ross",
    },
    {
        id: 3,
        type: "comment",
        title: "New comment on your task",
        message: "Emma Wilson commented on \"User Research Phase 2\": \"Great progress!\"",
        time: "1 hour ago",
        read: false,
        avatar: "https://i.pravatar.cc/150?img=5",
        sender: "Emma Wilson",
    },
    {
        id: 4,
        type: "deadline",
        title: "Deadline approaching",
        message: "\"Dashboard Redesign\" is due in 2 hours",
        time: "2 hours ago",
        read: true,
    },
    {
        id: 5,
        type: "invite",
        title: "Team invitation",
        message: "James Miller invited you to join the \"Mobile Team\" workspace",
        time: "3 hours ago",
        read: true,
        avatar: "https://i.pravatar.cc/150?img=8",
        sender: "James Miller",
    },
    {
        id: 6,
        type: "task",
        title: "Task completed",
        message: "Lisa Park marked \"Database Migration\" as complete",
        time: "5 hours ago",
        read: true,
        avatar: "https://i.pravatar.cc/150?img=10",
        sender: "Lisa Park",
    },
    {
        id: 7,
        type: "system",
        title: "System update",
        message: "New features available! Check out the updated dashboard and reporting tools.",
        time: "1 day ago",
        read: true,
    },
    {
        id: 8,
        type: "mention",
        title: "You were mentioned",
        message: "David Kim mentioned you in a comment: \"@you this might interest you\"",
        time: "2 days ago",
        read: true,
        avatar: "https://i.pravatar.cc/150?img=12",
        sender: "David Kim",
    },
];

const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
        case "mention":
            return AtSign;
        case "task":
            return CheckCircle2;
        case "comment":
            return MessageSquare;
        case "invite":
            return UserPlus;
        case "deadline":
            return Clock;
        case "system":
            return AlertCircle;
        default:
            return Bell;
    }
};

const getNotificationColor = (type: NotificationType) => {
    switch (type) {
        case "mention":
            return "text-blue-500 bg-blue-500/10";
        case "task":
            return "text-green-500 bg-green-500/10";
        case "comment":
            return "text-purple-500 bg-purple-500/10";
        case "invite":
            return "text-orange-500 bg-orange-500/10";
        case "deadline":
            return "text-red-500 bg-red-500/10";
        case "system":
            return "text-gray-500 bg-gray-500/10";
        default:
            return "text-primary bg-primary/10";
    }
};

export default function NotificationsPage() {
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <AppLayout>
            <div className="space-y-6 w-full">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
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
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 rounded-sm text-xs font-normal">
                                <CheckCheck className="w-3.5 h-3.5 mr-2" />
                                Mark all read
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 rounded-sm text-xs font-normal">
                                <Settings className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="h-9 bg-secondary/50 p-1 rounded-sm">
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
                        <TabsTrigger value="mentions" className="text-xs rounded-sm data-[state=active]:bg-background">
                            Mentions
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="text-xs rounded-sm data-[state=active]:bg-background">
                            Tasks
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <NotificationList notifications={notifications} />
                    </TabsContent>

                    <TabsContent value="unread" className="mt-6">
                        <NotificationList notifications={notifications.filter((n) => !n.read)} />
                    </TabsContent>

                    <TabsContent value="mentions" className="mt-6">
                        <NotificationList notifications={notifications.filter((n) => n.type === "mention")} />
                    </TabsContent>

                    <TabsContent value="tasks" className="mt-6">
                        <NotificationList notifications={notifications.filter((n) => n.type === "task")} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

function NotificationList({ notifications }: { notifications: Notification[] }) {
    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">No notifications</h3>
                <p className="text-sm text-muted-foreground">You're all caught up!</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);

                return (
                    <div
                        key={notification.id}
                        className={`group relative flex gap-4 p-4 rounded-lg border transition-all hover:bg-secondary/50 cursor-pointer ${notification.read ? "border-border bg-background" : "border-primary/20 bg-primary/5"
                            }`}
                    >
                        {/* Unread indicator */}
                        {!notification.read && (
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                        )}

                        {/* Icon or Avatar */}
                        <div className="shrink-0">
                            {notification.avatar ? (
                                <Avatar className="h-10 w-10 border border-border">
                                    <AvatarImage src={notification.avatar} />
                                    <AvatarFallback className="text-xs">{notification.sender?.[0]}</AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                    <p className={`text-sm font-medium ${notification.read ? "text-foreground" : "text-foreground"}`}>
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {notification.message}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {notification.time}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                </div>
                            </div>

                            {/* Type badge */}
                            <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline" className={`text-[10px] px-2 py-0.5 rounded-sm capitalize ${colorClass} border-0`}>
                                    <Icon className="w-3 h-3 mr-1" />
                                    {notification.type}
                                </Badge>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
