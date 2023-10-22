import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

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
        return NextResponse.json({ error: "There is no such exhibition" });
    }

    // Delete the Artwork record
    const deletedExhibition = await prisma.exhibition.delete({
        where: {
            id: exhibitionId,
        },
    });

    return NextResponse.json(deletedExhibition);
}

