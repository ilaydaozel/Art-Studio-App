import prisma from "../libs/prismadb";
import { IExhibition } from "../types";

interface IParams {
    exhibitionId?: string;
}

export default async function getExhibitionById(
    params: IParams
) {
    try {
        const { exhibitionId } = params;
        const exhibition = await prisma.exhibition.findUnique({
            where: {
                id: exhibitionId,
            },
            include: {
                userArtworks: true,
                guestArtworks: true,
            },
        });

        if (!exhibition) {
            return null;
        }
        return {
            exhibition: exhibition as IExhibition,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
