import React from 'react'
import { getProducts } from '../data'
import ProductCard from './productCard'


async function Products({ category, sort, search }) {
    const products = await getProducts(category, sort, search)
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Products