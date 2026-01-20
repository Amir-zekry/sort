'use server'
import { PrismaClient } from "@prisma/client";
import { unstable_cacheTag, unstable_cacheLife } from "next/cache";
const db = new PrismaClient()

export async function getProducts(category, sort, search) {
    'use cache'
    unstable_cacheTag('products-list')
    unstable_cacheLife({ revalidate: 60 })
    // await sleep(9000) // 2 seconds
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
        console.log(error)
    }
}