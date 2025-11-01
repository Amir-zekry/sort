import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function BuyNowButton({ id }) {
    return (
        <Link href={`/checkout/${id}`} className='fixed bottom-6 left-6 my-0 py-0 space-y-0'>
            <Button>اشتري الان</Button>
        </Link>
    )
}

export default BuyNowButton