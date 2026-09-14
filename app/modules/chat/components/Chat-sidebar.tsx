"use client";

import React, { useState, useMemo } from "react";
import {
    MessageSquare,
    Plus,
    Search,
    X,
    BotMessageSquare,
} from "lucide-react";
import UserButton from "@/app/modules/authentication/components/user-button";
import type { currentUser } from "@/app/modules/authentication/actions";

type CurrentUserType = Awaited<ReturnType<typeof currentUser>>;

interface ChatSidebarProps {
    user?: CurrentUserType;
}

const INITIAL_CHATS = [
    { id: "1", title: "Project Planning & Ideas", time: "10m ago" },
    { id: "2", title: "Next.js App Router Architecture", time: "2h ago" },
    { id: "3", title: "Authentication Flow", time: "Yesterday" },
    { id: "4", title: "Database Schema Design", time: "2 days ago" },
];

export default function ChatSidebar({ user }: ChatSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeChatId, setActiveChatId] = useState("1");

    const filteredChats = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return INITIAL_CHATS;
        return INITIAL_CHATS.filter((chat) =>
            chat.title.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <aside className="w-64 h-full border-r border-border bg-card flex flex-col select-none">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <BotMessageSquare className="w-5 h-5" />
                    </div>
                    <span className="tracking-tight text-base font-semibold">Chats</span>
                </div>
                <button
                    type="button"
                    className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
                    title="New Chat"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Search Bar with State */}
            <div className="p-3 pb-2">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search chats..."
                        className="w-full pl-9 pr-8 py-1.5 text-sm bg-muted/50 border border-border rounded-lg outline-none focus:border-primary focus:bg-background transition-all text-foreground placeholder:text-muted-foreground shadow-2xs"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            title="Clear search"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                <div className="flex items-center justify-between px-2 py-1">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {searchQuery ? `Results (${filteredChats.length})` : "Recent"}
                    </p>
                </div>

                {filteredChats.length === 0 ? (
                    <div className="text-center py-8 px-2">
                        <Search className="w-7 h-7 mx-auto text-muted-foreground/40 mb-2" />
                        <p className="text-xs font-medium text-muted-foreground">No chats found</p>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                            No conversations match &ldquo;{searchQuery}&rdquo;
                        </p>
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="mt-2 text-xs text-primary hover:underline cursor-pointer"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    filteredChats.map((chat) => {
                        const isActive = activeChatId === chat.id;
                        return (
                            <button
                                key={chat.id}
                                type="button"
                                onClick={() => setActiveChatId(chat.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition-all cursor-pointer group ${
                                    isActive
                                        ? "bg-accent text-accent-foreground font-medium shadow-2xs"
                                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                                }`}
                            >
                                <MessageSquare
                                    className={`w-4 h-4 shrink-0 transition-colors ${
                                        isActive ? "text-primary" : "opacity-70 group-hover:opacity-100"
                                    }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="truncate">{chat.title}</p>
                                    <span className="text-[11px] text-muted-foreground block">
                                        {chat.time}
                                    </span>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>

            {/* Footer - Appealing User Button on the side */}
            <div className="p-2.5 border-t border-border mt-auto bg-card/60 backdrop-blur-xs">
                <UserButton initialUser={user} side="top" align="start" />
            </div>
        </aside>
    );
}

