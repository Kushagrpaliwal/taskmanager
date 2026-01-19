"use client";

import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    Plus,
    Search,
    MoreHorizontal,
    Users,
    FolderKanban,
    Clock,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const teams = [
    {
        id: 1,
        name: "Design Team",
        description: "UI/UX design and brand identity",
        color: "from-pink-500 to-rose-500",
        shadowColor: "shadow-pink-500/25",
        members: [
            { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1" },
            { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5" },
            { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?img=10" },
        ],
        projects: 8,
        tasksCompleted: 45,
        totalTasks: 52,
        lastActive: "2 hours ago",
    },
    {
        id: 2,
        name: "Engineering",
        description: "Frontend and backend development",
        color: "from-blue-500 to-cyan-500",
        shadowColor: "shadow-blue-500/25",
        members: [
            { name: "Michael Ross", avatar: "https://i.pravatar.cc/150?img=3" },
            { name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" },
            { name: "David Kim", avatar: "https://i.pravatar.cc/150?img=12" },
            { name: "Alex Turner", avatar: "https://i.pravatar.cc/150?img=15" },
        ],
        projects: 12,
        tasksCompleted: 89,
        totalTasks: 120,
        lastActive: "Just now",
    },
    {
        id: 3,
        name: "Product",
        description: "Product management and strategy",
        color: "from-violet-500 to-purple-500",
        shadowColor: "shadow-violet-500/25",
        members: [
            { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5" },
            { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=20" },
        ],
        projects: 5,
        tasksCompleted: 23,
        totalTasks: 28,
        lastActive: "1 hour ago",
    },
    {
        id: 4,
        name: "Marketing",
        description: "Growth and campaign management",
        color: "from-amber-500 to-orange-500",
        shadowColor: "shadow-amber-500/25",
        members: [
            { name: "Rachel Green", avatar: "https://i.pravatar.cc/150?img=25" },
            { name: "Monica Geller", avatar: "https://i.pravatar.cc/150?img=28" },
            { name: "Phoebe Buffay", avatar: "https://i.pravatar.cc/150?img=30" },
        ],
        projects: 6,
        tasksCompleted: 34,
        totalTasks: 41,
        lastActive: "30 min ago",
    },
    {
        id: 5,
        name: "DevOps",
        description: "Infrastructure and deployment",
        color: "from-emerald-500 to-teal-500",
        shadowColor: "shadow-emerald-500/25",
        members: [
            { name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" },
            { name: "Alex Turner", avatar: "https://i.pravatar.cc/150?img=15" },
        ],
        projects: 4,
        tasksCompleted: 67,
        totalTasks: 72,
        lastActive: "5 hours ago",
    },
    {
        id: 6,
        name: "Customer Success",
        description: "Client support and satisfaction",
        color: "from-indigo-500 to-blue-500",
        shadowColor: "shadow-indigo-500/25",
        members: [
            { name: "Jennifer Adams", avatar: "https://i.pravatar.cc/150?img=32" },
            { name: "Mark Taylor", avatar: "https://i.pravatar.cc/150?img=35" },
            { name: "Sophie Brown", avatar: "https://i.pravatar.cc/150?img=38" },
            { name: "Chris Evans", avatar: "https://i.pravatar.cc/150?img=40" },
        ],
        projects: 3,
        tasksCompleted: 156,
        totalTasks: 180,
        lastActive: "15 min ago",
    },
];

export default function TeamsPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                        <p className="text-muted-foreground">
                            Manage your teams and workspaces
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search teams..."
                                className="pl-10 w-64 rounded-xl bg-accent/50 border-0"
                            />
                        </div>
                        <Button className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25">
                            <Plus className="w-4 h-4 mr-2" />
                            New Team
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Teams</p>
                                    <p className="text-2xl font-bold">{teams.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                                    <FolderKanban className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Projects</p>
                                    <p className="text-2xl font-bold">{teams.reduce((acc, t) => acc + t.projects, 0)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg. Completion</p>
                                    <p className="text-2xl font-bold">
                                        {Math.round(
                                            teams.reduce((acc, t) => acc + (t.tasksCompleted / t.totalTasks) * 100, 0) / teams.length
                                        )}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Teams Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teams.map((team) => (
                        <Card
                            key={team.id}
                            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Gradient header */}
                            <div className={`h-2 bg-gradient-to-r ${team.color}`} />

                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${team.color} shadow-lg ${team.shadowColor}`}>
                                            <span className="text-lg font-bold text-white">{team.name[0]}</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                {team.name}
                                            </CardTitle>
                                            <CardDescription className="text-xs">
                                                {team.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Members */}
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {team.members.slice(0, 4).map((member, i) => (
                                            <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {team.members.length > 4 && (
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                                                +{team.members.length - 4}
                                            </div>
                                        )}
                                    </div>
                                    <Badge variant="secondary" className="rounded-full">
                                        {team.projects} projects
                                    </Badge>
                                </div>

                                {/* Progress */}
                                <div>
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">
                                            {team.tasksCompleted}/{team.totalTasks} tasks
                                        </span>
                                    </div>
                                    <Progress
                                        value={(team.tasksCompleted / team.totalTasks) * 100}
                                        className="h-2"
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-2">
                                    <span className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {team.lastActive}
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Team
                                        <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
