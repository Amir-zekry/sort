'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import z from "zod";

const db = new PrismaClient()

const formSchema = z.object({
    FullName: z.string().min(1, "الاسم مطلوب"),
    PhoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
    Address: z.string().min(1, "العنوان مطلوب"),
    Governorate: z.string().min(1, "المحافظة مطلوبة"),
    quantity: z.coerce.number().min(1, "الكمية يجب أن تكون على الأقل 1")
})

export async function createOrder(state, formData) {
    const parsedData = formSchema.safeParse({
        FullName: formData.get('FullName'),
        PhoneNumber: formData.get('PhoneNumber'),
        Address: formData.get('Address'),
        Governorate: formData.get('Governorate'),
        quantity: formData.get('quantity') // Handles select input default
    });
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
        };
    }
    const { FullName, PhoneNumber, Address, Governorate, quantity } = parsedData.data;
    try {
        const customer = await db.customer.create({
            data: {
                name: FullName,
                number: PhoneNumber,
                address: Address,
                governorate: Governorate,
            }
        })
        const order = await db.order.create({
            data: {
                total: parseFloat(formData.get('total')),
                notes: formData.get('Notes'),
                quantity: quantity,
                customer: {
                    connect: { id: customer.id }
                },
                item: {
                    connect: { id: formData.get('itemId') },
                },
            },
        });
        redirect(`/confirmation?orderId=${order.id}`)
    } catch (error) {
        if (!isRedirectError(error)) {
            console.error("Order creation failed:", error)
        }
        throw error // still let redirect work
    }
}