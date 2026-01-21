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
    Plus,
    MessageSquare,
    ArrowLeft,
} from "lucide-react";

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

export default function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState<typeof conversations[0] | null>(null);
    const [messageInput, setMessageInput] = useState("");

    // Mobile: if selectedConversation is null, show list. Else show chat.
    // Desktop: Show both side-by-side.

    return (
        <AppLayout>
            <div className="flex h-[calc(100vh-2rem)] border-t border-border mt-2">
                {/* Sidebar */}
                <div className={cn(
                    "w-full md:w-80 border-r border-border flex flex-col bg-background",
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
                                placeholder="Search..."
                                className="pl-9 h-9 rounded-sm bg-secondary/50 border-0 focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {conversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => setSelectedConversation(conversation)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-sm text-left transition-colors",
                                        selectedConversation?.id === conversation.id
                                            ? "bg-secondary"
                                            : "hover:bg-secondary/50"
                                    )}
                                >
                                    <div className="relative">
                                        <Avatar className="h-10 w-10 border border-border">
                                            <AvatarImage src={conversation.avatar || undefined} />
                                            <AvatarFallback className="bg-background text-xs">
                                                {conversation.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        {conversation.online && (
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm truncate">{conversation.name}</p>
                                            <span className="text-[10px] text-muted-foreground">{conversation.time}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className={cn(
                    "flex-1 flex flex-col bg-background",
                    !selectedConversation ? "hidden md:flex h-full items-center justify-center text-muted-foreground" : "flex",
                )}>
                    {!selectedConversation ? (
                        <div className="hidden md:flex flex-col items-center gap-2">
                            <MessageSquare className="w-12 h-12 opacity-20" />
                            <p>Select a conversation to start messaging</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6">
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden h-8 w-8 -ml-2"
                                        onClick={() => setSelectedConversation(null)}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <Avatar className="h-8 w-8 border border-border">
                                        <AvatarImage src={selectedConversation.avatar || undefined} />
                                        <AvatarFallback className="bg-secondary text-xs">
                                            {selectedConversation.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm">{selectedConversation.name}</p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {selectedConversation.online ? "Online" : "Offline"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-6 w-full max-w-full">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={cn(
                                                "flex gap-3",
                                                message.isMe && "flex-row-reverse"
                                            )}
                                        >
                                            {!message.isMe && (
                                                <Avatar className="h-8 w-8 mt-1 border border-border">
                                                    <AvatarImage src={message.avatar} />
                                                    <AvatarFallback className="text-[10px]">{message.sender[0]}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn("max-w-[70%]", message.isMe && "items-end")}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-medium text-foreground">{message.sender}</span>
                                                    <span className="text-[10px] text-muted-foreground">{message.time}</span>
                                                </div>
                                                <div
                                                    className={cn(
                                                        "rounded-sm px-4 py-2 border text-sm",
                                                        message.isMe
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-card border-border"
                                                    )}
                                                >
                                                    <p>{message.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* Input */}
                            <div className="p-4 border-t border-border">
                                <div className="w-full flex items-center gap-2 bg-secondary/30 p-2 rounded-sm border border-border">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        className="flex-1 bg-transparent border-0 focus-visible:ring-0 h-9"
                                    />
                                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-transparent">
                                        <Smile className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" className="h-8 px-3 rounded-sm">
                                        <Send className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
