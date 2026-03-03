'use server'
import { PrismaClient } from "@prisma/client";
import { cacheTag } from "next/cache";

const db = new PrismaClient()

export async function getCartItems(userId) {
    'use cache'
    cacheTag(`cart:${userId}`)
    if (!userId) return 'no user'
    try {
        const cart = await db.cart.findUnique({
            where: { userId },
            select: {
                id: true
            }
        })
        if (!cart) return []
        const cartItems = await db.cartItem.findMany({
            where: {
                cartId: cart.id
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
        return cartItems
    } catch (error) {
        throw new Error(`حدث خطا اثناء جلب بيانات عربة التسوق`)
    }
}