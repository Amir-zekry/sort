'use server'
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient()

export async function getProducts(category, sort, search) {
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