"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Plus,
    Search,
    Users,
    Trash2,
    Save,
    X,
} from "lucide-react";

interface User {
    id: string;
    membercode: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

interface Teams {
    id: string;
    name: string;
    description: string;
    members: string[];
    teamcode: string;
    companycode: string;
    created_at: string;
}

export default function TeamsPage() {
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [memberSearch, setMemberSearch] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const filteredUsers = users.filter((user) =>
        (user.firstname + " " + user.lastname).toLowerCase().includes(memberSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
        user.role.toLowerCase().includes(memberSearch.toLowerCase())
    );

    const [teams, setTeams] = useState<Teams[]>([]);

    const fetchTeams = async () => {
        try {

            const res = await fetch("/api/getTeams")

            const data = await res.json();

            if (data.res) {
                setTeams(data.res || []);
            } else {
                console.log(data.error);
            }

        } catch (error) {
            console.log("Failed to fetch teams", error);
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/getUsers");
            const data = await res.json();
            if (data.res) {
                setUsers(data.res);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [])

    useEffect(() => {
        if (isCreateModalOpen) {
            fetchUsers();
        }
    }, [isCreateModalOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleMemberSelection = (memId: string) => {
        setSelectedMembers((prev) => prev.includes(memId) ? prev.filter((id) => id !== memId) : [...prev, memId]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/addTeams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                members: selectedMembers
            })
        })

        const data = await res.json();

        if (data.error) {
            toast.error(data.error);
        }

        if (data.success) {
            toast.success(data.success);
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Creating team:", { ...formData, members: selectedMembers });
            setIsLoading(false);
            setIsCreateModalOpen(false);
            // Reset form
            setFormData({ name: "", description: "" });
            setSelectedMembers([]);
            setMemberSearch("");
        }, 1500);
    };

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

                        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="h-8 rounded-sm bg-primary text-primary-foreground text-xs font-medium shadow-none">
                                    <Plus className="w-3.5 h-3.5 mr-2" />
                                    New Team
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[85vh] p-0 gap-0 overflow-hidden flex flex-col backdrop-blur-sm bg-background/95">
                                <DialogHeader className="p-6 pb-2">
                                    <DialogTitle>Create New Team</DialogTitle>
                                    <DialogDescription>
                                        Create a new squad and add members to collaborate.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex-1 overflow-y-auto p-6 pt-2">
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Team Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="e.g. Alpha Squad"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="h-11"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="description">Description</Label>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formData.description.length}/400
                                                    </span>
                                                </div>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    placeholder="Briefly describe the team's purpose and goals..."
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    maxLength={400}
                                                    rows={4}
                                                    className="resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Member Selection Section */}
                                        <div className="pt-6 border-t border-border">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-primary" />
                                                    <h3 className="font-semibold text-foreground">Add Members</h3>
                                                </div>
                                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                                    {selectedMembers.length} selected
                                                </span>
                                            </div>

                                            {/* Available Members List */}
                                            <div className="flex flex-col h-[300px]">
                                                <div className="relative mb-3">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input
                                                        placeholder="Search members..."
                                                        value={memberSearch}
                                                        onChange={(e) => setMemberSearch(e.target.value)}
                                                        className="pl-10 h-9"
                                                    />
                                                </div>
                                                <div className="border border-border rounded-lg overflow-hidden flex-1 overflow-y-auto bg-background">
                                                    {filteredUsers.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                                            <p className="text-sm font-medium">
                                                                {memberSearch ? "No matches found" : "No members available"}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="divide-y divide-border">
                                                            {filteredUsers.map((user) => {
                                                                const isSelected = selectedMembers.includes(user.membercode);
                                                                return (
                                                                    <div
                                                                        key={user.membercode}
                                                                        onClick={() => toggleMemberSelection(user.membercode)}
                                                                        className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${isSelected ? "bg-primary/5" : "hover:bg-secondary/50"}`}
                                                                    >
                                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                                                            {user.firstname[0]}{user.lastname[0]}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-foreground truncate">
                                                                                {user.firstname} {user.lastname}
                                                                            </p>
                                                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                                        </div>
                                                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full shrink-0">
                                                                            {user.role}
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
                                        </div>

                                        <div className="flex justify-end gap-3 pt-6 border-t border-border">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsCreateModalOpen(false)}
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="gap-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                {isLoading ? "Creating..." : "Create Team"}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Teams List */}
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">All Teams</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                onClick={() => router.push(`/teams/${team.id}`)}
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

                                <div className="flex items-center gap-6 md:gap-12">

                                    <div className="flex items-center gap-8 text-sm text-muted-foreground">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-foreground">{team.members.length}</span>
                                            <span className="text-xs">Members</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            {/* <span className="font-bold text-foreground">{team.totalTasks}</span> */}
                                            <span className="text-xs">Total Tasks</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
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
