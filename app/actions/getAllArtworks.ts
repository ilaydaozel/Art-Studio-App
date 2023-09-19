import prisma from "../libs/prismadb";
import { IArtwork } from "../types";


export default async function getAllArtworks() {
    try {
        const artworks = await prisma.Artwork.findMany({

        });

        if (!artworks) {
            return null;
        }
        return {
            artworks: artworks as IArtwork[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
