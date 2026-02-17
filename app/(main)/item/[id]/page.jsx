import React, { Suspense } from 'react'
import Hero from '@/features/singleItem/components/Hero'
import Features from '@/features/singleItem/components/Features'
import Faq from '@/features/singleItem/components/Faq'
import WhyUs from '@/features/singleItem/components/WhyUs'
import ItemGallery from '@/features/singleItem/components/ItemGallery'
import CustomerReviews from '@/features/singleItem/components/CustomerReviews'
import HeroSkeleton from '@/features/singleItem/skeletons/HeroSkeleton'
import FeaturesSkeleton from '@/features/singleItem/skeletons/FeaturesSkeleton'
import ItemsGallerySkeleton from '@/features/singleItem/skeletons/ItemsGallerySkeleton'
import CustomerReviewsSkeleton from '@/features/singleItem/skeletons/CustomerReviewsSkeleton'
import CTA from '@/features/singleItem/components/CTA'
async function Item({ params }) {
    const { id } = await params
    return (
        <div className='space-y-2 relative'>
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
            <CTA id={id} />
        </div>
    )
}

export default Item