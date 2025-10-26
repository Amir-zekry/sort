'use server'
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export async function addToCart(formData) {
    try {
        return await db.cartItem.create({
            data: {
                itemId: formData.get('itemId'),
                quantity: parseInt(formData.get('quantity'))
            }
        })
    } catch (error) {
        throw new Error('faild to add to cart')
    }
}