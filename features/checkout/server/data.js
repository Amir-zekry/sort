'use server'
import { auth } from "@/features/authentications/utils/auth";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export async function getShippingInfo() {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    try {
        const shippingInfo = await db.shippingInformation.findMany({
            where: { userId: userId }
        })
        return shippingInfo
    } catch (error) {
        throw new Error('an error occured while fetching shipping data')
    }
}
