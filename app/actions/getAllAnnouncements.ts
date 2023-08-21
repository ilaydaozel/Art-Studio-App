import prisma from "@/app/libs/prismadb";
import { IAnnouncement } from "./type";


export default async function getAllAnnouncements() {
    try {
        const announcements = await prisma.announcement.findMany({
            where: {
                isActive: true
            }
        });

        if (!announcements) {
            return null;
        }
        return {
            announcements: announcements as IAnnouncement[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
