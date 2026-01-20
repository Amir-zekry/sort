'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import z from "zod";
import { signIn, signOut } from "@/features/authentications/utils/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

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
export async function removeFromCart(itemId, userID) {
    try {
        const cart = await db.cart.findUnique({
            where: { userId: userID },
            select: { id: true }
        })
        await db.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                id: itemId
            }
        })
        revalidatePath('/')
    } catch (error) {
        console.error(error)
    }
}
export async function addToCart(userId, itemId) {
    try {
        let cart = await db.cart.findUnique({
            where: {
                userId: userId,
            },
            include: {
                cartItems: true,
            },
        });
        if (!cart) {
            cart = await db.cart.create({
                data: {
                    user: {
                        connect: { id: userId },
                    },
                },
                include: {
                    cartItems: true,
                },
            });
        }
        if (cart.cartItems.some(ci => ci.itemId === itemId)) {
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
                    connect: { id: itemId },
                },
            },
        });
        revalidatePath('/')
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
