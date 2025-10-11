import React from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from "uuid";

const KnowledgeHubCard = ({ BlogsData }: any) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-6 w-full mb-20'>
            {BlogsData.map((item: any,i:any) => (
                    <div key={uuidv4()} className='w-full'>
                        <figure className='mb-5'>
                            <Image src={item.img} alt={item.title} width={391} height={220} className='w-full' />
                        </figure>
                        <div>
                            <div className='flex items-center justify-between mb-4'>
                              {item.category&&  <button className='px-4 py-2 text-sm rounded-full bg-[#30C5D21F] text-[#30C5D2] cursor-default'>{item.category}</button>}
                                <p className='text-sm text-manatee'>{item.date}</p>
                            </div>
                            <h5 className='fs-24 font-bold mb-3'>{item.title}</h5>
                            <p className='dark:text-white mb-4'>{item.desc}</p>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-manatee pr-4 border-r border-manatee">{item.name}</span>
                                <span className="text-sm text-manatee">{item.duration}</span>
                            </div>

                        </div>
                    </div>
            ))}
        </div>
    )
}

export default KnowledgeHubCard
