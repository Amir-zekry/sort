'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useActionState, useEffect } from "react"
import { signOutServerAction } from "../server/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

function SignOut() {
    const router = useRouter()
    const initialState = {}
    const [state, action, pending] = useActionState(signOutServerAction, initialState)

    useEffect(() => {
        if (!pending) return
        let value = 20
        const toastId = toast.custom(
            () => (
                <Progress value={value} className="w-62" />
            ),
            { duration: Infinity }
        )
        const interval = setInterval(() => {
            value = Math.min(value + 15, 90)

            toast.custom(
                () => (
                    <Progress value={value} className="w-62" />
                ),
                { id: toastId }
            )
        }, 500)

        return () => {
            clearInterval(interval)
            toast.dismiss(toastId)
        }
    }, [pending])

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
