import { NextResponse } from "next/server";
import prisma from "@/app/[lang]/libs/prismadb";

interface IParams {
    announcementId?: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { announcementId } = params;

    try {
        const deletedAnnouncement = await prisma.announcement.delete({
            where: { id: announcementId },
        });

        return NextResponse.json(deletedAnnouncement);
    } catch (error) {
        return NextResponse.json({ error: "Announcement not found or couldn't be deleted." }, { status: 404 });
    }
}

