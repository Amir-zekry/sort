'use server'
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const db = new PrismaClient()


export async function increaseCartItemQuantity(cartItemId, userId) {
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
        revalidateTag(`cart:${userId}`)
    } catch (error) {
        throw error
    }
}
export async function decreaseCartItemQuantity(cartItemId, userId) {
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
        revalidateTag(`cart:${userId}`)
    } catch (error) {
        throw error
    }
}
export async function removeFromCart(state, formData) {
    const cart = await db.cart.findUnique({
        where: { userId: formData.get('userId') },
        select: { id: true }
    })
    try {
        await db.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                id: formData.get('itemId')
            }
        })
        revalidateTag(`cart:${formData.get('userId')}`)
        return {
            success: true,
            message: 'تم ازالة المنتج من العربه بنجاح'
        }
    } catch (error) {
        return {
            success: false,
            message: 'حدث خطا اثناء ازالة المنتج'
        }
    }
}
export async function addToCart(state, formData) {
    try {
        let cart = await db.cart.findUnique({
            where: {
                userId: formData.get('userId'),
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
                        connect: { id: formData.get('userId') },
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
        revalidateTag(`cart:${formData.get('userId')}`)
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
