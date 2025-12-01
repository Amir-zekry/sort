'use client'

import { Copy } from "lucide-react"
import { useState } from "react"

function OrderId({ orderId }) {
    const [copied, setCopied] = useState(false)

    const copyText = () => {
        navigator.clipboard.writeText(orderId)
        setCopied(true)

        setTimeout(() => setCopied(false), 1500) // hide after 1.5s
    }

    return (
        <p className="text-lg text-gray-700 flex items-center gap-3">
            رقم طلبك هو:
            <span className="font-semibold">{orderId}</span>

            <button
                type="button"
                onClick={copyText}
                className="text-blue-600 text-sm flex items-center"
            >
                <Copy size={20} className="hover:scale-90 cursor-pointer" />
            </button>

            {copied && (
                <span className="text-green-600 text-sm">
                    ✔ تم النسخ
                </span>
            )}
        </p>
    )
}

export default OrderId
