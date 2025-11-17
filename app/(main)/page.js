import Products from "./products";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";

export default function Home() {
  return (
    <div className="max-w-screen min-h-screen flex justify-center items-start mt-5 px-4">
      <Suspense fallback={<ProductsSkeleton />}>
        <Products />
      </Suspense>
    </div>
  );
}
