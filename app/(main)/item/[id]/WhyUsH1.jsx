'use client'
import { motion } from "framer-motion"
function WhyUsH1() {
    return (
        <motion.h1
            className='flex w-full items-center justify-center md:text-9xl text-6xl'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            ليه تختارنا؟
        </motion.h1>
    )
}

export default WhyUsH1