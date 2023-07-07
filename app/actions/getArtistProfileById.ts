import prisma from "@/app/libs/prismadb";

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
                id: artistId,
            },
            include: {
                user: true
            }
        });

        if (!artistProfile) {
            return null;
        }

        return {
            artistProfile,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
