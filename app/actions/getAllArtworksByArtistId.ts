import prisma from "@/app/libs/prismadb";
import { IUserArtwork } from "./type";

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
            },
            include: {
                artist: true,
                exhibitions: true,
            }
        });

        if (!allUserArtworks) {
            return null;
        }
        return {
            allUserArtworks: allUserArtworks as IUserArtwork[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
