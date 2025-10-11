import React from 'react'
import Input from '../../components/global/forms/Input'
import BlogTabs from './components/BlogTabs'
import BLogTabsCard from './components/BLogTabsCard';
import { BlogsData } from '../../constants/blogs-data';

const tabData = [
    { label: "All", content: <BLogTabsCard BlogsData={BlogsData}/> },
    { label: "AI & Privacy", content: <BLogTabsCard BlogsData={BlogsData}/> },
    { label: "Security Insights", content: <BLogTabsCard BlogsData={BlogsData}/> },
    { label: "Innovation & Tech", content: <BLogTabsCard BlogsData={BlogsData}/> },
    { label: "Company News", content: <BLogTabsCard BlogsData={BlogsData}/> },
  ];

const BlogModule = () => {
  return (
    <section className='container-landingpage py-10 pb-20 md:py-20 lg:py-[110px]'>
            <p className='text-[#30C5D2] text-lg text-center mb-4'>Read Our Blogs</p>
            <h4 className='fs-64 text-center dark:text-white mb-6 leading-tight'>Stay Updated on <span className='block'>Privacy-Focused AI & Innovation</span> </h4>
            <div className='max-w-[512px] mx-auto mb-7'>
            <Input placeholder={'Search'} label={"Search"} name={''} className='w-full'/>
        </div>
        <BlogTabs tabs={tabData} />

    </section>
  )
}

export default BlogModule

  

