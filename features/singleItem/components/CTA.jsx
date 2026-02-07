import React from 'react'
import BuyNow from './BuyNow'

function CTA({ id }) {
    return (
        <div className='flex justify-center my-5'>
            <BuyNow id={id} />
        </div>
    )
}

export default CTA