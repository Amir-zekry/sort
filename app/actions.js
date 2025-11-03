'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

const db = new PrismaClient()

export async function createOrder(formData) {
    try {
        const order = await db.order.create({
            data: {
                total: parseFloat(formData.get('total')),
                notes: formData.get('Notes'),
                customer: {
                    connectOrCreate: {
                        where: { number: formData.get('PhoneNumber') },
                        create: {
                            name: formData.get('FullName'),
                            number: formData.get('PhoneNumber'),
                            address: formData.get('Address'),
                            governorate: formData.get('Governorate'),
                        },
                    },
                },
                item: {
                    connect: { id: formData.get('itemId') },
                },
            },
        });
        redirect(`/confirmation?orderId=${order.id}`)
    } catch (error) {
        console.error(error);
        if (isRedirectError(error)) {
            throw error;
        }
    }
}