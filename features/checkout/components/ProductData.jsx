import Image from 'next/image'
import IncreaseQuantity from '@/features/cart/components/IncreaseQuantity'
import DecreaseQuantity from '@/features/cart/components/DecreaseQuantity'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react'
function ProductData({ cartItems }) {
    const deliveryFee = 45
    const subtotal = cartItems.reduce(
        (sum, ci) => sum + ci.item.price * ci.quantity,
        0
    )
    const total = subtotal + deliveryFee
    return (
        <div className='items-start md:max-w-[40vw] md:min-w-[40vw] space-y-5'>
            <Collapsible defaultOpen={true} >
                <CollapsibleTrigger>
                    <ChevronDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {cartItems.map(ci => (
                        <div
                            key={ci.id}
                            className='flex items-start justify-between md:w-[30vw] w-[80vw] border-b pb-4'
                        >
                            <div className='flex items-start gap-x-2'>
                                <div className='w-14 h-14 relative rounded-lg'>
                                    <Image
                                        src={ci.item.image}
                                        alt={ci.item.name}
                                        fill='true'
                                        className='object-contain'
                                    />
                                </div>
                            </div>
                            <h3 className="font-medium text-sm max-w-36 truncate">{ci.item.name}</h3>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <p className='mr-auto'>{ci.item.price * ci.quantity}</p>
                                    <p>ج.م</p>
                                </div>
                                <div >
                                    <DecreaseQuantity cartItemId={ci.id} quantity={ci.quantity} />
                                    <span className='mx-2'>{ci.quantity}</span>
                                    <IncreaseQuantity cartItemId={ci.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <h2>التوصيل</h2>
                <div className='flex items-center gap-x-2 font-bold'>
                    <p>{deliveryFee}</p>
                    <p>ج.م</p>
                </div>
            </div>

            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <h2 className='font-bold'>المجموع</h2>
                <div className='flex items-center gap-x-2 font-bold'>
                    <p>{total}</p>
                    <p>ج.م</p>
                </div>
            </div>
        </div>
    )
}

export default ProductData
