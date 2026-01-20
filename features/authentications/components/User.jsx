import { auth } from "@/features/authentications/utils/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import SignOut from "./SignOut"
import Link from "next/link"
async function UserData() {
    const session = await auth()
    const user = session?.user
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <User size={24} />
            </DropdownMenuTrigger>
            {session ? (
                <DropdownMenuContent>
                    <DropdownMenuLabel className='text-center'>{user?.name}</DropdownMenuLabel>
                    <SignOut />
                </DropdownMenuContent>
            ) : (
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href='/login'>تسجيل الدخول</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    )
}

export default UserData