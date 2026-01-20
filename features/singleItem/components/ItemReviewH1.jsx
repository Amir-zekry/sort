'use client'
import { motion } from "framer-motion"

function ItemReviewH1() {
    return (
        <motion.h1
            className='flex w-full items-center justify-center md:text-2xl text-6xl'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            مراجعة المنتج
        </motion.h1>
    )
}

export default ItemReviewH1