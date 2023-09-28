import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

interface IParams {
    exhibitionId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

    const { exhibitionId } = params;
    const body = await request.json();
    const { selectedArtworks } = body;
    console.log("selectedArtworks: ", selectedArtworks);
    let exhibition;

    exhibition = await prisma.exhibition.findFirst({
        where: {
            id: exhibitionId,
        },
    });

    if (exhibition) {
        exhibition = await prisma.exhibition.update({
            where: {
                id: exhibitionId,
            },
            data: {
                artworks: selectedArtworks
            },
        });
    } else {
        return NextResponse.json({ error: "exhibition not found." });
    }


    return NextResponse.json(exhibition);
}





