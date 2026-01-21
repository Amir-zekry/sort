import React, { Suspense } from 'react'
import Hero from '@/features/singleItem/components/Hero'
import Features from '@/features/singleItem/components/Features'
import Faq from '@/features/singleItem/components/Faq'
import WhyUs from '@/features/singleItem/components/WhyUs'
import ItemGallery from '@/features/singleItem/components/ItemGallery'
import CustomerReviews from '@/features/singleItem/components/CustomerReviews'
import BuyNow from '@/features/singleItem/components/BuyNow'
import Cart from '@/features/cart/components/Cart'
import HeroSkeleton from '@/features/singleItem/skeletons/HeroSkeleton'
import FeaturesSkeleton from '@/features/singleItem/skeletons/FeaturesSkeleton'
import ItemsGallerySkeleton from '@/features/singleItem/skeletons/ItemsGallerySkeleton'
import CustomerReviewsSkeleton from '@/features/singleItem/skeletons/CustomerReviewsSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
async function Item({ params }) {
    const { id } = await params
    return (
        <div className='space-y-2 relative'>
            <Suspense fallback={<Skeleton className='fixed top-4 left-4 z-50 rounded-full p-4 w-14 h-14 flex items-center justify-center'/>}>
                <div className=' absolute top-4 left-4 text-black z-50 rounded-full p-4 w-14 h-14 flex items-center justify-center bg-linear-to-r from-purple-500 to-pink-500 shadow-lg'>
                    <Cart />
                </div>
            </Suspense>
            <Suspense fallback={<HeroSkeleton />}>
                <Hero itemId={id} />
            </Suspense>
            <Suspense fallback={<FeaturesSkeleton />}>
                <Features itemId={id} />
            </Suspense>
            <Suspense fallback={<ItemsGallerySkeleton />}>
                <ItemGallery itemId={id} />
            </Suspense>
            <Suspense fallback={<CustomerReviewsSkeleton />}>
                <CustomerReviews id={id} />
            </Suspense>
            <WhyUs />
            <Faq />
            <BuyNow id={id} />
        </div>
    )
}

export default Item