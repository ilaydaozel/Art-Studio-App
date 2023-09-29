import getArtistProfileById from "@/app/actions/artistProfile/getArtistProfileById";
import { IUser } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";


interface IParams {
    artistId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const { artistId } = params;
    const existingArtistProfile = await prisma.artistProfile.findUnique({
        where: {
            artistId: artistId,
        }
    });

    if (!existingArtistProfile) {
        return NextResponse.json({ error: "nonExistingArtistProfileError", status: "400" });
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
        artworkMedias,
        exhibitionIds,
    } = body;

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
            artworkMedias,
            exhibitionIds,
            artistId: artistId,
        }
    });

    return NextResponse.json(artwork);
}