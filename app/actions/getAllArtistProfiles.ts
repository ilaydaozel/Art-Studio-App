import prisma from "@/app/libs/prismadb";
import { ArtistProfile } from "@prisma/client";


export default async function getArtistProfileById() {
    try {
        const artistProfile = await prisma.artistProfile.findMany({
            include: {
                user: true
            }
        });

        if (!artistProfile) {
            return null;
        }
        console.log("artistProfile: ", artistProfile);
        return {
            artistProfile: artistProfile as ArtistProfile[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
