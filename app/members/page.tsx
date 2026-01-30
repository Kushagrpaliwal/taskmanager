"use client";

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    Plus,
    Search,
    MoreHorizontal,
    Mail,
    Filter,
    Users,
    Loader2,
    Trash2,
    Pencil,
} from "lucide-react";
import { toast } from "sonner";
export default function MembersPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "Employee",
    });

    interface User {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
        role: string,
        team: string,
        status: string,
        created_at: Date,
    }

    const [users, setUsers] = useState<User[]>([])

    const fetchusers = async (): Promise<void> => {
        try {

            const res = await fetch("/api/getUsers");
            const data = await res.json();
            setUsers(data.res || [])
            console.log("Fetched users", data.res)

        } catch (error) {
            console.log("Users Unable To Fetch")
        }
    }

    useEffect(() => {
        fetchusers();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "Employee",
        });
    };

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Password validation
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call - replace with actual API call
            await fetch("/api/addMembers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    role: formData.role,
                    password: formData.password,
                }),
            });

            // Success
            toast.success("Member added successfully!", {
                description: `${formData.firstName} ${formData.lastName} has been added to the team.`,
            });
            resetForm();
            setIsAddModalOpen(false);
        } catch (error) {
            toast.error("Failed to add member", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (member: any) => {

        setIsEditModalOpen(true);
    };

    const handleUpdateMember = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Updating member:", { id: editingMember.id, ...formData });
            toast.success("Member updated successfully!", {
                description: `${formData.firstName} ${formData.lastName} has been updated.`,
            });
            setIsEditModalOpen(false);
            setEditingMember(null);
            resetForm();
        } catch (error) {
            toast.error("Failed to update member");
        } finally {
            setIsLoading(false);
        }
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
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="h-8 rounded-sm bg-primary text-primary-foreground text-xs font-medium shadow-none">
                                    <Plus className="w-3.5 h-3.5 mr-2" />
                                    Add
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Member</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details below to add a new team member.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddMember} className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                                className="h-9"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                                className="h-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={formData.role}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                                        >
                                            <SelectTrigger id="role" className="h-9">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Team Lead">Team Lead</SelectItem>
                                                <SelectItem value="Manager">Manager</SelectItem>
                                                <SelectItem value="Employee">Employee</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            className="h-9"
                                        />
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                resetForm();
                                                setIsAddModalOpen(false);
                                            }}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Adding...
                                                </>
                                            ) : (
                                                "Add Member"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Members List */}
                <div className="border border-border rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-secondary/30">
                                <TableRow className="hover:bg-transparent border-border">
                                    {/* <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedMembers.length === members.length}
                                            onCheckedChange={toggleAll}
                                            className="rounded-sm border-muted-foreground"
                                        />
                                    </TableHead> */}
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Member</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Role</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Team</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Status</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Joined</TableHead>
                                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((member) => (
                                        <TableRow key={member.id} className="group hover:bg-secondary/20 border-border">
                                            {/* <TableCell>
                                            <Checkbox
                                                checked={selectedMembers.includes(member.id)}
                                                onCheckedChange={() => toggleMember(member.id)}
                                                className="rounded-sm border-muted-foreground"
                                            />
                                        </TableCell> */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {/* <Avatar className="h-8 w-8 border border-border rounded-sm">
                                                    <AvatarImage src={member.avatar} />
                                                    <AvatarFallback className="text-[10px]">{member.name[0]}</AvatarFallback>
                                                </Avatar> */}
                                                    <div>
                                                        <p className="font-medium text-sm text-foreground whitespace-nowrap">{member.firstname} {member.lastname}</p>
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
                                                <span className="text-sm text-muted-foreground whitespace-nowrap">{(new Date(member.created_at)).toLocaleDateString()}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                                                        onClick={() => handleEditClick(member)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                                            No members found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                {/* Edit Member Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Member</DialogTitle>
                            <DialogDescription>
                                Update the member's details.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdateMember} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-firstName">First Name</Label>
                                    <Input
                                        id="edit-firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-lastName">Last Name</Label>
                                    <Input
                                        id="edit-lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="h-9"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                    id="edit-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="h-9"
                                />
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="edit-role">Role</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                                >
                                    <SelectTrigger id="edit-role" className="h-9">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Team Lead">Team Lead</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                        <SelectItem value="Employee">Employee</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}
                            <DialogFooter className="pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditingMember(null);
                                        resetForm();
                                    }}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
