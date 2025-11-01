'use server'
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export async function createOrder(formData) {
    try {
        await db.order.create({
            data: {
                total: parseFloat(formData.get('total')),
                customer: {
                    create: {
                        name: formData.get('FullName'),
                        number: formData.get('PhoneNumber'),
                        address: formData.get('Address'),
                        governorate: formData.get('Governorate'),
                    },
                },
                item: {
                    connect: { id: (formData.get('itemId')) }
                }
            }
        })
    } catch (error) {
        throw new Error('Failed to create order: ' + error.message)
    }
}