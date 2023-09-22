import prisma from "../../lib/prismadb";
import { IExhibition } from "../../types";


export default async function getAllExhibitions() {
    try {
        const exhibitons = await prisma.exhibition.findMany({

        });

        if (!exhibitons) {
            return null;
        }
        return {
            exhibitons: exhibitons as IExhibition[],
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
