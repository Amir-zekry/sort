import Link from "next/link"
import { Menu } from 'lucide-react'
import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Cart from "../../../features/cart/components/Cart"
import SearchBar from "../../../features/items/components/Search"
import { Suspense } from "react"
import UserData from "../../../features/authentications/components/User"
import { auth } from "@/features/authentications/utils/auth"
async function Nav() {
    const session = await auth()
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
                <div className="flex items-center gap-x-4">
                    <Suspense fallback={null}>
                        <div className="md:hidden">
                            <SearchBar />
                        </div>
                    </Suspense>
                    {session && (
                        <Cart />
                    )}
                    <UserData />
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
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav