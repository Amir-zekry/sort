'use client'
import { motion } from "framer-motion"

function FaqH1() {
    return (
        <motion.h1
            className='flex w-full items-center justify-center text-9xl'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            الأسئلة الشائعة
        </motion.h1>
    )
}

export default FaqH1