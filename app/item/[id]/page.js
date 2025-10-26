import React from 'react'
import Hero from './Hero'
import Features from '../Features'
import FeaturesH1 from './FeaturesH1'

async function Item({ params }) {
    const { id } = await params
    return (
        <div>
            <Hero id={id} />
            {/* <MainFeature /> */}
            <FeaturesH1 />
            <Features id={id} />
        </div>
    )
}

export default Item