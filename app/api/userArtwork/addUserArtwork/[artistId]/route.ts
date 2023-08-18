import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getArtistProfileById from "@/app/actions/getArtistProfileById";
import { IUser } from "@/app/actions/type";


interface IParams {
    artistId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentProfile = await getArtistProfileById(params);

    if (!currentProfile) {
        return NextResponse.error();
    }

    const user: IUser = currentProfile.artistProfile.user;

    if (user.userType != "artist") {
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
        mediaLink,
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
            artworkMedias: mediaLink[0],
        }
    });

    return NextResponse.json(userArtwork);
}
