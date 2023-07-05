import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        creationYear,
        medium,
        type,
        width,
        height,
        medias,
        exhibitionIds,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const userArtwork = await prisma.userArtwork.create({
        data: {
            artistId: currentUser.id,
            title,
            description,
            creationYear,
            medium,
            type,
            width,
            height,
            medias,
            exhibitionIds,
        }
    });

    return NextResponse.json(userArtwork);
}
