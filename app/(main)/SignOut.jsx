import { signOut } from "@/auth"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
function SignOut() {
    return (
        <DropdownMenuItem className='justify-center'>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">تسجيل الخروج</button>
            </form>
        </DropdownMenuItem>
    )
}

export default SignOut