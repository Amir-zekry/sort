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
        <nav className='px-4 w-full mb-2 py-2 fixed'>
            <Link href='/' className='flex items-center'>
                <Image src='/logo.png' width={60} height={60} alt='logo' />
            </Link>
        </nav>
    )
}

export default Nav