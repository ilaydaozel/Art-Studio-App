import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { IArtwork } from "@/app/types";

interface IParams {
    exhibitionId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const { exhibitionId } = params;
    const body = await request.json();
    const { artworkId } = body;

    try {
        const exhibition = await prisma.exhibition.findFirst({
            where: {
                id: exhibitionId,
            },
        });

        if (!exhibition) {
            return NextResponse.json({ error: "Exhibition not found." });
        }

        const updatedArtworkIds = exhibition.artworkIds.filter(id => id !== artworkId);

        const updatedExhibition = await prisma.exhibition.update({
            where: {
                id: exhibitionId,
            },
            data: {
                artworkIds: updatedArtworkIds,
            },
        });

        const artwork = await prisma.artwork.findFirst({
            where: {
                id: artworkId,
            },
        });

        if (!artwork) {
            return NextResponse.json({ error: "Artwork not found." });
        }
        const updatedExhibitionIds = artwork.exhibitionIds.filter(id => id !== exhibitionId);

        await prisma.artwork.update({
            where: {
                id: artworkId,
            },
            data: {
                exhibitionIds: {
                    set: updatedExhibitionIds,
                },
            },
        });

        return NextResponse.json(updatedExhibition);
    } catch (error) {
        console.error("Error updating exhibition:", error);
        return NextResponse.json({ error: "An error occurred while updating the exhibition." });
    }
}

