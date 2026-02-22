'use client'
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center flex-col text-center">
      <h1 className="text-2xl font-bold">المنتج غير موجود</h1>
      <p className="mt-4 text-muted-foreground">
        عذرًا، المنتج الذي تبحث عنه غير موجود.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          العودة إلى المتجر
        </Link>
      </div>
    </div>
  );
}