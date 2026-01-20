import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function BuyNow({ id }) {
    return (
        <Link
            href={`/checkout/${id}`}
            className='flex justify-center my-10'
        >
            <Button> اشتري الآن 🚀 </Button>
        </Link>
    )
}

export default BuyNow
