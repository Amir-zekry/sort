'use client'
import { motion } from "framer-motion"

function ItemReviewH1() {
    return (
        <motion.h1
            className='flex w-full items-center justify-center text-9xl'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            مراجعة المنتج
        </motion.h1>
    )
}

export default ItemReviewH1