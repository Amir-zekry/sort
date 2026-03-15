import React from 'react'
import { getShippingInfo } from '../server/data'
import CheckoutForm from './CheckoutForm'
import CheckoutFormForNoShippingInfo from './checkoutFormForNoShippingInfo'

async function FormChecker() {
    const shippingInfo = await getShippingInfo()
    return (
        <>
            {
                shippingInfo && shippingInfo.length > 0 ? (
                    <CheckoutForm shippingInfo={shippingInfo} />
                ) : (
                    <CheckoutFormForNoShippingInfo />
                )
            }
        </>
    )
}

export default FormChecker