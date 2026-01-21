"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    Plus,
    Search,
    MoreHorizontal,
    Mail,
    Filter,
    Users,
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
        joinedDate: "Mar 2024",
    },
];

export default function MembersPage() {
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

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
            <div className="space-y-6 w-full">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Members</h1>
                            <p className="text-muted-foreground text-sm">Team directory and roles</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search members..."
                                className="pl-9 w-64 h-8 rounded-sm bg-background border-border focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-sm text-xs font-normal">
                            <Filter className="w-3.5 h-3.5 mr-2" />
                            Filter
                        </Button>
                        <Button size="sm" className="h-8 rounded-sm bg-primary text-primary-foreground text-xs font-medium shadow-none">
                            <Plus className="w-3.5 h-3.5 mr-2" />
                            Invite
                        </Button>
                    </div>
                </div>

                {/* Members List */}
                <div className="border border-border rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-secondary/30">
                                <TableRow className="hover:bg-transparent border-border">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedMembers.length === members.length}
                                            onCheckedChange={toggleAll}
                                            className="rounded-sm border-muted-foreground"
                                        />
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Member</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Role</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Team</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Status</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Joined</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id} className="group hover:bg-secondary/20 border-border">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedMembers.includes(member.id)}
                                                onCheckedChange={() => toggleMember(member.id)}
                                                className="rounded-sm border-muted-foreground"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 border border-border rounded-sm">
                                                    <AvatarImage src={member.avatar} />
                                                    <AvatarFallback className="text-[10px]">{member.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm text-foreground whitespace-nowrap">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground whitespace-nowrap">{member.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className="rounded-sm font-normal text-xs"
                                            >
                                                {member.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground whitespace-nowrap">{member.team}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                <span className="text-sm text-foreground capitalize">{member.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground whitespace-nowrap">{member.joinedDate}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
