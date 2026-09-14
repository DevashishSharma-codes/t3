"use client";

import React, { useEffect, useState } from "react";
import {
    ChevronsUpDown,
    LogOut,
    User as UserIcon,
    Settings,
    Sparkles,
    Loader2,
    LogIn,
    Sun,
    Moon,
    Laptop,
    Check,
} from "lucide-react";
import { currentUser } from "@/app/modules/authentication/actions";
import { authClient } from "@/lib/auth-client";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type CurrentUserType = Awaited<ReturnType<typeof currentUser>>;

interface UserButtonProps {
    initialUser?: CurrentUserType;
    className?: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

function getInitials(name?: string | null, email?: string | null): string {
    if (name && name.trim().length > 0) {
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    }
    if (email && email.trim().length > 0) {
        return email.slice(0, 2).toUpperCase();
    }
    return "U";
}

export default function UserButton({
    initialUser,
    className,
    side = "top",
    align = "start",
}: UserButtonProps) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState<CurrentUserType>(initialUser ?? null);
    const [isLoading, setIsLoading] = useState<boolean>(initialUser === undefined);
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

    useEffect(() => {
        if (initialUser !== undefined) {
            return;
        }

        let isMounted = true;
        async function getUser() {
            try {
                const data = await currentUser();
                if (isMounted) {
                    setUser(data);
                }
            } catch (err) {
                console.error("Failed to load user:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        getUser();
        return () => {
            isMounted = false;
        };
    }, [initialUser]);

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            await authClient.signOut();
            router.push("/sign-in");
            router.refresh();
        } catch (error) {
            console.error("Sign out failed:", error);
            setIsSigningOut(false);
        }
    };

    // 1. Loading state skeleton
    if (isLoading) {
        return (
            <div
                className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-xl bg-muted/40 animate-pulse border border-transparent select-none",
                    className
                )}
            >
                <div className="size-9 rounded-full bg-muted-foreground/20 shrink-0" />
                <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="h-3.5 bg-muted-foreground/20 rounded-md w-24" />
                    <div className="h-2.5 bg-muted-foreground/15 rounded-md w-32" />
                </div>
            </div>
        );
    }

    // 2. Unauthenticated state
    if (!user) {
        return (
            <a
                href="/sign-in"
                className={cn(
                    "w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm font-medium",
                    "bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs cursor-pointer",
                    className
                )}
            >
                <LogIn className="size-4" />
                <span>Sign in</span>
            </a>
        );
    }

    // 3. Authenticated state with dropdown menu
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    "w-full group flex items-center gap-3 p-2 rounded-xl text-left cursor-pointer",
                    "hover:bg-accent/60 active:scale-[0.99] transition-all duration-150",
                    "border border-transparent hover:border-border/60",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                    className
                )}
            >
                <div className="relative shrink-0">
                    <Avatar className="size-9 border border-border/60 shadow-xs">
                        {user.image && (
                            <AvatarImage src={user.image} alt={user.name ?? "User"} />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs select-none">
                            {getInitials(user.name, user.email)}
                        </AvatarFallback>
                        <AvatarBadge className="bg-emerald-500 ring-card size-2.5" />
                    </Avatar>
                </div>

                <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {user.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                    </p>
                </div>

                <ChevronsUpDown className="size-4 text-muted-foreground/60 shrink-0 group-hover:text-foreground transition-colors ml-auto" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side={side}
                align={align}
                sideOffset={8}
                className="w-64 p-1.5 rounded-xl border border-border/80 bg-popover/95 backdrop-blur-md shadow-xl text-popover-foreground animate-in fade-in-0 zoom-in-95"
            >
                {/* User Header Preview */}
                <div className="px-3 py-2.5 flex items-center gap-3 border-b border-border/50 mb-1">
                    <Avatar className="size-10 border border-border/60 shrink-0">
                        {user.image && (
                            <AvatarImage src={user.image} alt={user.name ?? "User"} />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                            {getInitials(user.name, user.email)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                            {user.name || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                Active
                            </span>
                            <span className="text-[10px] text-muted-foreground">Free Plan</span>
                        </div>
                    </div>
                </div>

                {/* Menu items */}
                <DropdownMenuGroup>
                    <DropdownMenuItem className="gap-2.5 px-2.5 py-2 cursor-pointer rounded-lg hover:bg-muted/70 transition-colors">
                        <UserIcon className="size-4 text-muted-foreground" />
                        <span className="text-sm">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2.5 px-2.5 py-2 cursor-pointer rounded-lg hover:bg-muted/70 transition-colors">
                        <Settings className="size-4 text-muted-foreground" />
                        <span className="text-sm">Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="gap-2.5 px-2.5 py-2 cursor-pointer rounded-lg hover:bg-muted/70 transition-colors">
                            {theme === "dark" ? (
                                <Moon className="size-4 text-muted-foreground" />
                            ) : theme === "light" ? (
                                <Sun className="size-4 text-muted-foreground" />
                            ) : (
                                <Laptop className="size-4 text-muted-foreground" />
                            )}
                            <span className="text-sm">Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-36 p-1 rounded-xl">
                            <DropdownMenuItem
                                className="gap-2 px-2.5 py-1.5 cursor-pointer rounded-lg text-sm"
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="size-4 text-muted-foreground" />
                                <span>Light</span>
                                {theme === "light" && <Check className="size-3.5 ml-auto text-primary" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 px-2.5 py-1.5 cursor-pointer rounded-lg text-sm"
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="size-4 text-muted-foreground" />
                                <span>Dark</span>
                                {theme === "dark" && <Check className="size-3.5 ml-auto text-primary" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 px-2.5 py-1.5 cursor-pointer rounded-lg text-sm"
                                onClick={() => setTheme("system")}
                            >
                                <Laptop className="size-4 text-muted-foreground" />
                                <span>System</span>
                                {theme === "system" && <Check className="size-3.5 ml-auto text-primary" />}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem className="gap-2.5 px-2.5 py-2 cursor-pointer rounded-lg hover:bg-muted/70 transition-colors">
                        <Sparkles className="size-4 text-amber-500" />
                        <span className="text-sm font-medium">Upgrade to Pro</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-1 bg-border/60" />

                {/* Sign out */}
                <DropdownMenuItem
                    variant="destructive"
                    className="gap-2.5 px-2.5 py-2 cursor-pointer rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                >
                    {isSigningOut ? (
                        <Loader2 className="size-4 animate-spin text-destructive" />
                    ) : (
                        <LogOut className="size-4 text-destructive" />
                    )}
                    <span className="text-sm font-medium">
                        {isSigningOut ? "Signing out..." : "Log out"}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}