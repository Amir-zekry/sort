async function OrderId({ searchParams }) {
    const { orderId } = await searchParams
    return (
        <p className="text-lg text-gray-700 flex items-center gap-3">
            رقم طلبك هو:
            <span className="font-semibold">{orderId}</span>
        </p>
    )
}

export default OrderId
