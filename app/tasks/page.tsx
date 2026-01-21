"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Calendar,
    MessageSquare,
    Paperclip,
    Layout,
} from "lucide-react";

const tasks = [
    {
        id: 1,
        title: "Design new dashboard layout",
        description: "Create wireframes and high-fidelity mockups for the new dashboard",
        status: "inprogress",
        priority: "high",
        dueDate: "Jan 20",
        comments: 5,
        attachments: 3,
        assignees: [
            { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1" },
            { name: "Michael Ross", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        tags: ["Design", "UI/UX"],
    },
    {
        id: 2,
        title: "Implement user authentication",
        description: "Set up JWT authentication with refresh tokens",
        status: "inprogress",
        priority: "high",
        dueDate: "Jan 22",
        comments: 8,
        attachments: 2,
        assignees: [{ name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" }],
        tags: ["Backend", "Security"],
    },
    {
        id: 3,
        title: "Write API documentation",
        description: "Document all REST endpoints with examples",
        status: "todo",
        priority: "medium",
        dueDate: "Jan 25",
        comments: 2,
        attachments: 0,
        assignees: [{ name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5" }],
        tags: ["Documentation"],
    },
    {
        id: 4,
        title: "Fix mobile responsive issues",
        description: "Address layout problems on smaller screens",
        status: "todo",
        priority: "low",
        dueDate: "Jan 28",
        comments: 1,
        attachments: 1,
        assignees: [{ name: "Lisa Park", avatar: "https://i.pravatar.cc/150?img=10" }],
        tags: ["Frontend", "Bug"],
    },
    {
        id: 5,
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        status: "done",
        priority: "high",
        dueDate: "Jan 18",
        comments: 12,
        attachments: 4,
        assignees: [
            { name: "Michael Ross", avatar: "https://i.pravatar.cc/150?img=3" },
            { name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" },
        ],
        tags: ["DevOps"],
    },
];

const columns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
];

export default function TasksPage() {
    return (
        <AppLayout>
            <div className="h-[calc(100vh-2rem)] flex flex-col">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-4 px-4 md:px-6 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-primary">
                            <Layout className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
                            <p className="text-muted-foreground text-sm">Project board</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Filter tasks..."
                                className="pl-9 w-full sm:w-48 h-8 rounded-sm bg-background border-border focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-8 rounded-sm text-xs font-normal">
                                <Filter className="w-3.5 h-3.5 mr-2" />
                                Filter
                            </Button>
                            <Button size="sm" className="flex-1 sm:flex-none h-8 rounded-sm bg-primary text-primary-foreground text-xs font-medium shadow-none">
                                <Plus className="w-3.5 h-3.5 mr-2" />
                                New Task
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="flex-1 overflow-x-auto">
                    <div className="h-full flex gap-6 p-6 min-w-[1000px]">
                        {columns.map((column) => (
                            <div key={column.id} className="flex-1 min-w-[300px] flex flex-col gap-4">
                                <div className="flex items-center justify-between pb-2 border-b-2 border-transparent hover:border-border transition-colors">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
                                        <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-sm">
                                            {tasks.filter(t => t.status === column.id).length}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Plus className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {tasks.filter(t => t.status === column.id).map(task => (
                                        <div key={task.id} className="group p-3 bg-card border border-border rounded-sm shadow-sm hover:shadow-md transition-all cursor-pointer">
                                            {/* Tags */}
                                            <div className="flex gap-1 mb-2">
                                                {task.tags.map(tag => (
                                                    <span key={tag} className="px-1.5 py-0.5 rounded-sm bg-secondary text-[10px] text-muted-foreground font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{task.title}</h4>

                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-dotted border-border">
                                                <div className="flex -space-x-1.5">
                                                    {task.assignees.map((a, i) => (
                                                        <Avatar key={i} className="h-5 w-5 border border-background">
                                                            <AvatarImage src={a.avatar} />
                                                            <AvatarFallback className="text-[8px]">{a.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {task.attachments > 0 && (
                                                        <span className="flex items-center text-[10px] text-muted-foreground">
                                                            <Paperclip className="w-3 h-3 mr-1" />
                                                            {task.attachments}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center text-[10px] text-muted-foreground">
                                                        <MessageSquare className="w-3 h-3 mr-1" />
                                                        {task.comments}
                                                    </span>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
