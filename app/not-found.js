'use client'
import Link from "next/link";

// import { usePathname, useSearchParams, useRouter } from "next/navigation"
// import { useEffect } from "react"

export default function NotFound() {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const router = useRouter()
  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams)
  //   const notFound = params.set("notFound", "true")
  //   router.replace(`${pathname}?${params.toString()}`)
  // }, [])
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-center mt-20">المنتج غير موجود</h1>
      <p className="text-center mt-4 text-muted-foreground">عذرًا، المنتج الذي تبحث عنه غير موجود.</p>
      <div className="flex justify-center mt-6">
        <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
          العودة إلى المتجر
        </Link>
      </div>
    </div>
  )
}