"use client";

import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    Filter,
    Calendar,
    CheckCircle2,
    MessageSquare,
    UserPlus,
    FileText,
    ArrowRight,
    Clock,
    TrendingUp,
    Users,
    CheckSquare,
} from "lucide-react";

const activities = [
    {
        id: 1,
        user: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        action: "completed",
        target: "Design System Update",
        targetType: "task",
        description: "Marked task as complete in Design Team project",
        time: "2 minutes ago",
        date: "Today",
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-100",
    },
    {
        id: 2,
        user: "Michael Ross",
        avatar: "https://i.pravatar.cc/150?img=3",
        action: "commented on",
        target: "API Integration",
        targetType: "task",
        description: "Left a review comment on the implementation approach",
        time: "15 minutes ago",
        date: "Today",
        icon: MessageSquare,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-100",
    },
    {
        id: 3,
        user: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?img=5",
        action: "created",
        target: "User Research Phase 2",
        targetType: "task",
        description: "Created new task in Product project",
        time: "1 hour ago",
        date: "Today",
        icon: FileText,
        iconColor: "text-violet-500",
        iconBg: "bg-violet-100",
    },
    {
        id: 4,
        user: "James Miller",
        avatar: "https://i.pravatar.cc/150?img=8",
        action: "assigned",
        target: "Lisa Park",
        targetType: "member",
        description: "Assigned to Mobile App Testing task",
        time: "2 hours ago",
        date: "Today",
        icon: UserPlus,
        iconColor: "text-amber-500",
        iconBg: "bg-amber-100",
    },
    {
        id: 5,
        user: "Lisa Park",
        avatar: "https://i.pravatar.cc/150?img=10",
        action: "moved",
        target: "Dashboard Redesign",
        targetType: "task",
        description: "Moved from To Do to In Progress",
        time: "3 hours ago",
        date: "Today",
        icon: ArrowRight,
        iconColor: "text-cyan-500",
        iconBg: "bg-cyan-100",
    },
    {
        id: 6,
        user: "David Kim",
        avatar: "https://i.pravatar.cc/150?img=12",
        action: "completed",
        target: "Database Migration",
        targetType: "task",
        description: "Successfully migrated to new database schema",
        time: "5 hours ago",
        date: "Today",
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-100",
    },
    {
        id: 7,
        user: "Rachel Green",
        avatar: "https://i.pravatar.cc/150?img=25",
        action: "created",
        target: "Q1 Marketing Campaign",
        targetType: "project",
        description: "Created new project for upcoming quarter",
        time: "Yesterday",
        date: "Yesterday",
        icon: FileText,
        iconColor: "text-violet-500",
        iconBg: "bg-violet-100",
    },
    {
        id: 8,
        user: "Alex Turner",
        avatar: "https://i.pravatar.cc/150?img=15",
        action: "deployed",
        target: "Production v2.3.0",
        targetType: "deployment",
        description: "Released new version to production environment",
        time: "Yesterday",
        date: "Yesterday",
        icon: TrendingUp,
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-100",
    },
];

const stats = [
    { label: "Total Activities", value: "2,847", icon: Clock, color: "from-primary to-purple-600" },
    { label: "Tasks Completed", value: "423", icon: CheckSquare, color: "from-emerald-500 to-teal-500" },
    { label: "Comments", value: "1,256", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
    { label: "Team Members", value: "24", icon: Users, color: "from-amber-500 to-orange-500" },
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
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
                        <p className="text-muted-foreground">
                            Track all actions and updates across your workspace
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search activities..."
                                className="pl-10 w-64 rounded-xl bg-accent/50 border-0"
                            />
                        </div>
                        <Select>
                            <SelectTrigger className="w-40 rounded-xl bg-accent/50 border-0">
                                <SelectValue placeholder="All activities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All activities</SelectItem>
                                <SelectItem value="tasks">Tasks</SelectItem>
                                <SelectItem value="comments">Comments</SelectItem>
                                <SelectItem value="assignments">Assignments</SelectItem>
                                <SelectItem value="deployments">Deployments</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="rounded-xl">
                            <Calendar className="w-4 h-4 mr-2" />
                            Last 7 days
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="border-0 shadow-lg">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Activity Timeline */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Activity Timeline</CardTitle>
                            <Tabs defaultValue="all" className="w-auto">
                                <TabsList className="rounded-xl bg-accent">
                                    <TabsTrigger value="all" className="rounded-lg text-xs">All</TabsTrigger>
                                    <TabsTrigger value="tasks" className="rounded-lg text-xs">Tasks</TabsTrigger>
                                    <TabsTrigger value="comments" className="rounded-lg text-xs">Comments</TabsTrigger>
                                    <TabsTrigger value="members" className="rounded-lg text-xs">Members</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            {Object.entries(groupedActivities).map(([date, dateActivities], dateIndex) => (
                                <div key={date} className="mb-8 last:mb-0">
                                    {/* Date Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <Badge variant="secondary" className="rounded-full px-4 py-1 font-medium">
                                            {date}
                                        </Badge>
                                        <Separator className="flex-1" />
                                    </div>

                                    {/* Activities for this date */}
                                    <div className="space-y-6">
                                        {dateActivities.map((activity, index) => (
                                            <div key={activity.id} className="relative flex gap-4 group">
                                                {/* Timeline line */}
                                                {index < dateActivities.length - 1 && (
                                                    <div className="absolute left-[19px] top-12 bottom-0 w-0.5 bg-border" />
                                                )}

                                                {/* Activity Icon */}
                                                <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl ${activity.iconBg} shrink-0 transition-transform group-hover:scale-110`}>
                                                    <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                                                </div>

                                                {/* Activity Content */}
                                                <div className="flex-1 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-8 w-8 border-2 border-background">
                                                                <AvatarImage src={activity.avatar} />
                                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                                    {activity.user.split(" ").map((n) => n[0]).join("")}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm">
                                                                    <span className="font-medium">{activity.user}</span>{" "}
                                                                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                                                                    <span className="font-medium text-primary">{activity.target}</span>
                                                                </p>
                                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                                    {activity.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                            {activity.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="flex justify-center mt-8">
                            <Button variant="outline" className="rounded-xl">
                                Load more activities
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
