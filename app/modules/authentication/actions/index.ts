"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"
import { redirect } from "next/navigation";


export const currentUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return null;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            email: true,
            id: true,
            image: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return user;
}

export const requireAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return redirect("/sign-in")
    }
    return session
}

export const requireUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return redirect("/sign-in")
    }
    return null
}

export const requireGuest = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        return redirect("/")
    }
    return null;
}
