import prisma from "../libs/prismadb";
import { IArtistProfile } from "./type";

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
