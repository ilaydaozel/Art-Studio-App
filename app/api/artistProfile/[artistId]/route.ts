import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

interface IParams {
    artistId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

    const { artistId } = params;
    const body = await request.json();
    const { biography, profilePic, coverImage } = body;
    let artistProfile;

    artistProfile = await prisma.artistProfile.findFirst({
        where: {
            artistId: artistId,
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
                coverImage,
            },
        });
    } else {
        return NextResponse.json({ error: "Artist profile not found." });
    }


    return NextResponse.json(artistProfile);
}





