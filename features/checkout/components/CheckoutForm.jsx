"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { createOrder } from "@/features/checkout/server/actions"
import { useActionState } from "react"
import ShippingInfo from "./shippingInfo"
import PaymentMethod from "./PaymentMethod"

export default function CheckoutForm({ shippingInfo }) {

    const form = useForm({
        defaultValues: {
            FullName: '',
            PhoneNumber: '',
            Governorate: '',
            Address: '',
            Notes: '',
        }
    })
    const initialState = { loading: false, errors: {} }
    const [state, formAction, loading] = useActionState(createOrder, initialState)

    return (
        <Form {...form} >
            <form action={formAction} className='md:w-1/3 w-full flex flex-col gap-y-4 h-auto md:border-l md:p-10'>
                <ShippingInfo shippingInfo={shippingInfo} />
                <PaymentMethod />
                <div className="flex justify-start">
                    <Button
                        disabled={loading}
                        className={`cursor-pointer w-full ${loading ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
                        type="submit">تاكيد</Button>
                </div>
            </form>
        </Form>
    )
}