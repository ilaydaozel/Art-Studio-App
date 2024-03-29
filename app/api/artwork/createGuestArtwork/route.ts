import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
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
        }
    });

    return NextResponse.json(artwork);
}