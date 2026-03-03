import { auth } from '@/features/authentications/utils/auth'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import RealBuyNow from './RealBuyNow'

async function BuyNow({ id }) {
    const session = await auth()
    return (
        <>
            {session ? (
                <RealBuyNow itemId={id} />
            ) :
                (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button >
                                اشتري دلوقتي
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader >
                                <AlertDialogTitle />
                                <AlertDialogDescription className='text-right'>
                                    يجب عليك تسجيل الدخول اولا
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>الغاء</AlertDialogCancel>
                                <Link
                                    href={`/login?callbackUrl=/item/${id}`}
                                >
                                    <AlertDialogAction>
                                        تسجيل الدخول
                                    </AlertDialogAction>
                                </Link>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
        </>
    )
}

export default BuyNow