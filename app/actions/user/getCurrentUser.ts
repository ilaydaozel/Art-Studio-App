import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../../libs/prismadb";
import { IUser } from "../../types";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<{ currentUser: IUser } | null> {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!currentUser) {
            return null;
        }
        return {
            currentUser: currentUser as IUser,
        }
    } catch (error: any) {
        return null;
    }
}

