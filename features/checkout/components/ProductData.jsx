import { getCartItems } from "@/features/cart/server/data"
import ProductDataClient from "./productDataClient"
import { auth } from "@/features/authentications/utils/auth"

async function ProductData() {
    const session = await auth()
    const userId = session?.user?.id
    const cartItems = await getCartItems(userId)
    return (
        <ProductDataClient cartItems={cartItems} />
    )
}

export default ProductData
