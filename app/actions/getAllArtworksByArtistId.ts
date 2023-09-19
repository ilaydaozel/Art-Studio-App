import prisma from "../libs/prismadb";
import { IArtwork } from "../types";

interface IParams {
    artistId?: string;
}

export default async function getAllArtworksByArtistId(
    params: IParams
) {
    try {
        const { artistId } = params;
        const allArtworks = await prisma.Artwork.findMany({
            where: {
                artistId: artistId,
            },
            include: {
                artist: true,
                exhibitions: true,
            }
        });

        if (!allArtworks) {
            return null;
        }
        return {
            allArtworks: allArtworks as IArtwork[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
