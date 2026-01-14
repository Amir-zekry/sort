'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useActionState, useEffect, useRef } from "react"
import { signOutServerAction } from "../actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function SignOut() {
    const router = useRouter()

    const initialState = {
        success: null,
        pending: false,
    }

    const [state, action, pending] = useActionState(
        signOutServerAction,
        initialState
    )

    useEffect(() => {
        if (state.success === true) {
            router.refresh()
            toast.success("تم تسجيل الخروج بنجاح")
        } else if (state.success === false) {
            toast.error("حدث خطأ أثناء تسجيل الخروج")
        }
    }, [state.success])

    return (
        <DropdownMenuItem
            className="justify-center"
            onSelect={(e) => e.preventDefault()}
            asChild
        >
            <form action={action}>
                <button
                    type="submit"
                    disabled={pending}
                    className="w-full text-center"
                >
                    تسجيل خروج
                </button>
            </form>
        </DropdownMenuItem>
    )
}

export default SignOut
