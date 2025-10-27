'use server'
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export async function getProducts() {
    try {
        return await db.item.findMany()
    } catch (error) {
        throw new Error('faild to fetch products')
    }
}

export async function getProductById(id) {
    try {
        return await db.item.findUnique({
            where: { id }
        })
    } catch (error) {
        throw error
    }
}
export async function getFeatures(id) {
    try {
        return await db.feature.findMany({
            where: {
                itemId: id
            }
        })
    } catch (error) {
        throw new Error('Failed to fetch features for this item')
    }
}