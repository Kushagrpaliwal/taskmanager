"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    MessageSquare,
    CheckSquare,
    FileText,
    Search,
    Send,
    Plus,
    MoreHorizontal,
    Clock,
    CalendarDays,
    ChevronRight,
    ArrowLeft,
    Settings,
    UserPlus,
    Hash,
    Paperclip,
    Smile,
    Circle,
    CheckCircle2,
    AlertCircle,
    Timer,
} from "lucide-react";
import Link from "next/link";

interface User {
    id: string;
    membercode: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    status?: string;
}

interface Team {
    id: string;
    name: string;
    description: string;
    members: string[];
    teamcode: string;
    companycode: string;
    created_at: string;
}

interface Message {
    id: number;
    user: string;
    avatar: string;
    message: string;
    time: string;
    isOwn?: boolean;
}

interface Task {
    id: number;
    title: string;
    status: "todo" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    assignee: string;
    dueDate: string;
}

interface Note {
    id: number;
    title: string;
    content: string;
    author: string;
    updatedAt: string;
    color: string;
}

// Mock data for demo
const mockMessages: Message[] = [
    { id: 1, user: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1", message: "Hey team! Just finished the design specs for the new dashboard.", time: "10:30 AM" },
    { id: 2, user: "Michael Ross", avatar: "https://i.pravatar.cc/150?img=3", message: "Great work! I'll start implementing it today.", time: "10:35 AM" },
    { id: 3, user: "You", avatar: "", message: "Perfect timing! Let me know if you need any clarifications.", time: "10:38 AM", isOwn: true },
    { id: 4, user: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=5", message: "I can help with the API integration part 🚀", time: "10:42 AM" },
    { id: 5, user: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1", message: "That would be awesome! Let's sync up after lunch.", time: "10:45 AM" },
];

const mockTasks: Task[] = [
    { id: 1, title: "Design system documentation", status: "in-progress", priority: "high", assignee: "Sarah Chen", dueDate: "Today" },
    { id: 2, title: "API endpoint integration", status: "todo", priority: "medium", assignee: "Michael Ross", dueDate: "Tomorrow" },
    { id: 3, title: "User authentication flow", status: "completed", priority: "high", assignee: "Emma Wilson", dueDate: "Jan 25" },
    { id: 4, title: "Dashboard analytics", status: "in-progress", priority: "low", assignee: "You", dueDate: "Jan 28" },
    { id: 5, title: "Mobile responsive layout", status: "todo", priority: "medium", assignee: "Sarah Chen", dueDate: "Jan 30" },
];

const mockNotes: Note[] = [
    { id: 1, title: "Sprint Planning Notes", content: "Focus on user authentication and dashboard features for this sprint. Priority items include...", author: "Sarah Chen", updatedAt: "2 hours ago", color: "bg-blue-500/10 border-blue-500/20" },
    { id: 2, title: "Design Guidelines", content: "Using the new design system with primary colors #111111 and accent teal. Typography should be...", author: "Michael Ross", updatedAt: "Yesterday", color: "bg-purple-500/10 border-purple-500/20" },
    { id: 3, title: "API Documentation", content: "All endpoints should follow RESTful conventions. Authentication required for protected routes...", author: "Emma Wilson", updatedAt: "2 days ago", color: "bg-emerald-500/10 border-emerald-500/20" },
    { id: 4, title: "Meeting Summary", content: "Discussed timeline adjustments and resource allocation for Q1 deliverables...", author: "You", updatedAt: "3 days ago", color: "bg-amber-500/10 border-amber-500/20" },
];

// Mock team data for demo
const mockTeam: Team = {
    id: "1",
    name: "Product Development",
    description: "Core product team building amazing features",
    members: ["M001", "M002", "M003", "M004"],
    teamcode: "TEAM-001",
    companycode: "COMP-001",
    created_at: new Date().toISOString(),
};

// Mock members data for demo
const mockMembers: User[] = [
    { id: "1", membercode: "M001", firstname: "Sarah", lastname: "Chen", email: "sarah.chen@example.com", role: "Team Lead", status: "online" },
    { id: "2", membercode: "M002", firstname: "Michael", lastname: "Ross", email: "michael.ross@example.com", role: "Developer", status: "online" },
    { id: "3", membercode: "M003", firstname: "Emma", lastname: "Wilson", email: "emma.wilson@example.com", role: "Designer", status: "away" },
    { id: "4", membercode: "M004", firstname: "James", lastname: "Taylor", email: "james.taylor@example.com", role: "Developer", status: "offline" },
];

type ActiveSection = "chat" | "tasks" | "notes";

export default function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = use(params);
    const [activeSection, setActiveSection] = useState<ActiveSection>("chat");
    const [team, setTeam] = useState<Team | null>(null);
    const [members, setMembers] = useState<User[]>([]);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [searchMember, setSearchMember] = useState("");

    useEffect(() => {
        fetchTeamDetails();
    }, [teamId]);

    const fetchTeamDetails = async () => {
        try {
            const res = await fetch("/api/getTeams");
            const data = await res.json();
            if (data.res && data.res.length > 0) {
                // Fix: Compare as strings to handle type mismatches (id could be number from DB)
                const foundTeam = data.res.find((t: Team) => String(t.id) === String(teamId) || t.teamcode === teamId);
                if (foundTeam) {
                    setTeam(foundTeam);
                    // Fetch members
                    const usersRes = await fetch("/api/getUsers");
                    const usersData = await usersRes.json();
                    if (usersData.res) {
                        const teamMembers = usersData.res.filter((user: User) =>
                            foundTeam.members.includes(user.membercode)
                        );
                        setMembers(teamMembers);
                    } else {
                        // Fallback to mock members if API fails
                        setMembers(mockMembers);
                    }
                    return;
                }
            }
            // Fallback to mock data if no team found from API
            console.log("Using mock data - no matching team found from API for teamId:", teamId);
            setTeam(mockTeam);
            setMembers(mockMembers);
        } catch (error) {
            console.error("Failed to fetch team details, using mock data", error);
            // Fallback to mock data on error
            setTeam(mockTeam);
            setMembers(mockMembers);
        }
    };

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        const newMessage: Message = {
            id: messages.length + 1,
            user: "You",
            avatar: "",
            message: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
        };
        setMessages([...messages, newMessage]);
        setMessageInput("");
    };

    const filteredMembers = members.filter((member) =>
        (member.firstname + " " + member.lastname).toLowerCase().includes(searchMember.toLowerCase())
    );

    const getStatusIcon = (status: Task["status"]) => {
        switch (status) {
            case "completed": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case "in-progress": return <Timer className="w-4 h-4 text-blue-500" />;
            default: return <Circle className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const getPriorityColor = (priority: Task["priority"]) => {
        switch (priority) {
            case "high": return "bg-red-500";
            case "medium": return "bg-amber-500";
            default: return "bg-emerald-500";
        }
    };

    if (!team) {
        return (
            <div className="flex items-center justify-center h-screen w-screen bg-background">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-secondary"></div>
                    <div className="h-4 w-32 bg-secondary rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-background p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-4 px-1">
                <div className="flex items-center gap-3">
                    <Link href="/teams">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg font-bold text-foreground">
                        {team.name[0]}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tight text-foreground">{team.name}</h1>
                            <Badge variant="secondary" className="text-[10px] font-normal">
                                {team.teamcode}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{team.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-sm text-xs">
                        <UserPlus className="w-3.5 h-3.5 mr-2" />
                        Invite
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm">
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden mt-4 gap-4">
                {/* Members Sidebar */}
                <div className="w-64 shrink-0 border border-border rounded-lg bg-card overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-sm text-foreground">Members</h3>
                            </div>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                {members.length}
                            </span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                value={searchMember}
                                onChange={(e) => setSearchMember(e.target.value)}
                                className="h-8 pl-8 text-xs rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {filteredMembers.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground text-sm">
                                No members found
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {filteredMembers.map((member) => (
                                    <div
                                        key={member.membercode}
                                        className="flex items-center gap-3 p-2 rounded-sm hover:bg-secondary/50 cursor-pointer transition-colors group"
                                    >
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-foreground">
                                                {member.firstname[0]}{member.lastname[0]}
                                            </div>
                                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card"></span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {member.firstname} {member.lastname}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground truncate capitalize">
                                                {member.role}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Panel */}
                <div className="flex-1 flex flex-col overflow-hidden border border-border rounded-lg bg-card">
                    {/* Section Tabs */}
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-secondary/30">
                        <button
                            onClick={() => setActiveSection("chat")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all ${activeSection === "chat"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Chat
                        </button>
                        <button
                            onClick={() => setActiveSection("tasks")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all ${activeSection === "tasks"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                }`}
                        >
                            <CheckSquare className="w-4 h-4" />
                            Tasks
                            <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                                {mockTasks.filter(t => t.status !== "completed").length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveSection("notes")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all ${activeSection === "notes"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Notes
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden">
                        {/* Chat Section */}
                        {activeSection === "chat" && (
                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                                        >
                                            {!msg.isOwn && (
                                                <Avatar className="h-8 w-8 shrink-0">
                                                    <AvatarImage src={msg.avatar} />
                                                    <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-primary/5">
                                                        {msg.user[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={`flex flex-col max-w-[70%] ${msg.isOwn ? "items-end" : ""}`}>
                                                {!msg.isOwn && (
                                                    <span className="text-xs font-medium text-foreground mb-1">{msg.user}</span>
                                                )}
                                                <div
                                                    className={`px-4 py-2.5 rounded-2xl ${msg.isOwn
                                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                                        : "bg-secondary text-foreground rounded-bl-sm"
                                                        }`}
                                                >
                                                    <p className="text-sm">{msg.message}</p>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground mt-1">{msg.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-border">
                                    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                            <Paperclip className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                        <Input
                                            placeholder="Type a message..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm"
                                        />
                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                            <Smile className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 rounded-lg shrink-0"
                                            onClick={handleSendMessage}
                                            disabled={!messageInput.trim()}
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tasks Section */}
                        {activeSection === "tasks" && (
                            <div className="h-full overflow-y-auto p-4">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                                                <Circle className="w-3 h-3" />
                                                To Do
                                                <span className="font-medium text-foreground">{mockTasks.filter(t => t.status === "todo").length}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600">
                                                <Timer className="w-3 h-3" />
                                                In Progress
                                                <span className="font-medium">{mockTasks.filter(t => t.status === "in-progress").length}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Done
                                                <span className="font-medium">{mockTasks.filter(t => t.status === "completed").length}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <Button size="sm" className="h-8 rounded-sm text-xs">
                                        <Plus className="w-3.5 h-3.5 mr-2" />
                                        New Task
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {mockTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer group"
                                        >
                                            {getStatusIcon(task.status)}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Assigned to {task.assignee}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <CalendarDays className="w-3 h-3" />
                                                    {task.dueDate}
                                                </span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notes Section */}
                        {activeSection === "notes" && (
                            <div className="h-full overflow-y-auto p-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-semibold text-foreground">Team Notes</h3>
                                    <Button size="sm" className="h-8 rounded-sm text-xs">
                                        <Plus className="w-3.5 h-3.5 mr-2" />
                                        New Note
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mockNotes.map((note) => (
                                        <div
                                            key={note.id}
                                            className={`p-4 rounded-lg border ${note.color} hover:shadow-md transition-all cursor-pointer group`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-semibold text-sm text-foreground group-hover:underline decoration-1 underline-offset-4">
                                                    {note.title}
                                                </h4>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-1">
                                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                {note.content}
                                            </p>
                                            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                                <span>{note.author}</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {note.updatedAt}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
