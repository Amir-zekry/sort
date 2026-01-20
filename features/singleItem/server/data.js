'use server'
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient()

export async function getHeroSetionData(itemId) {
    try {
        return await db.item.findUnique({
            where: { id: itemId },
            select: {
                id: true,
                name: true,
                discription: true,
                image: true,
                heroImage: true,
                heroImagePhone: true
            }
        })
    } catch (error) {
        throw error
    }

}
export async function getFeatures(itemId) {
    try {
        return await db.feature.findMany({
            where: {
                itemId: itemId
            },
            select: {
                image_url: true,
                h1: true,
                p: true
            }
        })
    } catch (error) {
        throw error
    }
}
export async function getImages(itemId) {
    try {
        return await db.imageGallery.findMany({
            where: {
                itemId: itemId
            },
            select: {
                image_url: true,
            }
        })
    } catch (error) {
        throw new Error('Failed to fetch images for this item')
    }
}
export async function getReviews(productId) {
    try {
        const res = await fetch(
            `https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgwGT_iahp1OcheArNSEgcBF9OoBebTPmo7JMemNA0ODSnyEfCoutSV_uCoRqmMVj0BkXo5OO3Av4GPf9htw5FDCTHHPcI96hUvR1Z8DMmyR0_chwIGl4BQCfkTLIDK7sifNFqAR2fXRWD4kuA7f1s71HwvqHNHIEe1WgoKggnIsv_B5SkRl0W7P-GzAg8RVYS6lDGiCwDks01dK18hphWaKm5-PH_OngNpIYd9ELq1SbaEq0AzyVxZHsyZVjJeT_8h7k1r3N4OdCYkQ7yl0ofGJBstBA&lib=M7Z2x9U7g9Hpf36YFzKA9vqiN-eGUNTqw`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();

        // Clean + translate fields
        const cleaned = data.map((item) => ({
            name: item["الاسم"] || "مجهول",
            phone: item["رقم الهاتف"] || "",
            rating: item["تقييم المنتج"] || "",
            opinion: item["رايك في المنتج"] || "",
            comments: item["Comments"] || "",
            date: item["Timestamp"] || null,
            productId: item['الرقم التعريفي للمنتح'] || "",
        }));

        // Filter only for this product
        const filtered = cleaned.filter((r) => r.productId === productId);

        // Keep highest rated top 5
        const parseRating = (val) => {
            const s = String(val ?? '').trim().replace(',', '.').match(/[\d.]+/);
            return s ? parseFloat(s[0]) : 0;
        };

        const top4 = filtered
            .map(r => ({ ...r, _rating: parseRating(r.rating) }))
            .sort((a, b) => b._rating - a._rating)
            .slice(0, 4)
            .map(({ _rating, ...rest }) => rest);

        return top4;
    } catch (error) {
        console.log(error)
    }
}