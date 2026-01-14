import { auth } from '@/auth'
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
import RealAddToCart from './RealAddToCart'

async function AddToCart({ id }) {
    const session = await auth()
    return (
        <>
            {session ? (
                <RealAddToCart session={session} itemId={id} />
            ) :
                (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="cursor-pointer px-6 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95">
                                اضافه الي العربه
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader >
                                <AlertDialogTitle className='text-right'>خلي ثقتك في ربنا كبيره</AlertDialogTitle>
                                <AlertDialogDescription className='text-right'>
                                    العربه هي خاصيه مميزه للمستخدمين المسجلين. من فضلك قم بتسجيل الدخول او انشاء حساب جديد للتمتع بهذه الخاصيه, او لو حابب ممكن تشتري المنتج مباشرة.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>الغاء</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Link href={`/checkout/${id}`} className="block w-fit">
                                        اشتري دلوقتي
                                    </Link>
                                </AlertDialogAction>
                                <AlertDialogAction>
                                    <Link
                                        href={`/login?callbackUrl=/item/${id}`}
                                        className="block w-fit"
                                    >
                                        تسجيل الدخول
                                    </Link>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
        </>
    )
}

export default AddToCart