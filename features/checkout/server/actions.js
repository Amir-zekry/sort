'use server'
import { PrismaClient } from "@prisma/client";
import { updateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import z from "zod";

const db = new PrismaClient()



export async function createOrder(state, formData) {
    const formSchema = z.object({
        FullName: z.string().min(1, "الاسم مطلوب"),
        PhoneNumber: z
            .string()
            .regex(
                /^01[0125][0-9]{8}$/,
                "ادخل رقم هاتف مصري"
            ),
        Address: z.string().min(1, "العنوان مطلوب"),
        Governorate: z.string().min(1, "المحافظة مطلوبة"),
    })
    const parsedData = formSchema.safeParse({
        FullName: formData.get('FullName'),
        PhoneNumber: formData.get('PhoneNumber'),
        Address: formData.get('Address'),
        Governorate: formData.get('Governorate'),
    });
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
        };
    }
    const { FullName, PhoneNumber, Address, Governorate } = parsedData.data;

    const cartItems = JSON.parse(formData.get('cartItems'))

    const orderItems = cartItems.map(ci => ({
        itemId: ci.item.id,
        quantity: ci.quantity,
    }))

    const total = JSON.parse(formData.get('cartItems')).reduce(
        (sum, ci) => sum + ci.item.price * ci.quantity,
        0
    ) + 45
    const cart = await db.cart.findUnique({
        where: {
            userId: formData.get('userId')
        }
    })
    try {
        const order = await db.order.create({
            data: {
                total: total,
                notes: formData.get('Notes'),
                customer: {
                    create: {
                        name: FullName,
                        number: PhoneNumber,
                        address: Address,
                        governorate: Governorate,
                    }
                },
                items: {
                    createMany: {
                        data: orderItems
                    }
                }
            },
        });
        await db.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        })
        updateTag(`cart:${formData.get('userId')}`)
        redirect(`/confirmation?orderId=${order.id}`)
    } catch (error) {
        if (!isRedirectError(error)) {
            throw error
        }
        return {
            message: "حدث خطأ أثناء إنشاء الطلب. الرجاء المحاولة مرة أخرى.",
            success: false
        }
    }
}