"use client";

import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Calendar,
    CheckCircle2,
    MessageSquare,
    UserPlus,
    FileText,
    ArrowRight,
    Activity,
} from "lucide-react";

const activities = [
    {
        id: 1,
        user: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        action: "completed",
        target: "Design System Update",
        description: "Marked task as complete in Design Team project",
        time: "2 minutes ago",
        date: "Today",
        icon: CheckCircle2,
    },
    {
        id: 2,
        user: "Michael Ross",
        avatar: "https://i.pravatar.cc/150?img=3",
        action: "commented on",
        target: "API Integration",
        description: "Left a review comment on the implementation approach",
        time: "15 minutes ago",
        date: "Today",
        icon: MessageSquare,
    },
    {
        id: 3,
        user: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?img=5",
        action: "created",
        target: "User Research Phase 2",
        description: "Created new task in Product project",
        time: "1 hour ago",
        date: "Today",
        icon: FileText,
    },
    {
        id: 4,
        user: "James Miller",
        avatar: "https://i.pravatar.cc/150?img=8",
        action: "assigned",
        target: "Lisa Park",
        description: "Assigned to Mobile App Testing task",
        time: "2 hours ago",
        date: "Today",
        icon: UserPlus,
    },
    {
        id: 5,
        user: "Lisa Park",
        avatar: "https://i.pravatar.cc/150?img=10",
        action: "moved",
        target: "Dashboard Redesign",
        description: "Moved from To Do to In Progress",
        time: "3 hours ago",
        date: "Today",
        icon: ArrowRight,
    },
    {
        id: 6,
        user: "David Kim",
        avatar: "https://i.pravatar.cc/150?img=12",
        action: "completed",
        target: "Database Migration",
        description: "Successfully migrated to new database schema",
        time: "5 hours ago",
        date: "Today",
        icon: CheckCircle2,
    },
];

export default function ActivityPage() {
    // Group activities by date
    const groupedActivities = activities.reduce((acc, activity) => {
        if (!acc[activity.date]) {
            acc[activity.date] = [];
        }
        acc[activity.date].push(activity);
        return acc;
    }, {} as Record<string, typeof activities>);

    return (
        <AppLayout>
            <div className="space-y-6 w-full">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-primary">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Activity</h1>
                            <p className="text-muted-foreground text-sm">Workspace timeline</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 w-full sm:w-48 h-8 rounded-sm bg-background border-border focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-sm text-xs font-normal justify-center">
                            <Calendar className="w-3.5 h-3.5 mr-2" />
                            Last 7 days
                        </Button>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-8">
                    {Object.entries(groupedActivities).map(([date, dateActivities]) => (
                        <div key={date} className="relative">
                            <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 py-2 mb-4 border-b border-border/50">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{date}</h3>
                            </div>

                            <div className="space-y-6 pl-2">
                                {dateActivities.map((activity, index) => (
                                    <div key={activity.id} className="relative flex gap-4 group">
                                        <div className="absolute left-[19px] top-0 bottom-[-24px] w-px bg-border group-last:hidden" />

                                        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-sm bg-secondary shrink-0 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary/80 transition-colors">
                                            <activity.icon className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1 pb-6">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm">
                                                        <span className="font-semibold text-foreground">{activity.user}</span>{" "}
                                                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                                                        <span className="font-medium text-foreground underline decoration-border decoration-1 underline-offset-4">{activity.target}</span>
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {activity.description}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {activity.time}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex items-center gap-2">
                                                <Avatar className="h-5 w-5 border border-border">
                                                    <AvatarImage src={activity.avatar} />
                                                    <AvatarFallback className="text-[9px]">{activity.user[0]}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
