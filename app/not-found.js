'use client'
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-center mt-20">الصفحه غير موجوده</h1>
      <p className="text-center mt-4 text-muted-foreground">عذرا الصفحه التي تبحث عنها غير موجود</p>
      <div className="flex justify-center mt-6">
        <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
          العودة إلى المتجر
        </Link>
      </div>
    </div>
  )
}