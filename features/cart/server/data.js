'use server'
import { PrismaClient } from "@prisma/client";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
const db = new PrismaClient()

export async function getCartItems(userId) {
    'use cache'
    cacheTag(`cart:${userId}`)
    const cart = await db.cart.findUnique({
        where: { userId },
        select: {
            id: true
        }
    })
    try {
        return await db.cartItem.findMany({
            where: {
                cartId: cart?.id  // here i'm adding the "?" for a very niche use which is if the user didn't add any items yet to the cart the cart won't actylly be there (check addToCart logic)
            },
            select: {
                item: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true
                    }
                },
                quantity: true,
                id: true
            },
            orderBy: {
                itemId: 'asc'
            }
        })
    } catch (error) {
        throw error
    }
}