import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ShoppingCart, Menu } from 'lucide-react'
import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Cart from "../Cart"
import SearchBar from "../Search"
import { Suspense } from "react"
function Nav() {
    return (
        <nav
            className="px-1 w-full py-1 bg-cover bg-center text-white"
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
                <div className="flex items-center gap-x-2">
                    <Suspense fallback={null}>
                        <div className="md:hidden">
                            <SearchBar />
                        </div>
                    </Suspense>
                    <Cart />
                    <div className="md:hidden flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Menu size={24} />
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64">
                                <SheetHeader>
                                    <SheetTitle>القائمة</SheetTitle>
                                    <SheetDescription>تصفح الموقع</SheetDescription>
                                </SheetHeader>

                                <ul className="mt-4 space-y-4">
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav