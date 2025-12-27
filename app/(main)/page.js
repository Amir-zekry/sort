import Products from "./products";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import Categories from "./Categories";

export default async function Home({ searchParams }) {
  const { category } = await searchParams
  return (
    <div className="max-w-screen min-h-screen flex md:flex-row flex-col md:justify-center justify-start items-start mt-5 px-4 md:gap-x-5 gap-y-5">
      <Categories />
      <Suspense
        key={category}
        fallback={<ProductsSkeleton />}
      >
        <Products category={category} />
      </Suspense>
    </div>
  );
}
