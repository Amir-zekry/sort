import { Button } from '@/components/ui/button'
import React from 'react'

function AddToCart({ id }) {
    return (
        <Button className="cursor-pointer px-6 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95">
            اضافه الى عربة التسوق
        </Button>
    )
}

export default AddToCart