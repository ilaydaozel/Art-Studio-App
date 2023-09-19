import prisma from "../libs/prismadb";
import { IArtistProfile, IArtwork } from "../types";

interface IParams {
    artworkId?: string;
}

export default async function getArtworkById(
    params: IParams
) {
    try {
        const { artworkId } = params;
        const artwork = await prisma.artwork.findUnique({
            where: {
                id: artworkId
            },
            include: {
                artist: true,
            },
        });

        if (!artwork) {
            return null;
        }
        return {
            artwork: artwork as IArtwork,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
