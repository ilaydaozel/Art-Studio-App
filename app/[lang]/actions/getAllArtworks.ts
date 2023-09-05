import prisma from "../libs/prismadb";
import { IUserArtwork } from "./type";


export default async function getAllArtworks() {
    try {
        const artworks = await prisma.userArtwork.findMany({

        });

        if (!artworks) {
            return null;
        }
        return {
            artworks: artworks as IUserArtwork[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
