import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

interface IParams {
    artworkId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

    const { artworkId } = params;
    const body = await request.json();
    const { selectedExhibition } = body;
    let artwork;

    artwork = await prisma.artwork.findFirst({
        where: {
            id: artworkId,
        },
    });

    if (artwork) {
        artwork = await prisma.artwork.update({
            where: {
                id: artworkId,
            },
            data: {
                exhibitions: selectedExhibition
            },
        });
    } else {
        return NextResponse.json({ error: "exhibition not found." });
    }


    return NextResponse.json(artwork);
}





