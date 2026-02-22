"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/app/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { createOrderWhenNoShippingInfo } from "@/features/checkout/server/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import PaymentMethod from "./PaymentMethod"
function CheckoutFormForNoShippingInfo() {
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
    const [state, formAction, loading] = useActionState(createOrderWhenNoShippingInfo, initialState)
    useEffect(() => {
        if (state.success === true) {
            toast.success(state.message)
        }
    }, [state])
    return (
        <Form {...form} >
            <form action={formAction} className="space-y-4 md:min-w-[30vw] md:max-w-[30vw]" >
                <Card>
                    <CardHeader>
                        <CardTitle>بيانات الشحن</CardTitle>
                    </CardHeader>
                    <CardContent className={'space-y-2'}>
                        <FormField
                            control={form.control}
                            name="FullName"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>الاسم بالكامل</FormLabel>
                                        <FormMessage>
                                            {state.errors?.FullName || <span className="invisible">placeholder</span>}
                                        </FormMessage>
                                    </div>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="PhoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>رقم الهاتف</FormLabel>
                                        <FormMessage>
                                            {state.errors?.PhoneNumber || <span className="invisible">placeholder</span>}
                                        </FormMessage>
                                    </div>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Governorate"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>المحافظه</FormLabel>
                                        <FormMessage>
                                            {state.errors?.Governorate || <span className="invisible">placeholder</span>}
                                        </FormMessage>
                                    </div>
                                    <FormControl>
                                        <Select
                                            value={field.value}  // ← Missing
                                            onValueChange={field.onChange}  // ← Missing
                                            dir='rtl'
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="اختر المحافظة" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Cairo">القاهرة</SelectItem>
                                                <SelectItem value="Giza">الجيزة</SelectItem>
                                                <SelectItem value="Alexandria">الإسكندرية</SelectItem>
                                                <SelectItem value="Aswan">أسوان</SelectItem>
                                                <SelectItem value="Asyut">أسيوط</SelectItem>
                                                <SelectItem value="Beheira">البحيرة</SelectItem>
                                                <SelectItem value="Beni Suef">بني سويف</SelectItem>
                                                <SelectItem value="Dakahlia">الدقهلية</SelectItem>
                                                <SelectItem value="Damietta">دمياط</SelectItem>
                                                <SelectItem value="Faiyum">الفيوم</SelectItem>
                                                <SelectItem value="Gharbia">الغربية</SelectItem>
                                                <SelectItem value="Ismailia">الإسماعيلية</SelectItem>
                                                <SelectItem value="Kafr El Sheikh">كفر الشيخ</SelectItem>
                                                <SelectItem value="Luxor">الأقصر</SelectItem>
                                                <SelectItem value="Matruh">مطروح</SelectItem>
                                                <SelectItem value="Minya">المنيا</SelectItem>
                                                <SelectItem value="Monufia">المنوفية</SelectItem>
                                                <SelectItem value="Port Said">بورسعيد</SelectItem>
                                                <SelectItem value="Qalyubia">القليوبية</SelectItem>
                                                <SelectItem value="Qena">قنا</SelectItem>
                                                <SelectItem value="Red Sea">البحر الأحمر</SelectItem>
                                                <SelectItem value="Sharqia">الشرقية</SelectItem>
                                                <SelectItem value="Sohag">سوهاج</SelectItem>
                                                <SelectItem value="Suez">السويس</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <input
                                        type="hidden"
                                        name="Governorate"
                                        value={field.value || ""}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Address"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>العنوان</FormLabel>
                                        <FormMessage>
                                            {state.errors?.Address || <span className="invisible">placeholder</span>}
                                        </FormMessage>
                                    </div>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ملاحظات اضافية</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent >
                </Card >
                <PaymentMethod />
                <div className="flex justify-start">
                    <Button
                        disabled={loading}
                        className={`cursor-pointer w-full ${loading ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
                        type="submit">تاكيد</Button>
                </div>
            </form>
        </Form >
    )
}
export default CheckoutFormForNoShippingInfo