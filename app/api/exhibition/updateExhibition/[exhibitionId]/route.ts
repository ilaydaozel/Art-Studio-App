import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

interface IParams {
    exhibitionId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

    const { exhibitionId } = params;
    const body = await request.json();
    const { description } = body;
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
                description
            },
        });
    } else {
        return NextResponse.json({ error: "Exhibition not found." });
    }


    return NextResponse.json(exhibition);
}





