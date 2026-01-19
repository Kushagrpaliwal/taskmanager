"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Calendar,
    Clock,
    MessageSquare,
    Paperclip,
    CheckCircle2,
    Circle,
    Play,
    GripVertical,
} from "lucide-react";

const columns = [
    {
        id: "todo",
        title: "To Do",
        icon: Circle,
        color: "text-slate-500",
        bgColor: "bg-slate-100",
    },
    {
        id: "inprogress",
        title: "In Progress",
        icon: Play,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        id: "done",
        title: "Done",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bgColor: "bg-emerald-100",
    },
];

const tasks = [
    {
        id: 1,
        title: "Design new dashboard layout",
        description: "Create wireframes and high-fidelity mockups for the new dashboard",
        status: "inprogress",
        priority: "high",
        dueDate: "Jan 20",
        progress: 65,
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
        progress: 40,
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
        progress: 0,
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
        progress: 0,
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
        progress: 100,
        comments: 12,
        attachments: 4,
        assignees: [
            { name: "Michael Ross", avatar: "https://i.pravatar.cc/150?img=3" },
            { name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" },
        ],
        tags: ["DevOps"],
    },
    {
        id: 6,
        title: "User research interviews",
        description: "Conduct interviews with 10 target users",
        status: "done",
        priority: "medium",
        dueDate: "Jan 15",
        progress: 100,
        comments: 15,
        attachments: 8,
        assignees: [{ name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5" }],
        tags: ["Research", "UX"],
    },
    {
        id: 7,
        title: "Database optimization",
        description: "Improve query performance for large datasets",
        status: "todo",
        priority: "high",
        dueDate: "Jan 24",
        progress: 0,
        comments: 3,
        attachments: 1,
        assignees: [{ name: "James Miller", avatar: "https://i.pravatar.cc/150?img=8" }],
        tags: ["Backend", "Performance"],
    },
];

function TaskCard({ task }: { task: typeof tasks[0] }) {
    const priorityColors = {
        high: "bg-rose-100 text-rose-700 hover:bg-rose-200",
        medium: "bg-amber-100 text-amber-700 hover:bg-amber-200",
        low: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    };

    return (
        <div className="group bg-card rounded-xl border border-border/50 p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex flex-wrap gap-1.5">
                    {task.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[10px] px-2 py-0 rounded-full font-medium"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-1">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {task.title}
            </h4>

            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {task.description}
            </p>

            {task.progress > 0 && task.progress < 100 && (
                <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-1.5" />
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Badge
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                    >
                        {task.priority}
                    </Badge>
                    <span className="flex items-center text-[11px] text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {task.dueDate}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex -space-x-2">
                    {task.assignees.slice(0, 3).map((assignee, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={assignee.avatar} />
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {assignee.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                    {task.assignees.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium border-2 border-background">
                            +{task.assignees.length - 3}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center text-[11px]">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {task.comments}
                    </span>
                    <span className="flex items-center text-[11px]">
                        <Paperclip className="w-3 h-3 mr-1" />
                        {task.attachments}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function TasksPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                        <p className="text-muted-foreground">
                            Organize and track your team&apos;s work progress
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tasks..."
                                className="pl-10 w-64 rounded-xl bg-accent/50 border-0"
                            />
                        </div>
                        <Button variant="outline" className="rounded-xl">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Task
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Create New Task</DialogTitle>
                                    <DialogDescription>
                                        Add a new task to your project board
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Task Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter task title"
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe the task..."
                                            className="rounded-xl resize-none"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Priority</Label>
                                            <Select>
                                                <SelectTrigger className="rounded-xl">
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="high">🔴 High</SelectItem>
                                                    <SelectItem value="medium">🟡 Medium</SelectItem>
                                                    <SelectItem value="low">🟢 Low</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Status</Label>
                                            <Select>
                                                <SelectTrigger className="rounded-xl">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="todo">To Do</SelectItem>
                                                    <SelectItem value="inprogress">In Progress</SelectItem>
                                                    <SelectItem value="done">Done</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dueDate">Due Date</Label>
                                        <Input
                                            id="dueDate"
                                            type="date"
                                            className="rounded-xl"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button className="rounded-xl bg-gradient-to-r from-primary to-purple-600">
                                        Create Task
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {columns.map((column) => {
                        const columnTasks = tasks.filter((task) => task.status === column.id);
                        return (
                            <div key={column.id} className="space-y-4">
                                {/* Column Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${column.bgColor}`}>
                                            <column.icon className={`w-4 h-4 ${column.color}`} />
                                        </div>
                                        <h3 className="font-semibold">{column.title}</h3>
                                        <Badge variant="secondary" className="rounded-full text-xs">
                                            {columnTasks.length}
                                        </Badge>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Tasks */}
                                <ScrollArea className="h-[calc(100vh-280px)]">
                                    <div className="space-y-3 pr-2">
                                        {columnTasks.map((task) => (
                                            <TaskCard key={task.id} task={task} />
                                        ))}
                                        {columnTasks.length === 0 && (
                                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                                <div className={`p-4 rounded-2xl ${column.bgColor} mb-4`}>
                                                    <column.icon className={`w-8 h-8 ${column.color}`} />
                                                </div>
                                                <p className="text-sm text-muted-foreground">No tasks here</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Create or move tasks to this column
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
