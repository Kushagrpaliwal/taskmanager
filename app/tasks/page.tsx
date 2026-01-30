"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    MessageSquare,
    Paperclip,
    Layout,
    User,
    AlertCircle,
    Check,
    X,
} from "lucide-react";

interface User {
    id: string;
    membercode: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    status?: string;
}

interface NewTaskForm {
    title: string;
    description: string;
    assignedTo: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "inprogress" | "done";
    dueDate: string;
    tags: string;
}

const columns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
];

interface Task {
    id: string;
    topic: string;
    description: string;
    priority: string;
    assignee: string;
    status: string;
    tags: string;
    duedate: string;
}

export default function TasksPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState<User[]>([]);
    const [isLoadingMembers, setIsLoadingMembers] = useState(false);
    const [memberSearchQuery, setMemberSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [formData, setFormData] = useState<NewTaskForm>({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        tags: "",
    });
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetchMembers();
        fetchTask();
    }, []);

    const fetchMembers = async () => {
        setIsLoadingMembers(true);
        try {
            const res = await fetch("/api/getUsers");
            const data = await res.json();
            if (data.res) {
                setMembers(data.res);
            }
        } catch (error) {
            console.error("Failed to fetch members:", error);
        } finally {
            setIsLoadingMembers(false);
        }
    };

    const fetchTask = async () => {
        try {
            const res = await fetch("/api/getTasks");
            const data = await res.json();
            setTasks(data.res)
            console.log("All Tasks Fetched Successfully", data.res)
        } catch (error) {
            console.log("Unable to Fetch tasks server error")
        }
    }

    // Filter members based on search query and role filter
    const filteredMembers = members.filter((member) => {
        const matchesSearch =
            `${member.firstname} ${member.lastname}`.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
            member.membercode.toLowerCase().includes(memberSearchQuery.toLowerCase());

        const matchesRole = roleFilter === "all" || member.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    // Get unique roles for filter
    const uniqueRoles = Array.from(new Set(members.map(m => m.role))).sort();

    // Get selected member details
    const selectedMember = members.find(m => m.membercode === formData.assignedTo);

    const handleInputChange = (field: keyof NewTaskForm, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.title || !formData.description || !formData.assignedTo || !formData.dueDate) {
            alert("Please fill in all required fields");
            return;
        }

        const res = await fetch("/api/addTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: formData.title,
                description: formData.description,
                priority: formData.priority,
                assignee: formData.assignedTo,
                status: formData.status,
                tags: formData.tags,
                duedate: formData.dueDate,
            })
        })

        // TODO: Add API call to create task
        console.log("Creating task:", res);

        // Reset form and close modal
        setFormData({
            title: "",
            description: "",
            assignedTo: "",
            priority: "medium",
            status: "todo",
            dueDate: "",
            tags: "",
        });
        setIsModalOpen(false);
    };

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
                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="flex-1 sm:flex-none h-8 rounded-sm bg-primary text-primary-foreground text-xs font-medium shadow-none">
                                        <Plus className="w-3.5 h-3.5 mr-2" />
                                        New Task
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold">Create New Task</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details below to create a new task for your team.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid gap-6 py-4">
                                        {/* Title */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="title" className="text-sm font-medium flex items-center gap-1">
                                                Topic/Title <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="title"
                                                placeholder="Enter task title..."
                                                value={formData.title}
                                                onChange={(e) => handleInputChange("title", e.target.value)}
                                                className="h-9 rounded-sm"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-1">
                                                Description <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Describe the task in detail..."
                                                value={formData.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                className="min-h-[100px] rounded-sm resize-none"
                                            />
                                        </div>

                                        {/* Assignee Selection - Same UI as Teams Modal */}
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium flex items-center gap-1">
                                                    Assign To <span className="text-red-500">*</span>
                                                </Label>
                                                {formData.assignedTo && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 text-xs text-muted-foreground hover:text-foreground"
                                                        onClick={() => handleInputChange("assignedTo", "")}
                                                    >
                                                        <X className="w-3 h-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>

                                            {/* Search Bar */}
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search members..."
                                                    value={memberSearchQuery}
                                                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                                                    className="pl-10 h-9"
                                                />
                                            </div>

                                            {/* Role Filter */}
                                            <div className="flex items-center gap-2">
                                                <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">All Roles</SelectItem>
                                                        {uniqueRoles.map((role) => (
                                                            <SelectItem key={role} value={role}>
                                                                {role}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                                                    {filteredMembers.length} of {members.length}
                                                </span>
                                            </div>

                                            {/* Members List - Same style as Teams Modal */}
                                            <div className="border border-border rounded-lg overflow-hidden h-[280px] overflow-y-auto bg-background">
                                                {isLoadingMembers ? (
                                                    <div className="p-8 text-center">
                                                        <div className="animate-pulse space-y-3">
                                                            <div className="h-12 bg-secondary rounded"></div>
                                                            <div className="h-12 bg-secondary rounded"></div>
                                                            <div className="h-12 bg-secondary rounded"></div>
                                                        </div>
                                                    </div>
                                                ) : filteredMembers.length === 0 ? (
                                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                                        <User className="w-8 h-8 mb-2 opacity-50" />
                                                        <p className="text-sm font-medium">
                                                            {memberSearchQuery || roleFilter !== "all"
                                                                ? "No matches found"
                                                                : "No members available"}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="divide-y divide-border">
                                                        {filteredMembers.map((member) => {
                                                            const isSelected = formData.assignedTo === member.membercode;
                                                            return (
                                                                <div
                                                                    key={member.membercode}
                                                                    onClick={() => handleInputChange("assignedTo", member.membercode)}
                                                                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${isSelected ? "bg-primary/5" : "hover:bg-secondary/50"
                                                                        }`}
                                                                >
                                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                                                        {member.firstname[0]}{member.lastname[0]}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium text-foreground truncate">
                                                                            {member.firstname} {member.lastname}
                                                                        </p>
                                                                        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                                                                    </div>
                                                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full shrink-0">
                                                                        {member.role}
                                                                    </span>
                                                                    {isSelected && (
                                                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                                                                            <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Priority and Status Row */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Priority */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="priority" className="text-sm font-medium flex items-center gap-1">
                                                    Priority <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={formData.priority}
                                                    onValueChange={(value) => handleInputChange("priority", value as NewTaskForm["priority"])}
                                                >
                                                    <SelectTrigger id="priority" className="h-9 rounded-sm">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="low">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                                Low
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="medium">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                                Medium
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="high">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                                High
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Status */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="status" className="text-sm font-medium flex items-center gap-1">
                                                    Status <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={formData.status}
                                                    onValueChange={(value) => handleInputChange("status", value as NewTaskForm["status"])}
                                                >
                                                    <SelectTrigger id="status" className="h-9 rounded-sm">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="todo">To Do</SelectItem>
                                                        <SelectItem value="inprogress">In Progress</SelectItem>
                                                        <SelectItem value="done">Done</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Due Date */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-1">
                                                Due Date <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="dueDate"
                                                type="date"
                                                value={formData.dueDate}
                                                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                                                className="h-9 rounded-sm"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        {/* Tags */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="tags" className="text-sm font-medium">
                                                Tags (Optional)
                                            </Label>
                                            <Input
                                                id="tags"
                                                placeholder="e.g., Design, Frontend, Bug (comma separated)"
                                                value={formData.tags}
                                                onChange={(e) => handleInputChange("tags", e.target.value)}
                                                className="h-9 rounded-sm"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Separate multiple tags with commas
                                            </p>
                                        </div>
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsModalOpen(false)}
                                            className="h-9 rounded-sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="h-9 rounded-sm bg-primary"
                                            disabled={!formData.title || !formData.description || !formData.assignedTo || !formData.dueDate}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Task
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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
                                    {tasks.filter(t => t.status === column.id).map(task => {
                                        const assigneeUser = members.find(m => m.membercode === task.assignee);
                                        const taskTags = task.tags ? task.tags.split(',').map(t => t.trim()) : [];

                                        return (
                                            <div key={task.id} className="group p-3 bg-card border border-border rounded-sm shadow-sm hover:shadow-md transition-all cursor-pointer">
                                                {/* Tags */}
                                                <div className="flex gap-1 mb-2 flex-wrap">
                                                    {taskTags.map((tag, i) => (
                                                        <span key={i} className="px-1.5 py-0.5 rounded-sm bg-secondary text-[10px] text-muted-foreground font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{task.topic}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{task.description}</p>

                                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-dotted border-border">
                                                    <div className="flex items-center gap-2">
                                                        {assigneeUser ? (
                                                            <div className="flex items-center gap-1.5" title={`${assigneeUser.firstname} ${assigneeUser.lastname}`}>
                                                                <Avatar className="h-5 w-5 border border-background">
                                                                    <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                                                                        {assigneeUser.firstname[0]}{assigneeUser.lastname[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
                                                                    {assigneeUser.firstname}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] text-muted-foreground italic">Unassigned</span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="flex items-center text-[10px] text-muted-foreground">
                                                            <Calendar className="w-3 h-3 mr-1" />
                                                            {new Date(task.duedate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </span>

                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
