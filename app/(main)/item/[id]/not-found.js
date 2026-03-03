'use client'
import { Button } from "@/components/ui/button";
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
        >
          <Button>
            العودة إلى المتجر
          </Button>
        </Link>
      </div>
    </div>
  );
}