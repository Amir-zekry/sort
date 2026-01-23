'use server'
import { PrismaClient } from "@prisma/client";
import { unstable_cacheTag } from "next/cache";
const db = new PrismaClient()

export async function getCartItems(userId) {
    if (!userId) return null
    const cart = await db.cart.findUnique({
        where: {
            userId
        }
    })
    try {
        return await db.cartItem.findMany({
            where: {
                cartId: cart?.id
            },
            include: {
                item: true
            },
            orderBy: {
                itemId: 'asc'
            }
        })
    } catch (error) {
        console.log(error)
    }
}