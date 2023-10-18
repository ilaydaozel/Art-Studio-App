import prisma from "../../lib/prismadb";
import { IArtistProfile } from "../../types";


export default async function getAllArtistProfiles() {
    try {
        const artistProfiles = await prisma.artistProfile.findMany({
            include: {
                user: true,
                artworks: true,
            }
        });
        return {
            artistProfiles: artistProfiles as unknown as IArtistProfile[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
