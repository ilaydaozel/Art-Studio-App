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
    if (!existingArtwork) {
        console.log("Artwork not found!")
        console.log(NextResponse.error());
        return NextResponse.error();
    }

    // Delete the Artwork record
    const deletedArtwork = await prisma.artwork.delete({
        where: {
            id: artworkId,
        },
    });

    return NextResponse.json(deletedArtwork);
}
