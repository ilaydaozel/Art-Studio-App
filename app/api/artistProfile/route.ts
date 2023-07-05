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
    //check if it is artist
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        biography,
        links,
        profilePic,
        artworks,
    } = body;

    const artistProfile = await prisma.artistProfile.create({
        data: {
            biography,
            links,
            profilePic,
            artworks,
            artistId: currentUser.id,
        }
    });

    return NextResponse.json(artistProfile);
}
