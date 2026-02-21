'use server'
import { PrismaClient } from "@prisma/client";
import { cacheTag } from "next/cache";
const db = new PrismaClient()

export async function getProducts(category, sort, search) {
    'use cache'
    cacheTag('items')
    try {
        return await db.item.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true
            },
            where: {
                catergory: category,
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            orderBy: sort === 'low price' ? { price: 'asc' } :
                sort === 'high price' ? { price: 'desc' } :
                    { createdAt: 'desc' }
        })
    } catch (error) {
        throw new Error(`حدث خطأ اثناء عرض المنتجات`)
    }
}