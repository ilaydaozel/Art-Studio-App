import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { IArtwork } from "@/app/types";

interface IParams {
    exhibitionId: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { exhibitionId } = params;
    const existingExhibition = await prisma.exhibition.findUnique({
        where: {
            id: exhibitionId,
        },
    });

    if (!existingExhibition) {
        console.log("Exhibition not found!")
        console.log(NextResponse.error());
        return NextResponse.error();
    }

    // Delete the Artwork record
    const deletedExhibition = await prisma.exhibition.delete({
        where: {
            id: exhibitionId,
        },
    });

    return NextResponse.json(deletedExhibition);
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const { exhibitionId } = params;
    const body = await request.json();
    const { selectedArtworks } = body;
    console.log("selectedArtworks: ", selectedArtworks);

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
        const existingArtworkIds = exhibition.artworkIds || [];
        const updatedArtworkIds = [...existingArtworkIds, ...selectedArtworkIds];

        const updatedExhibition = await prisma.exhibition.update({
            where: {
                id: exhibitionId,
            },
            data: {
                artworkIds: updatedArtworkIds,

            },
        });

        selectedArtworks.map(async (artwork: IArtwork) => {
            await prisma.artwork.update({
                where: {
                    id: artwork.id,
                },
                data: {
                    exhibitionIds: {
                        set: [...(artwork.exhibitionIds), exhibitionId],
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
