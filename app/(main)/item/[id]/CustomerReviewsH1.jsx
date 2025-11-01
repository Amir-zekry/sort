'use client'
import { motion } from "framer-motion"
function CustomerReviewsH1() {
    return (
        <motion.h1
            id='features'
            className='flex w-full items-center justify-center md:text-9xl text-6xl mb-20'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            تقييمات العملاء
        </motion.h1>
    )
}

export default CustomerReviewsH1