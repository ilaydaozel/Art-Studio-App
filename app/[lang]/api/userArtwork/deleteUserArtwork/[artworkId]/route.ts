import { NextResponse } from "next/server";
import prisma from "@/app/[lang]/libs/prismadb";

interface IParams {
    artworkId?: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { artworkId } = params;
    // Check if the UserArtwork record exists
    const existingArtwork = await prisma.userArtwork.findUnique({
        where: {
            id: artworkId,
        },
    });

    if (!existingArtwork) {
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
