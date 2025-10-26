import React from 'react'
import Hero from './Hero'
import Features from './Features'
import FeaturesH1 from './FeaturesH1'
import Faq from './Faq'
import FaqH1 from './FaqH1'
import ItemReview from './ItemReview'
import ItemReviewH1 from './ItemReviewH1'

async function Item({ params }) {
    const { id } = await params
    return (
        <div className='space-y-20'>
            <Hero id={id} />
            {/* <MainFeature /> */}
            <FeaturesH1 />
            <Features id={id} />
            <ItemReviewH1 />
            <ItemReview />
            <FaqH1 />
            <Faq />
        </div>
    )
}

export default Item