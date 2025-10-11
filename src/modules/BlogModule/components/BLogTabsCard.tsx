import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BLogTabsCard = ({ BlogsData }: any) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-6 w-full'>
            {BlogsData.map((item: any) => (
                <Link key={item.id} href={`/blogs/${item.id}`} passHref>
                    <div className='w-full cursor-pointer'>
                        <figure className='mb-5'>
                            <Image src={item.img} alt={item.title} width={391} height={220} className='w-full rounded-2xl' />
                        </figure>
                        <div>
                            <div className='flex items-center justify-between mb-4'>
                              {item.category&&  <button className='px-4 py-2 text-sm rounded-full bg-[#30C5D21F] text-[#30C5D2] cursor-default'>{item.category}</button>}
                                <p className='text-sm text-manatee'>{item.date}</p>
                            </div>
                            <h5 className='fs-24 font-bold mb-3'>{item.title}</h5>
                            <p className='dark:text-white text-blackRussian3 mb-4 line-clamp-2'>{item.desc}</p>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-manatee pr-4 border-r border-manatee">{item.name}</span>
                                <span className="text-sm text-manatee">{item.duration}</span>
                            </div>

                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default BLogTabsCard
