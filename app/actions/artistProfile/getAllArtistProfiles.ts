import prisma from "../../lib/prismadb";
import { IArtistProfile } from "../../types";


export default async function getAllArtistProfiles() {
    try {
        const artistProfiles = await prisma.artistProfile.findMany({
            include: {
                user: true
            }
        });
        return {
            artistProfiles: artistProfiles as IArtistProfile[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
