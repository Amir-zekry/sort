'use client'
import { motion } from "framer-motion"
function FeaturesH1() {
    return (
        <motion.h1
            className='flex w-full items-center justify-center text-9xl mb-44'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            مميزات المنتج
        </motion.h1>
    )
}

export default FeaturesH1