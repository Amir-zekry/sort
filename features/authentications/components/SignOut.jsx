'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { signOutServerAction } from "../server/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function SignOut() {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
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
    return (
        < DropdownMenuItem
            className={'justify-center'}
            disabled={pending}
            onSelect={() => {
                startTransition(async () => {
                    const res = await signOutServerAction()
                    if (res.success) {
                        toast.success(res.message)
                        router.refresh()
                    } else {
                        toast.error(res.message)
                    }
                })
            }
            }
        >
            تسجيل خروج
        </DropdownMenuItem >
    )
}

export default SignOut
