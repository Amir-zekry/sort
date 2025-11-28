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
import { useActionState } from "react"
export default function CheckoutForm({ price, id }) {
    const form = useForm({
        defaultValues: {
            FullName: '',
            PhoneNumber: '',
            Governorate: '',
            Address: '',
            Notes: '',
            quantity: 1
        }
    })
    const initialState = { loading: false, errors: {} }
    const [state, formAction, loading] = useActionState(createOrder, initialState)
    return (
        <Form {...form} >
            <div className='flex flex-col gap-y-8 md:min-w-[40vw] md:max-w-[40vw] items-end'>
                <h1 className="flex md:w-[30vw] w-full text-left text-3xl">بيانات الشحن</h1>
                <form action={formAction} className="space-y-4 md:min-w-[30vw] md:max-w-[30vw] ">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الكميه</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="" {...field} />
                                </FormControl>
                                <FormMessage >{state.errors?.quantity}</FormMessage>
                            </FormItem>
                        )}
                    />
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
                                            <SelectItem value="Other">اخرى</SelectItem>
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
                    <input type="hidden" name="total" value={price} />
                    <input type="hidden" name="itemId" value={id} />
                    <div className="flex justify-start">
                        <Button
                            className='cursor-pointer'
                            type="submit">تاكيد</Button>
                    </div>
                </form>
            </div>
        </Form>
    )
}