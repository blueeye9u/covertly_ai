import React from 'react'
import MetaTags from '../../components/config/MetaTags'
import LandingLayout from '../../components/global/layout/landingLayout'
import BlogModule from '../../modules/BlogModule/BlogModule'

const Blog = () => {
    return (
        <>
            <MetaTags title="Blog" />
            <LandingLayout>
                <BlogModule />      
            </LandingLayout>
        </>
    )
}

export default Blog