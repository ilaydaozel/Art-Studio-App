import prisma from "@/app/libs/prismadb";
import { ArtistProfile } from "@prisma/client";

interface IParams {
    artistId?: string;
}

export default async function getArtistProfileById(
    params: IParams
) {
    try {
        const { artistId } = params;
        const artistProfile = await prisma.artistProfile.findUnique({
            where: {
                artistId: artistId,
            },
            include: {
                user: true,
            },
        });

        if (!artistProfile) {
            return null;
        }
        console.log("artistProfile: ", artistProfile);
        return {
            artistProfile: artistProfile as ArtistProfile,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
