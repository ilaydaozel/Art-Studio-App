import { NextResponse } from "next/server";
import prisma from "@/app/[lang]/libs/prismadb";

interface IParams {
    userId?: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { userId } = params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return NextResponse.json({ error: "User not found or couldn't be deleted." }, { status: 404 });
    }
}

