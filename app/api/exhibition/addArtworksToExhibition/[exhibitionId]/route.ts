import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { IArtwork } from "@/app/types";

interface IParams {
    exhibitionId: string;
}


export async function POST(request: Request, { params }: { params: IParams }) {
    const { exhibitionId } = params;
    const body = await request.json();
    const { selectedArtworks } = body;

    try {
        const selectedArtworkIds = selectedArtworks.map((artwork: IArtwork) => artwork.id);

        const exhibition = await prisma.exhibition.findFirst({
            where: {
                id: exhibitionId,
            },
        });

        if (!exhibition) {
            return NextResponse.json({ error: "Exhibition not found." });
        }

        const newArtworkIds = selectedArtworkIds.filter(
            (artworkId: string) => !exhibition.artworkIds.includes(artworkId)
        );

        if (newArtworkIds.length === 0) {
            return NextResponse.json({ error: "Selected artworks are already in the exhibition." });
        }

        const updatedExhibition = await prisma.exhibition.update({
            where: {
                id: exhibitionId,
            },
            data: {
                artworkIds: { set: [...(exhibition.artworkIds), ...newArtworkIds], },
            },
        });

        newArtworkIds.map(async (artworkId: string) => {
            await prisma.artwork.update({
                where: {
                    id: artworkId,
                },
                data: {
                    exhibitionIds: {
                        push: exhibitionId,
                    },
                },
            });
        }
        );

        return NextResponse.json(updatedExhibition);
    } catch (error) {
        console.error("Error updating exhibition:", error);
        return NextResponse.json({ error: "An error occurred while updating the exhibition." });
    }
}
