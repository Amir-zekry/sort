'use server'
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export async function getShippingInfo(userId) {
    try {
        const shippingInfo = await db.shippingInformation.findMany({
            where: { userId: userId }
        })
        return shippingInfo
    } catch (error) {
        throw error
    }
}
