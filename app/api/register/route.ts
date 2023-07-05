import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        name,
        surname,
        userType,
        email,
        gender,
        password,
        artistProfile,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

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