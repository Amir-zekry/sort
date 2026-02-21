'use server'
import { auth } from "@/features/authentications/utils/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, updateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import z from "zod";

const db = new PrismaClient()

export async function createOrder(state, formData) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    try {
        // 1️⃣ Fetch cart securely from database
        const cart = await db.cart.findUnique({
            where: { userId: userId },
            include: {
                cartItems: {
                    include: {
                        item: true,
                    },
                },
            },
        })

        if (!cart || cart.cartItems.length === 0) {
            return {
                message: "السلة فارغة",
                success: false,
            }
        }

        // 2️⃣ Compute total securely from DB
        const shippingFee = 45

        const total =
            cart.cartItems.reduce(
                (sum, ci) => sum + ci.item.price * ci.quantity,
                0
            ) + shippingFee

        const orderItems = cart.cartItems.map((ci) => ({
            itemId: ci.itemId,
            quantity: ci.quantity,
        }))

        // 3️⃣ Atomic transaction
        const orderTransaction = await db.$transaction(async (tx) => {

            const shippingInfoId = formData.get('shippingInfoId')

            const createdOrder = await tx.order.create({
                data: {
                    total,
                    notes: formData.get("Notes") || null,

                    // Attach order to user
                    user: {
                        connect: { id: formData.get('userId') },
                    },

                    // connect shipping info to order
                    shippingInformation: {
                        connect: { id: shippingInfoId },
                    },

                    // Create order items
                    items: {
                        createMany: {
                            data: orderItems,
                        },
                    },
                },
            })

            await tx.user.update({
                where: { id: userId },
                data: {
                    shippingInformations: {
                        connect: { id: shippingInfoId },
                    },
                }
            })

            // Clear cart
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            })

            return createdOrder
        })
        redirect(`/confirmation?orderId=${orderTransaction.id}`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        throw new Error('حدث خطأ اثناء انشاء طلبك')
    }
}

export async function CreateShippingInfo(state, formData) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    const formSchema = z.object({
        FullName: z.string().min(1, "الاسم مطلوب"),
        PhoneNumber: z
            .string()
            .regex(/^01[0125][0-9]{8}$/, "ادخل رقم هاتف مصري"),
        Address: z.string().min(1, "العنوان مطلوب"),
        Governorate: z.string().min(1, "المحافظة مطلوبة"),
    })

    const parsedData = formSchema.safeParse({
        FullName: formData.get("FullName"),
        PhoneNumber: formData.get("PhoneNumber"),
        Address: formData.get("Address"),
        Governorate: formData.get("Governorate"),
    })

    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    const { FullName, PhoneNumber, Address, Governorate } = parsedData.data
    try {
        await db.shippingInformation.create({
            data: {
                name: FullName,
                number: PhoneNumber,
                address: Address,
                governorate: Governorate,
                user: {
                    connect: { id: userId }
                }
            }
        })
        revalidatePath('/')
        return {
            success: true,
            message: 'تم اضافة معلومات الشحن بنجاح'
        }
    } catch (error) {
        throw new Error('حدث خطا اثناء انشاء معلومات الشحن')
    }
}

export async function createOrderWhenNoShippingInfo(state, formData) {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return null
    const formSchema = z.object({
        FullName: z.string().min(1, "الاسم مطلوب"),
        PhoneNumber: z
            .string()
            .regex(/^01[0125][0-9]{8}$/, "ادخل رقم هاتف مصري"),
        Address: z.string().min(1, "العنوان مطلوب"),
        Governorate: z.string().min(1, "المحافظة مطلوبة"),
    })

    const parsedData = formSchema.safeParse({
        FullName: formData.get("FullName"),
        PhoneNumber: formData.get("PhoneNumber"),
        Address: formData.get("Address"),
        Governorate: formData.get("Governorate"),
    })

    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
        }
    }

    const { FullName, PhoneNumber, Address, Governorate } = parsedData.data
    try {
        // 1️⃣ Fetch cart securely from database
        const cart = await db.cart.findUnique({
            where: { userId: userId },
            include: {
                cartItems: {
                    include: {
                        item: true,
                    },
                },
            },
        })

        if (!cart || cart.cartItems.length === 0) {
            return {
                message: "السلة فارغة",
                success: false,
            }
        }

        // 2️⃣ Compute total securely from DB
        const shippingFee = 45

        const total =
            cart.cartItems.reduce(
                (sum, ci) => sum + ci.item.price * ci.quantity,
                0
            ) + shippingFee

        const orderItems = cart.cartItems.map((ci) => ({
            itemId: ci.itemId,
            quantity: ci.quantity,
        }))

        // 3️⃣ Atomic transaction
        const orderTransaction = await db.$transaction(async (tx) => {

            const shippingInfo = await tx.shippingInformation.create({
                data: {
                    name: FullName,
                    number: PhoneNumber,
                    address: Address,
                    governorate: Governorate
                }
            })

            const createdOrder = await tx.order.create({
                data: {
                    total,
                    notes: formData.get("Notes") || null,

                    // Attach order to user
                    user: {
                        connect: { id: userId },
                    },

                    // create shipping info to order

                    shippingInformation: {
                        connect: {
                            id: shippingInfo.id
                        }
                    },

                    // Create order items
                    items: {
                        createMany: {
                            data: orderItems,
                        },
                    },
                },
            })

            await tx.user.update({
                where: {
                    id: userId
                },
                data: {
                    shippingInformations: {
                        connect: {
                            id: shippingInfo.id
                        }
                    }
                }
            })

            // Clear cart
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            })

            return createdOrder
        })

        revalidatePath('/')
        redirect(`/confirmation?orderId=${orderTransaction.id}`)
        
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        console.error(error)
        throw new Error('حدث خطأ اثناء انشاء طلبك')
    }
}
