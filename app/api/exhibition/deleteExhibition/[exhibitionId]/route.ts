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

