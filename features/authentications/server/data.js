'use server'
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient()

export async function getUserFromDb(phoneNumber) {
    try {
        return await db.user.findUnique({
            where: {
                phoneNumber: phoneNumber,
            },
        });
    } catch (error) {
        console.error("Error fetching user from DB:", error);
    }
}