import React from 'react'
import MetaTags from '../../components/config/MetaTags'
import LandingLayout from '../../components/global/layout/landingLayout'
import BlogDetail from '../../modules/BlogModule/components/BlogDetail'



const BlogDetailPage = () => {
    return (
        <>
            <MetaTags title="Blog Detail" />
            <LandingLayout>
                <BlogDetail />      
            </LandingLayout>
        </>
    )
}

export default BlogDetailPage