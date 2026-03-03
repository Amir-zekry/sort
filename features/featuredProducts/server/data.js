import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgwGT_iahp1OcheArNSEgcBF9OoBebTPmo7JMemNA0ODSnyEfCoutSV_uCoRqmMVj0BkXo5OO3Av4GPf9htw5FDCTHHPcI96hUvR1Z8DMmyR0_chwIGl4BQCfkTLIDK7sifNFqAR2fXRWD4kuA7f1s71HwvqHNHIEe1WgoKggnIsv_B5SkRl0W7P-GzAg8RVYS6lDGiCwDks01dK18hphWaKm5-PH_OngNpIYd9ELq1SbaEq0AzyVxZHsyZVjJeT_8h7k1r3N4OdCYkQ7yl0ofGJBstBA&lib=M7Z2x9U7g9Hpf36YFzKA9vqiN-eGUNTqw`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured source");
    }

    const data = await res.json();

    const cleaned = data
      .map((item) => ({
        rating: item["تقييم المنتج"],
        productId: item["الرقم التعريفي للمنتح"],
      }))
      .filter((item) => item.productId);

    const ratingMap = new Map(
      cleaned.map((r) => [r.productId, r.rating])
    );

    const featuredProducts = await db.item.findMany({
      where: {
        id: {
          in: Array.from(ratingMap.keys())
        }
      },
      select: {
        image: true,
        name: true,
        discription: true,
        price: true,
        id: true
      },
      take: 8
    });

    return featuredProducts.map((product) => ({
      ...product,
      rating: ratingMap.get(product.id) ?? "No rating"
    }));

  } catch (error) {
    console.error("Featured Products Error:", error);
    throw new Error("فشل جلب المنتجات المميزة");
  }
}