import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {

    const body = await request.json();
    const {
        title,
        description,
        startDate,
        endDate,
        organizedBy,
        coverImage,
    } = body;

    const exhibition = await prisma.exhibition.create({
        data: {
            title,
            description,
            startDate,
            endDate,
            organizedBy,
            coverImage,
        }
    });

    return NextResponse.json(exhibition);
}