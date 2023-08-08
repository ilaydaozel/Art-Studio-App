import prisma from "@/app/libs/prismadb";
import { IArtistProfile } from "./type";


export default async function getAllArtistProfiles() {
    try {
        const artistProfiles = await prisma.artistProfile.findMany({
            include: {
                user: true
            }
        });

        if (!artistProfiles) {
            return null;
        }
        return {
            artistProfiles: artistProfiles as IArtistProfile[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
