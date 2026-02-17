'use server'
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient()

export async function getUserFromDb(phoneNumber) {
    return await db.user.findUnique({
        where: {
            phoneNumber: phoneNumber,
        },
    });
}