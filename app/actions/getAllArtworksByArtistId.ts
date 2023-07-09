import prisma from "@/app/libs/prismadb";
import { ArtistProfile, UserArtwork } from "@prisma/client";

interface IParams {
    artistId?: string;
}

export default async function getAllArtworksByArtistId(
    params: IParams
) {
    try {
        const { artistId } = params;
        const allUserArtworks = await prisma.userArtwork.findMany({
            where: {
                artistId: artistId,
            }
        });

        if (!allUserArtworks) {
            return null;
        }
        console.log("allUserArtworks: ", allUserArtworks);
        return {
            allUserArtworks: allUserArtworks as UserArtwork[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
