import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {


    const body = await request.json();
    const {
        caption,
        subcaption,
        smallCaption,
        link,
        coverImage,
        isActive,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const announcement = await prisma.announcement.create({
        data: {
            caption,
            subcaption,
            smallCaption,
            link,
            coverImage,
            isActive,
        }
    });

    return NextResponse.json(announcement);
}
