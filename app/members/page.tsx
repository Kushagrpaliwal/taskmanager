"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    Edit,
    Trash2,
    UserPlus,
    Users,
    Shield,
    Star,
} from "lucide-react";

const members = [
    {
        id: 1,
        name: "Sarah Chen",
        email: "sarah.chen@acme.com",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "Admin",
        team: "Design Team",
        status: "active",
        tasksCompleted: 156,
        joinedDate: "Jan 2024",
    },
    {
        id: 2,
        name: "Michael Ross",
        email: "michael.ross@acme.com",
        avatar: "https://i.pravatar.cc/150?img=3",
        role: "Member",
        team: "Engineering",
        status: "active",
        tasksCompleted: 234,
        joinedDate: "Feb 2024",
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma.wilson@acme.com",
        avatar: "https://i.pravatar.cc/150?img=5",
        role: "Admin",
        team: "Product",
        status: "active",
        tasksCompleted: 89,
        joinedDate: "Mar 2024",
    },
    {
        id: 4,
        name: "James Miller",
        email: "james.miller@acme.com",
        avatar: "https://i.pravatar.cc/150?img=8",
        role: "Member",
        team: "Engineering",
        status: "away",
        tasksCompleted: 178,
        joinedDate: "Jan 2024",
    },
    {
        id: 5,
        name: "Lisa Park",
        email: "lisa.park@acme.com",
        avatar: "https://i.pravatar.cc/150?img=10",
        role: "Guest",
        team: "Design Team",
        status: "active",
        tasksCompleted: 45,
        joinedDate: "Apr 2024",
    },
    {
        id: 6,
        name: "David Kim",
        email: "david.kim@acme.com",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "Member",
        team: "Engineering",
        status: "offline",
        tasksCompleted: 123,
        joinedDate: "Feb 2024",
    },
    {
        id: 7,
        name: "Rachel Green",
        email: "rachel.green@acme.com",
        avatar: "https://i.pravatar.cc/150?img=25",
        role: "Member",
        team: "Marketing",
        status: "active",
        tasksCompleted: 67,
        joinedDate: "Mar 2024",
    },
    {
        id: 8,
        name: "Alex Turner",
        email: "alex.turner@acme.com",
        avatar: "https://i.pravatar.cc/150?img=15",
        role: "Admin",
        team: "DevOps",
        status: "active",
        tasksCompleted: 201,
        joinedDate: "Jan 2024",
    },
];

const roleColors = {
    Admin: "bg-violet-100 text-violet-700 hover:bg-violet-200",
    Member: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Guest: "bg-slate-100 text-slate-700 hover:bg-slate-200",
};

const statusColors = {
    active: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-slate-300",
};

export default function MembersPage() {
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    const toggleMember = (id: number) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        setSelectedMembers((prev) =>
            prev.length === members.length ? [] : members.map((m) => m.id)
        );
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
                        <p className="text-muted-foreground">
                            Manage your team members and their roles
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search members..."
                                className="pl-10 w-64 rounded-xl bg-accent/50 border-0"
                            />
                        </div>
                        <Select>
                            <SelectTrigger className="w-36 rounded-xl bg-accent/50 border-0">
                                <SelectValue placeholder="All roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="guest">Guest</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Invite Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Invite Team Member</DialogTitle>
                                    <DialogDescription>
                                        Send an invitation to join your workspace
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="colleague@company.com"
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Role</Label>
                                        <Select>
                                            <SelectTrigger className="rounded-xl">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="w-4 h-4" />
                                                        Admin - Full access
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="member">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4" />
                                                        Member - Standard access
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="guest">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-4 h-4" />
                                                        Guest - Limited access
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Team</Label>
                                        <Select>
                                            <SelectTrigger className="rounded-xl">
                                                <SelectValue placeholder="Select a team" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="design">Design Team</SelectItem>
                                                <SelectItem value="engineering">Engineering</SelectItem>
                                                <SelectItem value="product">Product</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="devops">DevOps</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsInviteOpen(false)} className="rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button className="rounded-xl bg-gradient-to-r from-primary to-purple-600">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Invitation
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Members</p>
                                    <p className="text-2xl font-bold">{members.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Admins</p>
                                    <p className="text-2xl font-bold">{members.filter((m) => m.role === "Admin").length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-white rounded-full" />
                                        <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Now</p>
                                    <p className="text-2xl font-bold">{members.filter((m) => m.status === "active").length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                                    <p className="text-2xl font-bold">{members.reduce((acc, m) => acc + m.tasksCompleted, 0)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Members Table */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle>All Members</CardTitle>
                            {selectedMembers.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedMembers.length} selected
                                    </span>
                                    <Button variant="outline" size="sm" className="rounded-lg text-destructive">
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedMembers.length === members.length}
                                            onCheckedChange={toggleAll}
                                            className="rounded"
                                        />
                                    </TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tasks</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id} className="group">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedMembers.includes(member.id)}
                                                onCheckedChange={() => toggleMember(member.id)}
                                                className="rounded"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10 border-2 border-background">
                                                        <AvatarImage src={member.avatar} />
                                                        <AvatarFallback className="bg-primary/10 text-primary">
                                                            {member.name.split(" ").map((n) => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${statusColors[member.status as keyof typeof statusColors]
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`rounded-full ${roleColors[member.role as keyof typeof roleColors]}`}
                                            >
                                                {member.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">{member.team}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${statusColors[member.status as keyof typeof statusColors]
                                                        }`}
                                                />
                                                <span className="text-sm capitalize">{member.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{member.tasksCompleted}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">{member.joinedDate}</span>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit Member
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Message
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
