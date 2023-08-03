import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

    const { userId } = params;
    const body = await request.json();
    const { biography, profilePic } = body;
    let artistProfile;


    artistProfile = await prisma.artistProfile.findFirst({
        where: {
            artistId: userId,
        },
    });

    if (artistProfile) {
        artistProfile = await prisma.artistProfile.update({
            where: {
                id: artistProfile.id,
            },
            data: {
                biography,
                profilePic,
            },
        });
    } else {
        return NextResponse.json({ error: "Artist profile not found." });
    }


    return NextResponse.json(artistProfile);
}





