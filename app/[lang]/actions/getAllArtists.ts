import prisma from "../libs/prismadb";
import { IUser } from "./type";


export default async function getAllArtists() {
    try {
        const artists = await prisma.user.findMany({
            where: {
                userType: 'artist',
            }
        });

        if (!artists) {
            return null;
        }
        return {
            artists: artists as IUser[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
