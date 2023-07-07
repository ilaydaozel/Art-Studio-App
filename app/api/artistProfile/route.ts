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
    //check if it is artist
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        biography,
        profilePic,
        artworks,
    } = body;
    const user: User = currentUser.currentUser;

    const artistProfile = await prisma.artistProfile.create({
        data: {
            biography,
            profilePic,
            artworks,
            artistId: user.id,
        }
    });

    return NextResponse.json(artistProfile);
}
