import prisma from "../../lib/prismadb";
import { IArtistProfile } from "../../types";

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
        return {
            artistProfile: artistProfile as IArtistProfile,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
