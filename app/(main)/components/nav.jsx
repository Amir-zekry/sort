import Link from "next/link"
import { Menu, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SearchBar from "@/features/items/components/Search"
import UserData from "@/features/authentications/components/User"
import Cart from "@/features/cart/components/Cart"
import { Suspense } from "react"
import CategoriesMobile from "@/features/items/components/categoriesMobile"
import SortMobile from "@/features/items/components/sortMobile"
function Nav() {
    return (
        <nav
            className="px-1 w-full py-1"
        >
            <div className="mx-auto flex items-center justify-between p-1">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" width={48} height={48} alt="logo" />
                </Link>
                <Suspense fallback={null}>
                    <div className="md:block hidden">
                        <SearchBar />
                    </div>
                </Suspense>
                <div className="flex items-center gap-x-4">

                    <Suspense fallback={<ShoppingCart size={24} className="animate-pulse" />}>
                        <Cart />
                    </Suspense>
                    <UserData />
                    <Sheet>
                        <SheetTrigger className='md:hidden' asChild>
                            <Menu size={24} />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <SheetHeader>
                                <SheetTitle />
                            </SheetHeader>
                            <Suspense fallback={null}>
                                <SearchBar />
                            </Suspense>
                            <CategoriesMobile />
                            <SortMobile />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Nav