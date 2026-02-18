'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { signOutServerAction } from "../server/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"

function SignOut() {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
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
            {pending ? <Loader className="animate-spin" /> : 'تسجيل الخروج'}
        </DropdownMenuItem >
    )
}

export default SignOut
