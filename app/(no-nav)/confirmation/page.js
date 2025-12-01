import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import React from "react"
import { FaTiktok, FaWhatsapp } from "react-icons/fa"
import OrderId from "./OrderId"

export default async function ConfirmationPage({ searchParams }) {
    const { orderId } = await searchParams
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center gap-y-4">
            <h1 className="text-2xl font-bold text-green-600">شكراً لطلبك!</h1>
            <OrderId orderId={orderId} />
            <p className="text-gray-600">
                خلال 24 ساعه هيتم التواصل معاك لتأكيد الطلب، وبعدها الشحن بيتم في خلال من 2 لـ 5 أيام عمل حسب محافظتك .
            </p>
            <p className="text-sm text-gray-500">
                لو عندك أي استفسار تقدر تبعتلنا في أي وقت ❤️
            </p>
            <div className="flex items-center gap-x-6">
                <Link
                    target="_blank"
                    href="https://www.tiktok.com/@sort7169">
                    <FaTiktok size={24} />
                </Link>
                <Separator orientation="vertical" className="h-6" />
                <Link
                    target="_blank"
                    href="https://wa.me/201552333223">
                    <FaWhatsapp size={24} />
                </Link>
            </div>
        </div>
    )
}
