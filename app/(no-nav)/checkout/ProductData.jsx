import Image from 'next/image'
import IncreaseQuantity from '@/app/IncreaseQuantity'
import DecreaseQuantity from '@/app/DecreaseQuantity'
import { Button } from '@/components/ui/button'

function ProductData({ items, setItems, mode }) {
    const deliveryFee = 45
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    const total = subtotal + deliveryFee
    return (
        <div className='items-start md:max-w-[40vw] md:min-w-[40vw] space-y-5'>
            {items.map(item => (
                <div
                    key={item.id}
                    className='flex items-start justify-between md:w-[30vw] w-[80vw] border-b pb-4'
                >
                    <div className='flex items-start gap-x-2'>
                        <div className='w-14 h-14 relative rounded-lg'>
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill='true'
                                className='object-contain'
                            />
                        </div>
                    </div>
                    <p>{item.name}</p>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <p className='mr-auto'>{item.price * item.quantity}</p>
                            <p>ج.م</p>
                        </div>
                        {mode === 'cart' ? (
                            <div >
                                <DecreaseQuantity cartItemId={item.cartItemId} />
                                <span className='mx-2'>{item.quantity}</span>
                                <IncreaseQuantity cartItemId={item.cartItemId} />
                            </div>
                        ) : (
                            <div>
                                <Button
                                    onClick={() =>
                                        setItems(prev =>
                                            prev.map(i =>
                                                i.id === item.id
                                                    ? { ...i, quantity: Math.max(1, i.quantity - 1) }
                                                    : i
                                            )
                                        )
                                    }
                                >
                                    -
                                </Button>

                                <span className='mx-2'>{item.quantity}</span>

                                <Button
                                    onClick={() =>
                                        setItems(prev =>
                                            prev.map(i =>
                                                i.id === item.id
                                                    ? { ...i, quantity: i.quantity + 1 }
                                                    : i
                                            )
                                        )
                                    }
                                >
                                    +
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            ))}
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
