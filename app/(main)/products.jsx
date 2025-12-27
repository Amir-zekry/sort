import React from 'react'
import { getProducts } from '../data'
import ProductCard from './productCard'


async function Products({ category }) {
    const products = await getProducts(category)
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Products