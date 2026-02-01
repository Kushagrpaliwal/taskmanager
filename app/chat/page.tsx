"use client";

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
    Search,
    MoreHorizontal,
    Phone,
    Video,
    Paperclip,
    Smile,
    Send,
    Plus,
    MessageSquare,
    ArrowLeft,
} from "lucide-react";

const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const conversations = [
    {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        lastMessage: "I'll send you the updated designs shortly!",
        time: "2 min",
        unread: 2,
        online: true,
        type: "direct",
    },
    {
        id: 2,
        name: "Design Team",
        avatar: null,
        lastMessage: "Emma: Great work on the mockups!",
        time: "15 min",
        unread: 5,
        online: false,
        type: "group",
        members: 4,
    },
    {
        id: 3,
        name: "Michael Ross",
        avatar: "https://i.pravatar.cc/150?img=3",
        lastMessage: "The API integration is complete",
        time: "1 hour",
        unread: 0,
        online: true,
        type: "direct",
    },
];

const messages = [
    {
        id: 1,
        sender: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Hey! I've been working on the new dashboard designs. Can you take a look when you have time?",
        time: "10:30 AM",
        isMe: false,
    },
    {
        id: 2,
        sender: "Me",
        avatar: "",
        content: "Sure, I'd love to see them! Send them over whenever you're ready.",
        time: "10:32 AM",
        isMe: true,
    },
    {
        id: 3,
        sender: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Perfect! I'll share the Figma link in a bit.",
        time: "10:35 AM",
        isMe: false,
    },
];

interface Users {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    created_at: string,
    role: string,
    team: string,
    status: string,
    companycode: string,
    membercode: string
}

export default function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState<Users | null>(null);
    const [messageInput, setMessageInput] = useState("");

    const [users, setUsers] = useState<Users[]>([]);

    const fetchuser = async () => {
        try {

            const res = await fetch("/api/getUsers")
            const data = await res.json();
            setUsers(data.res)

            if (data.ok) {
                console.log("Users Fetched SuccessFully", data.res)
            } else {
                console.log("Unable to fetch the user data")
            }

        } catch (error) {
            console.log("Internal Server error", error)
        }
    }

    useEffect(() => {
        fetchuser();
    }, [])

    return (
        <AppLayout>
            <div className="flex h-[calc(100%+2rem)] md:h-[calc(100%+3rem)] w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] -m-4 md:-m-6 overflow-hidden bg-background">
                {/* Sidebar */}
                <div className={cn(
                    "w-full md:w-80 border-r border-border flex flex-col bg-muted/10",
                    selectedConversation ? "hidden md:flex" : "flex"
                )}>
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Messages
                            </h2>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search conversations..."
                                className="pl-9 h-9 bg-background/50"
                            />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="flex flex-col gap-1 p-2">
                            {users.map((data) => (
                                <button
                                    key={data.id}
                                    onClick={() => setSelectedConversation(data)}
                                    className={cn(
                                        "flex items-center gap-3 px-2 py-3 rounded-md text-left transition-all hover:bg-accent",
                                        selectedConversation?.membercode === data.membercode
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <div className="relative">
                                        <Avatar className="h-8 w-8 border bg-secondary/50">
                                            {/* <AvatarImage src={conversation.avatar || undefined} /> */}
                                            <AvatarFallback className="text-[10px] font-medium text-foreground/80">
                                                {getInitials(data.firstname)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {/* {conversation.online && (
                                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background shadow-sm" />
                                        )} */}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium truncate text-xs text-foreground/90">
                                                {data.firstname}
                                            </span>
                                            <span className="text-[10px] opacity-50 shrink-0 whitespace-nowrap">
                                                {new Date(data.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        {/* <p className="text-[10px] truncate opacity-60 leading-tight mt-0.5">
                                            {data.lastMessage}
                                        </p> */}
                                    </div>
                                    {/* {conversation.unread > 0 && (
                                        <Badge variant="default" className="h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold">
                                            {conversation.unread}
                                        </Badge>
                                    )} */}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className={cn(
                    "flex-1 flex flex-col bg-background h-full overflow-hidden",
                    !selectedConversation ? "hidden md:flex h-full items-center justify-center text-muted-foreground" : "flex",
                )}>
                    {!selectedConversation ? (
                        <div className="flex flex-col items-center gap-4 p-8 text-center max-w-sm">
                            <div className="h-20 w-20 rounded-full bg-accent/30 flex items-center justify-center">
                                <MessageSquare className="w-10 h-10 text-accent-foreground/50" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">No conversation selected</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Choose a conversation from the sidebar to send a message
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden h-8 w-8 -ml-2"
                                        onClick={() => setSelectedConversation(null)}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <Avatar className="h-8 w-8 border bg-secondary/50">
                                        {/* <AvatarImage src={selectedConversation.avatar || undefined} /> */}
                                        <AvatarFallback className="text-xs font-medium">
                                            {getInitials(selectedConversation.firstname + " " + selectedConversation.lastname)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm">{selectedConversation.firstname} {selectedConversation.lastname}</p>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                                            {selectedConversation.status === 'Active' && (
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                            )}
                                            {selectedConversation.status || "Offline"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                    <Separator orientation="vertical" className="h-6 mx-1" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            "flex gap-3 max-w-[85%] md:max-w-[75%]",
                                            message.isMe ? "ml-auto flex-row-reverse" : "mr-auto"
                                        )}
                                    >
                                        {!message.isMe && (
                                            <Avatar className="h-7 w-7 mt-1 border bg-secondary/50">
                                                {/* <AvatarImage src={message.avatar} /> */}
                                                <AvatarFallback className="text-[9px] font-medium">{getInitials(message.sender)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn("group flex flex-col gap-1", message.isMe && "items-end")}>
                                            <div
                                                className={cn(
                                                    "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                                                    message.isMe
                                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                                        : "bg-muted text-foreground rounded-bl-sm"
                                                )}
                                            >
                                                {message.content}
                                            </div>
                                            <div className="flex items-center gap-2 px-1">
                                                <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {message.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-border bg-background">
                                <div className="w-full flex items-end gap-2 bg-muted/40 p-2 rounded-xl border focus-within:ring-1 focus-within:ring-ring transition-all">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0 rounded-lg">
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                    <textarea
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-32 min-h-[36px] py-2 text-sm leading-relaxed"
                                        rows={1}
                                        style={{ height: 'auto', minHeight: '36px' }}
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto';
                                            target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                                        }}
                                    />
                                    <div className="flex items-center gap-1 shrink-0 pb-1">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg">
                                            <Smile className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" className="h-8 w-8 rounded-lg">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
