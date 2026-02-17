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
import RealAddToCart from '@/features/cart/components/RealAddToCart'

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
                            <Button className="cursor-pointer py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95">
                                اضافه الي العربه
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader >
                                <AlertDialogTitle />
                                <AlertDialogDescription className='text-right'>
                                    العربه هي خاصيه مميزه للمستخدمين المسجلين. من فضلك قم بتسجيل الدخول او انشاء حساب جديد للتمتع بهذه الخاصيه
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

export default AddToCart