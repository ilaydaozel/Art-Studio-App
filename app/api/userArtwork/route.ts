import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    const user: User = currentUser.currentUser;

    const body = await request.json();
    const {
        title,
        description,
        creationYear,
        medium,
        type,
        width,
        height,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const userArtwork = await prisma.userArtwork.create({
        data: {
            artistId: user.id,
            title,
            description,
            creationYear,
            medium,
            type,
            width,
            height,
        }
    });

    return NextResponse.json(userArtwork);
}
