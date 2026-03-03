import Products from "@/features/items/components/products"


export async function generateStaticParams() {
    const categories = ['personal-care', 'wardrobe', 'fitness']
    return categories.map(category => ({ slug: category }))
}

function Page({ params }) {
    return (
        <Products params={params} />
    )
}

export default Page