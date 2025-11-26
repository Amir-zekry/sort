import React from 'react'
import Hero from './Hero'
import Features from './Features'
import FeaturesH1 from './FeaturesH1'
import Faq from './Faq'
import FaqH1 from './FaqH1'
import ItemReview from './ItemReview'
import ItemReviewH1 from './ItemReviewH1'
import WhyUs from './WhyUs'
import WhyUsH1 from './WhyUsH1'
import ItemGallery from './ItemGallery'
import ItemGalleryH1 from './ItemGalleryH1'
import CustomerReviews from './CustomerReviews'
import CustomerReviewsH1 from './CustomerReviewsH1'
import HowToUse from './HowToUse'
import HowToUseH1 from './HowToUseH1'
import BuyNow from './BuyNow'
import { getProductById } from '@/app/data'
import KeySpecs from './keySpecs'
import KeySpecsH1 from './KeySpecsH1'
async function Item({ params }) {
    const { id } = await params
    const item = await getProductById(id)
    const name = item.name
    const description = item.discription
    const price = item.price
    const heroImage = item.heroImage
    const features = item.feature
    const images = item.imageGallery
    const heroImagePhone = item.heroImagePhone
    return (
        <div className='space-y-20 bg-black'>
            <Hero id={id} name={name} description={description} heroImage={heroImage} heroImagePhone={heroImagePhone} />
            {/* <MainFeature /> */}
            <FeaturesH1 />
            <Features features={features} />
            <ItemGalleryH1 />
            <ItemGallery images={images} />
            {/* <HowToUseH1 />
            <HowToUse /> */}
            {/* <ItemReviewH1 />
            <ItemReview /> */}
            <KeySpecsH1 />
            <KeySpecs />
            <CustomerReviewsH1 />
            <CustomerReviews id={id} />
            <WhyUsH1 />
            <WhyUs />
            <FaqH1 />
            <Faq />
            <BuyNow id={id} name={name} price={price} />
        </div>
    )
}

export default Item