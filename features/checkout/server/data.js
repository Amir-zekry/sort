'use server'
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export default async function getItemById(id) {
    try {
        return await db.item.findUnique({
            where: { id: id },
            select: {
                price: true,
                name: true,
                id: true,
                image: true
            }
        })
    } catch (error) {
        throw error
    }
}