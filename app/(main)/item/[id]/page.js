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
import BuyNowButton from './BuyNowButton'
async function Item({ params }) {
    const { id } = await params
    return (
        <div className='space-y-20 bg-black'>
            <Hero id={id} />
            {/* <MainFeature /> */}
            <FeaturesH1 />
            <Features id={id} />
            <ItemGalleryH1 />
            <ItemGallery id={id} />
            {/* <HowToUseH1 />
            <HowToUse /> */}
            {/* <ItemReviewH1 />
            <ItemReview /> */}
            <CustomerReviewsH1 />
            <CustomerReviews id={id} />
            <WhyUsH1 />
            <WhyUs />
            <BuyNowButton id={id} />
            <FaqH1 />
            <Faq />
        </div>
    )
}

export default Item