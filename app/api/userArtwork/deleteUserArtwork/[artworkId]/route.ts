import { NextResponse } from "next/server";
import prisma from "@/app/[lang]/libs/prismadb";

interface IParams {
    artworkId?: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { artworkId } = params;
    const existingArtwork = await prisma.userArtwork.findUnique({
        where: {
            id: artworkId,
        },
    });
    console.log("ARTWORK DELETED:", existingArtwork);
    if (!existingArtwork) {
        console.log("Artwork not found!")
        return NextResponse.error();
    }

    // Delete the UserArtwork record
    const deleteUserArtwork = await prisma.userArtwork.delete({
        where: {
            id: artworkId,
        },
    });

    return NextResponse.json(deleteUserArtwork);
}
