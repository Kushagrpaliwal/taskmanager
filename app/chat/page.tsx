"use client";

import { useState } from "react";
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
    Image,
    File,
    Check,
    CheckCheck,
    Plus,
} from "lucide-react";

const conversations = [
    {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        lastMessage: "I&apos;ll send you the updated designs shortly!",
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
    {
        id: 4,
        name: "Engineering",
        avatar: null,
        lastMessage: "James: Deployed to staging",
        time: "2 hours",
        unread: 0,
        online: false,
        type: "group",
        members: 6,
    },
    {
        id: 5,
        name: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?img=5",
        lastMessage: "Can we schedule a quick call?",
        time: "3 hours",
        unread: 0,
        online: false,
        type: "direct",
    },
    {
        id: 6,
        name: "Product Strategy",
        avatar: null,
        lastMessage: "You: I&apos;ll prepare the roadmap",
        time: "Yesterday",
        unread: 0,
        online: false,
        type: "group",
        members: 3,
    },
];

const messages = [
    {
        id: 1,
        sender: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Hey! I&apos;ve been working on the new dashboard designs. Can you take a look when you have time?",
        time: "10:30 AM",
        isMe: false,
        status: "read",
    },
    {
        id: 2,
        sender: "Me",
        avatar: "",
        content: "Sure, I&apos;d love to see them! Send them over whenever you&apos;re ready.",
        time: "10:32 AM",
        isMe: true,
        status: "read",
    },
    {
        id: 3,
        sender: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Perfect! I&apos;ll share the Figma link in a bit. I&apos;ve made some significant changes to the analytics section based on the feedback from last week.",
        time: "10:35 AM",
        isMe: false,
        status: "read",
    },
    {
        id: 4,
        sender: "Me",
        avatar: "",
        content: "Sounds great! I remember we discussed adding more visualization options. Did you include those?",
        time: "10:38 AM",
        isMe: true,
        status: "read",
    },
    {
        id: 5,
        sender: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Yes! I added three new chart types and a customizable widget system. The team can now create their own dashboard layouts too.",
        time: "10:42 AM",
        isMe: false,
        status: "read",
    },
    {
        id: 6,
        sender: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "I&apos;ll send you the updated designs shortly!",
        time: "10:45 AM",
        isMe: false,
        status: "delivered",
    },
];

export default function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [messageInput, setMessageInput] = useState("");

    return (
        <AppLayout>
            <div className="flex h-[calc(100vh-8rem)] gap-6">
                {/* Conversations List */}
                <div className="w-80 flex flex-col bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Messages</h2>
                            <Button size="icon" variant="ghost" className="rounded-xl h-9 w-9">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search conversations..."
                                className="pl-10 rounded-xl bg-accent/50 border-0"
                            />
                        </div>
                    </div>

                    {/* Conversations */}
                    <ScrollArea className="flex-1">
                        <div className="p-2">
                            {conversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => setSelectedConversation(conversation)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                                        selectedConversation.id === conversation.id
                                            ? "bg-primary/10"
                                            : "hover:bg-accent/50"
                                    )}
                                >
                                    <div className="relative">
                                        {conversation.type === "direct" ? (
                                            <Avatar className="h-12 w-12 border-2 border-background">
                                                <AvatarImage src={conversation.avatar || undefined} />
                                                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                                                    {conversation.name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                                {conversation.members}
                                            </div>
                                        )}
                                        {conversation.online && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium truncate">{conversation.name}</p>
                                            <span className="text-xs text-muted-foreground">{conversation.time}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                    {conversation.unread > 0 && (
                                        <Badge className="bg-primary text-primary-foreground rounded-full h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                                            {conversation.unread}
                                        </Badge>
                                    )}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={selectedConversation.avatar || undefined} />
                                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                                    {selectedConversation.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{selectedConversation.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {selectedConversation.online ? (
                                        <span className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            Online
                                        </span>
                                    ) : (
                                        "Last seen 2 hours ago"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <Video className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {/* Date Separator */}
                            <div className="flex items-center gap-4">
                                <Separator className="flex-1" />
                                <span className="text-xs text-muted-foreground px-2">Today</span>
                                <Separator className="flex-1" />
                            </div>

                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3",
                                        message.isMe && "flex-row-reverse"
                                    )}
                                >
                                    {!message.isMe && (
                                        <Avatar className="h-8 w-8 mt-1">
                                            <AvatarImage src={message.avatar} />
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                {message.sender.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-[70%]", message.isMe && "items-end")}>
                                        <div
                                            className={cn(
                                                "rounded-2xl px-4 py-2.5",
                                                message.isMe
                                                    ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-br-md"
                                                    : "bg-accent/50 rounded-bl-md"
                                            )}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                        </div>
                                        <div className={cn("flex items-center gap-1 mt-1", message.isMe && "justify-end")}>
                                            <span className="text-[10px] text-muted-foreground">{message.time}</span>
                                            {message.isMe && (
                                                message.status === "read" ? (
                                                    <CheckCheck className="h-3 w-3 text-blue-500" />
                                                ) : (
                                                    <Check className="h-3 w-3 text-muted-foreground" />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
                                <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
                                <Image className="h-4 w-4" />
                            </Button>
                            <div className="relative flex-1">
                                <Input
                                    placeholder="Type a message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className="pr-10 rounded-xl bg-accent/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
                                />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg">
                                    <Smile className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button size="icon" className="rounded-xl shrink-0 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
