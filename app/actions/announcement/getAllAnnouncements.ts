import prisma from "../../lib/prismadb";
import { IAnnouncement } from "../../types";


export default async function getAllAnnouncements() {
    try {
        const announcements = await prisma.announcement.findMany({
            where: {
                isActive: true
            }
        });
        return {
            announcements: announcements as IAnnouncement[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
