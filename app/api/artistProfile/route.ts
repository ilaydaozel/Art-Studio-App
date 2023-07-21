import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User, UserArtwork } from "@prisma/client";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { biography, profilePic, artworks } = body;
    const user = currentUser.currentUser;

    let artistProfile;

    if (user.userType === "artist") {
        artistProfile = await prisma.artistProfile.findFirst({
            where: {
                artistId: user.id,
            },
        });

        if (artistProfile) {
            artistProfile = await prisma.artistProfile.update({
                where: {
                    id: artistProfile.id,
                },
                data: {
                    biography,
                    profilePic,
                    artworks,
                },
            });
        } else {
            artistProfile = await prisma.artistProfile.create({
                data: {
                    biography,
                    profilePic,
                    artworks,
                    artistId: user.id,
                },
            });
        }
    } else {
        return NextResponse.error();
    }

    return NextResponse.json(artistProfile);
}

export async function DELETE(
    request: Request,
) {

    const body = await request.json();
    const { artistId, artworkId } = body;

    const allUserArtworks = await prisma.userArtwork.findMany({
        where: {
            artistId: artistId,
        }
    });


    const artworks: UserArtwork[] = allUserArtworks.filter((id) => id !== artworkId);

    const user = await prisma.artistProfile.update({
        where: {
            artistId: artistId
        },
        data: {

        }
    });

    return NextResponse.json(user);
}

