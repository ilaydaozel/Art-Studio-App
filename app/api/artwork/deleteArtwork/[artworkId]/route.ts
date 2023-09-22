import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

interface IParams {
    artworkId?: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { artworkId } = params;
    const existingArtwork = await prisma.artwork.findUnique({
        where: {
            id: artworkId,
        },
    });
    console.log("ARTWORK DELETED:", existingArtwork);
    if (!existingArtwork) {
        console.log("Artwork not found!")
        return NextResponse.error();
    }

    // Delete the Artwork record
    const deleteArtwork = await prisma.artwork.delete({
        where: {
            id: artworkId,
        },
    });

    return NextResponse.json(deleteArtwork);
}
