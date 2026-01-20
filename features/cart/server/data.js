'use server'
import { PrismaClient } from "@prisma/client";
import { unstable_cacheTag, unstable_cacheLife } from "next/cache";
const db = new PrismaClient()

export async function getCartItems(userId) {
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