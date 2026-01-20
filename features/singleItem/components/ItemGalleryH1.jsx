'use client'
import { motion } from "framer-motion"
function ItemGalleryH1() {
    return (
        <motion.h1
            id='features'
            className='flex w-full items-center justify-center text-2xl mb-20'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
        >
            معرض الصور
        </motion.h1>
    )
}

export default ItemGalleryH1