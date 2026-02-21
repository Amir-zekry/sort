'use server'
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/features/authentications/utils/auth";

const db = new PrismaClient()


export async function increaseCartItemQuantity(cartItemId) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    try {
        await db.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity: {
                    increment: 1
                },
            }
        })
        revalidatePath('/')
    } catch (error) {
        throw new Error('فشل')
    }
}
export async function decreaseCartItemQuantity(cartItemId) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    try {
        await db.cartItem.update({
            where: {
                id: cartItemId,
                quantity: {
                    gt: 1
                }
            },
            data: {
                quantity: {
                    decrement: 1
                },
            }
        })
    } catch (error) {
        throw error
    }
}
export async function removeFromCart(state, formData) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    const cart = await db.cart.findUnique({
        where: { userId: userId },
        select: { id: true }
    })
    try {
        await db.cartItem.delete({
            where: {
                cartId: cart.id,
                id: formData.get('itemId')
            }
        })
    } catch (error) {
        throw new Error('حدث خطأ اثناء الازاله من العربه')
    }
}
export async function addToCart(state, formData) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    try {
        let cart = await db.cart.findUnique({
            where: {
                userId: userId,
            },
            select: {
                cartItems: true,
                id: true,
            }
        });
        if (!cart) {
            cart = await db.cart.create({
                data: {
                    user: {
                        connect: { id: userId },
                    },
                },
                select: {
                    cartItems: true,
                    id: true,
                }
            });
        }
        if (cart.cartItems.some(ci => ci.itemId === formData.get('itemId'))) {
            return {
                success: false,
                message: "العنصر موجود بالفعل في العربه"
            }
        }
        await db.cartItem.create({
            data: {
                cart: {
                    connect: { id: cart.id },
                },
                item: {
                    connect: { id: formData.get('itemId') },
                },
            },
        });
        return {
            success: true,
            message: "تمت إضافة العنصر إلى العربه بنجاح"
        }
    } catch (error) {
        return {
            success: false,
            message: "حدث خطأ أثناء إضافة العنصر إلى العربه"
        }
    }
}
