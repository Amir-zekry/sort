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
function Nav() {
    return (
        <nav
            className="px-1 w-full py-1 bg-cover bg-center text-white bg-muted/40"
        >
            <div className="mx-auto flex items-center justify-between p-1">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" width={48} height={48} alt="logo" />
                </Link>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium hover:opacity-80">Products</Link>
                </div>

                {/* Mobile: cart + hamburger (sheet) */}
                <div className="md:hidden flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="p-2">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>Navigate the site</SheetDescription>
                            </SheetHeader>

                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link href="/" className="block text-base font-medium">Products</Link>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Nav