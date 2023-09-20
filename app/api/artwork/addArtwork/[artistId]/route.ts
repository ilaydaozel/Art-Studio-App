import getArtistProfileById from "@/app/actions/getArtistProfileById";
import { IUser } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


interface IParams {
    artistId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentProfile = await getArtistProfileById(params);

    if (!currentProfile) {
        return NextResponse.error();
    }

    const user: IUser | undefined = currentProfile.artistProfile.user;

    if (user === undefined) {
        return NextResponse.error();
    }

    if (user.userType != "artist") {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        artistName,
        artistSurname,
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

    const artwork = await prisma.artwork.create({
        data: {
            title,
            artistName,
            artistSurname,
            description,
            creationYear,
            medium,
            type,
            width,
            height,
            artworkMedias: mediaLink[0],
            artistId: user.id,
        }
    });

    return NextResponse.json(artwork);
}