'use client'
import Image from 'next/image'
import IncreaseQuantity from '@/features/cart/components/IncreaseQuantity'
import DecreaseQuantity from '@/features/cart/components/DecreaseQuantity'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
function ProductDataClient({ cartItems }) {
    const [open, setOpen] = useState(true)
    const deliveryFee = 45
    const subtotal = cartItems.reduce(
        (sum, ci) => sum + ci.item.price * ci.quantity,
        0
    )
    const total = subtotal + deliveryFee
    return (
        <Collapsible open={open} onOpenChange={setOpen} className='md:w-1/3 md:sticky md:top-0 md:p-10'>
            <CollapsibleTrigger className={'md:hidden'} asChild>
                <div
                    className='bg-purple-500 p-1 mb-2'
                >
                    <motion.div
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 1.01 }}
                        transition={{
                            duration: 0.3,
                            type: 'spring',
                            stiffness: 500
                        }}
                        style={{
                            overflow: 'hidden'
                        }}
                        className='flex w-full space-x-2 text-center items-center justify-between'
                    >
                        <h1>ملخص الطلب</h1>
                        <p>
                            {open ? <ChevronDown /> : <ChevronUp />}
                        </p>
                    </motion.div>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{
                                height: 0,
                            }}
                            animate={{
                                height: "auto",
                            }}
                            exit={{
                                height: 0
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut'
                            }}
                            style={{ overflow: "hidden" }}
                        >
                            {cartItems.map(ci => (
                                <div
                                    key={ci.id}
                                    className='flex items-start justify-between pb-4'
                                >
                                    <div className='flex items-start'>
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
                            <div className='flex items-center justify-between '>
                                <h2>التوصيل</h2>
                                <div className='flex items-center gap-x-2 font-bold'>
                                    <p>{deliveryFee}</p>
                                    <p>ج.م</p>
                                </div>
                            </div>

                            <div className='flex items-center justify-between'>
                                <h2 className='font-bold'>المجموع</h2>
                                <div className='flex items-center gap-x-2 font-bold'>
                                    <p>{total}</p>
                                    <p>ج.م</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default ProductDataClient
