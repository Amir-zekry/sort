import Link from "next/link"
import { ShoppingCart, User } from 'lucide-react'
import Image from "next/image"
import UserData from "@/features/authentications/components/User"
import Cart from "@/features/cart/components/Cart"
import { Suspense } from "react"

function Nav() {
    return (
        <nav
            className="px-1 w-full py-1"
        >
            <div className="mx-auto flex items-center justify-between p-1">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" width={48} height={48} alt="logo" />
                </Link>
                <div className="flex items-center gap-x-4">
                    <Suspense fallback={<ShoppingCart size={24} className="animate-pulse" />}>
                        <Cart />
                    </Suspense>
                    <Suspense fallback={<User size={24} className="animate-pulse" />}>
                        <UserData />
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}

export default Nav