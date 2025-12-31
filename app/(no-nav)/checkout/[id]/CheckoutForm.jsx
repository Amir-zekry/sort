"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createOrder } from "@/app/actions"
import { useActionState, useState } from "react"
import ProductData from './ProductData'
import { Separator } from '@/components/ui/separator'
import { useEffect } from "react"
export default function CheckoutForm({ price, id, image, name, note }) {
    const [quantity, setQuantity] = useState(1)
    const shipping = 45
    const [total, setTotal] = useState(shipping + price * quantity)
    useEffect(() => {
        setTotal(shipping + quantity * price)
    }, [quantity])
    const form = useForm({
        defaultValues: {
            FullName: '',
            PhoneNumber: '',
            Governorate: '',
            Address: '',
            Notes: '',
            quantity: quantity,
        }
    })
    const initialState = { loading: false, errors: {} }
    const [state, formAction, loading] = useActionState(createOrder, initialState)
    return (
        <div className="flex md:flex-row flex-col-reverse h-screen justify-center md:items-start items-center gap-y-5 px-5 md:gap-x-10 py-10 bg-black">

            <Form {...form} >
                <div className='flex flex-col gap-y-8 md:min-w-[40vw] md:max-w-[40vw] items-end'>
                    <h1 className="flex md:w-[30vw] w-full text-left text-3xl">بيانات الشحن</h1>
                    <form action={formAction} className="space-y-4 md:min-w-[30vw] md:max-w-[30vw] ">
                        <FormField
                            control={form.control}
                            name="FullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الاسم بالكامل</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage >{state.errors?.FullName}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="PhoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        رقم الهاتف <span className="text-purple-500">حروف انجليزية</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage >{state.errors?.PhoneNumber}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Governorate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>المحافظة</FormLabel>
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
                                    <FormMessage >{state.errors?.Governorate}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>العنوان</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage >{state.errors?.Address}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormLabel>طريقة الدفع</FormLabel>
                        <div className="flex gap-x-2 w-1/2 items-center p-4 border-2 border-purple-400 rounded-md">
                            <label className="text-nowrap">الدفع عند الاستلام</label>
                            <Input className='size-3/4' type='radio' value="cod" defaultChecked />
                        </div>
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
                        <input type="hidden" name="total" value={total} />
                        <input type="hidden" name="itemId" value={id} />
                        <input type="hidden" name="quantity" value={quantity} />
                        <div className="flex justify-start">
                            <Button
                                disabled={loading}
                                className='cursor-pointer'
                                type="submit">تاكيد</Button>
                        </div>
                    </form>
                </div>
            </Form>
            <Separator orientation="vertical" className="hidden md:block" />
            <Separator orientation="horizontal" className="block md:hidden" />
            <ProductData id={id} price={price} image={image} name={name} note={note} total={total} quantity={quantity} setQuantity={setQuantity} />
        </div>
    )
}