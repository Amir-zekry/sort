"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { createOrder } from "@/features/checkout/server/actions"
import { useActionState } from "react"
import ShippingInfo from "./shippingInfo"
import PaymentMethod from "./PaymentMethod"

export default function CheckoutForm({ userId, shippingInfo }) {

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
            <form action={formAction} className="space-y-4 md:min-w-[30vw] md:max-w-[30vw] ">
                <ShippingInfo shippingInfo={shippingInfo} />
                <PaymentMethod />
                <input type="hidden" name="userId" value={userId} />
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