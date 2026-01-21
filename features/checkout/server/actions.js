'use server'
import { PrismaClient } from "@prisma/client";
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
    const items = JSON.parse(formData.get('items')) // 🔥 important

    // 1️⃣ Fetch items from DB (security)
    const dbItems = await db.item.findMany({
        where: { id: { in: items.map(i => i.itemId) } }
    })
    let total = 45 // shipping
    const orderItemsData = items.map(i => {
        const item = dbItems.find(d => d.id === i.itemId)
        total += item.price * i.quantity

        return {
            itemId: item.id,
            quantity: i.quantity,
        }
    })
    const mode = formData.get('mode')
    const userId = formData.get('userId')
    let cart
    if (mode === 'cart' && userId) {
        cart = await db.cart.findUnique({
            where: { userId: userId },
            select: { id: true }
        })
    }
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
                        data: orderItemsData
                    }
                }
            },
        });
        await db.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        })
        redirect(`/confirmation?orderId=${order.id}`)
    } catch (error) {
        if (!isRedirectError(error)) {
            console.error("Order creation failed:", error)
        }
        throw error // still let redirect work
    }
}