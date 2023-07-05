import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        mediaUrl,
        artworkId,
    } = body;

    //check if all values are here
    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const artworkMedia = await prisma.artworkMedia.create({
        data: {
            mediaUrl,
            artworkId,
        }
    });

    return NextResponse.json(artworkMedia);
}
