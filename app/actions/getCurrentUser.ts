import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { User } from "@prisma/client";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<{ currentUser: User } | null> {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });

        if (!currentUser) {
            return null;
        }
        console.log("current User getUser: ", currentUser);
        return {
            currentUser: currentUser as User,
        }
    } catch (error: any) {
        return null;
    }
}

