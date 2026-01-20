import Products from "@/features/items/components/products";
import { Suspense } from "react";
import ProductsSkeleton from "@/features/items/components/ProductsSkeleton";
import Categories from "@/features/items/components/Categories";
import Sort from "@/features/items/components/Sort";

export default async function Home({ searchParams }) {
  const { category } = await searchParams
  const { sort } = await searchParams
  const { search } = await searchParams
  return (
    <div className="max-w-screen min-h-screen flex md:flex-row flex-col md:justify-center justify-start items-start mt-5 px-4 md:gap-x-5 gap-y-5">
      <Categories />
      <div className="md:hidden w-full">
        <Sort />
      </div>
      <Suspense
        key={[category, sort, search]}
        fallback={<ProductsSkeleton />}
      >
        <Products category={category} sort={sort} search={search} />
      </Suspense>
      <div className="hidden md:block">
        <Sort />
      </div>
    </div>
  );
}
