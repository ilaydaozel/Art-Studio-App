import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(
    request: Request
) {
    const body: any = await request.json();
    const {
        name,
        surname,
        userType,
        email,
        gender,
        password,
    } = body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        return NextResponse.json({ error: "nonUniqueEmailError", status: "400" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let user: Prisma.UserCreateInput;
    if (userType === 'artist') {
        user = {
            name,
            surname,
            userType,
            email,
            gender,
            hashedPassword,
            artistProfile: {
                create: {
                    biography: "",
                    links: [],
                    profilePic: "",
                }
            }
        }
    } else {
        user = {
            name,
            surname,
            userType,
            email,
            gender,
            hashedPassword,
        }
    }
    const createdUser = await prisma.user.create({
        data: user
    });

    return NextResponse.json(createdUser);
}