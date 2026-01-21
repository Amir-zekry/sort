'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import z from "zod";
import { signIn, signOut } from "@/features/authentications/utils/auth";
import { AuthError } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

const db = new PrismaClient()


export async function increaseCartItemQuantity(cartItemId) {
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
        console.error(error)
    }
}
export async function decreaseCartItemQuantity(cartItemId) {
    try {
        await db.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity: {
                    decrement: 1
                },
            }
        })
        revalidatePath('/')
    } catch (error) {
        console.error(error)
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
            include: {
                cartItems: true,
            },
        });
        if (!cart) {
            cart = await db.cart.create({
                data: {
                    user: {
                        connect: { id: formData.get('userId') },
                    },
                },
                include: {
                    cartItems: true,
                },
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
