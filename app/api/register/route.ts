import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { UserRequest } from "@/models/user";

export async function POST(
    request: Request
) {
    const body: UserRequest = await request.json();
    const {
        name,
        surname,
        userType,
        email,
        gender,
        password,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const artistProfile = undefined;
    const user = await prisma.user.create({
        data: {
            name,
            surname,
            userType,
            email,
            gender,
            hashedPassword,
            artistProfile,
        }
    });

    return NextResponse.json(user);
}