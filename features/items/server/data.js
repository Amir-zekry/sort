'use server'
import { PrismaClient } from "@prisma/client";
import { cacheLife } from "next/cache";
const db = new PrismaClient()

export async function getProductsByCategory(slug) {
    'use cache'
    cacheLife('days')
    try {
        return await db.item.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true
            },
            where: {
                catergory: slug
            }
        })
    } catch (error) {
        throw new Error(`حدث خطأ اثناء عرض المنتجات`)
    }
}