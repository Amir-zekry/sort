import { auth } from '@/features/authentications/utils/auth'
import { Empty } from '@/components/ui/empty'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { getCartItems } from '@/features/cart/server/data'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import IncreaseQuantity from '@/features/cart/components/IncreaseQuantity'
import DecreaseQuantity from '@/features/cart/components/DecreaseQuantity'
import RemoveAnItemButton from '@/features/cart/components/RemoveAnItemButton'

async function Cart() {
    const session = await auth()
    const user = session?.user
    const userId = user?.id
    const cartItems = await getCartItems(userId)
    const count = cartItems?.length
    const total = cartItems?.reduce((sum, cartItem) => {
        return sum + cartItem.quantity * cartItem.item.price
    }, 45)
    if (!session) return null
    return (
        <Sheet>
            <SheetTrigger className="relative">
                <ShoppingCart size={24} />
                {count >= 1 &&
                    <span className="absolute -top-1 -right-1 rounded-full bg-red-600 text-white text-xs w-3 h-3 flex items-center justify-center">
                        {count}
                    </span>
                }
            </SheetTrigger>
            {cartItems.length === 0 ? (
                <SheetContent>
                    <SheetTitle />
                    <Empty>
                        العربه فارغه
                    </Empty>
                </SheetContent>
            ) : (
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className='justify-center flex'>
                            عربة التسوق
                        </SheetTitle>
                    </SheetHeader>
                    <div>
                        {cartItems.map((cartItem) => (
                            <div key={cartItem.id} className="flex items-start justify-between p-2 border-b">
                                <div className="w-16 h-16 border rounded-lg relative p-2">
                                    <RemoveAnItemButton itemId={cartItem.id} userId={userId} />
                                    <div className="w-full h-full relative">
                                        <Image
                                            fill
                                            src={cartItem.item.image}
                                            alt={cartItem.item.name}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-medium text-sm max-w-36 truncate">{cartItem.item.name}</h3>
                                <div className='space-y-2'>
                                    <p className="font-medium justify-self-end">{cartItem.item.price * cartItem.quantity} ج.م</p>
                                    <div className="flex items-center">
                                        <DecreaseQuantity cartItemId={cartItem.id} userId={userId} quantity={cartItem.quantity} />
                                        <span className='mx-2'>{cartItem.quantity}</span>
                                        <IncreaseQuantity cartItemId={cartItem.id} userId={userId} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SheetFooter>
                        <div className='flex justify-between items-center'>
                            <p>التوصيل</p>
                            <p>45 ج.م</p>
                        </div>
                        <Separator />
                        <div className='flex justify-between items-center'>
                            <p>المجموع</p>
                            <p>{total} ج.م</p>
                        </div>
                        <Separator />
                        <div className='w-full flex items-center justify-center'>
                            <Link href={'/checkout'}>
                                <Button>استكمال الاوردر</Button>
                            </Link>
                        </div>
                    </SheetFooter>
                </SheetContent>
            )}
        </Sheet>
    )
}

export default Cart