"use client";

import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    Plus,
    Search,
    MoreHorizontal,
    Users,
} from "lucide-react";

const teams = [
    {
        id: 1,
        name: "Design Team",
        description: "UI/UX design and brand identity",
        members: [
            { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1" },
            { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5" },
            { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?img=10" },
        ],
        projects: 8,
        tasksCompleted: 45,
        totalTasks: 52,
    },
    {
        id: 2,
        name: "Engineering",
        description: "Frontend and backend development",
        members: [
            { name: "Michael Ross", avatar: "https://i.pravatar.cc/150?img=3" },
            { name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" },
            { name: "David Kim", avatar: "https://i.pravatar.cc/150?img=12" },
            { name: "Alex Turner", avatar: "https://i.pravatar.cc/150?img=15" },
        ],
        projects: 12,
        tasksCompleted: 89,
        totalTasks: 120,
    },
    {
        id: 3,
        name: "Product",
        description: "Product management and strategy",
        members: [
            { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5" },
            { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=20" },
        ],
        projects: 5,
        tasksCompleted: 23,
        totalTasks: 28,
    },
    {
        id: 4,
        name: "Marketing",
        description: "Growth and campaign management",
        members: [
            { name: "Rachel Green", avatar: "https://i.pravatar.cc/150?img=25" },
            { name: "Monica Geller", avatar: "https://i.pravatar.cc/150?img=28" },
        ],
        projects: 6,
        tasksCompleted: 34,
        totalTasks: 41,
    },
];

export default function TeamsPage() {
    return (
        <AppLayout>
            <div className="space-y-6 w-full">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Teams</h1>
                            <p className="text-muted-foreground text-sm">Active workspaces and groups</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search teams..."
                                className="pl-9 w-64 h-8 rounded-sm bg-background border-border focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>
                        <Button size="sm" className="h-8 rounded-sm bg-primary text-primary-foreground text-xs font-medium shadow-none">
                            <Plus className="w-3.5 h-3.5 mr-2" />
                            New Team
                        </Button>
                    </div>
                </div>

                {/* Teams List */}
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">All Teams</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-sm bg-card hover:bg-secondary/20 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start gap-4 mb-4 md:mb-0">
                                    <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center text-lg font-bold text-foreground">
                                        {team.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-foreground group-hover:underline decoration-1 underline-offset-4">{team.name}</h3>
                                        <p className="text-sm text-muted-foreground">{team.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="flex -space-x-2">
                                        {team.members.slice(0, 4).map((member, i) => (
                                            <Avatar key={i} className="h-7 w-7 border-2 border-background rounded-full">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="text-[10px]">{member.name[0]}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                    <div className="w-32 hidden md:block">
                                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                            <span>Progress</span>
                                            <span>{Math.round((team.tasksCompleted / team.totalTasks) * 100)}%</span>
                                        </div>
                                        <Progress value={(team.tasksCompleted / team.totalTasks) * 100} className="h-1.5" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
