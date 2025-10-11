import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { CoreFeaturesData } from '../../constants/core-features-data'

const CoreFeaturesTable = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <tbody className="space-y-2">
                    {CoreFeaturesData.map((item, index) => {
                        return (
                            <tr key={uuidv4()} className='relative group'>
                                <td className="whitespace-nowrap py-4 md:py-6 text-sm md:text-base text-gray-500 border-t border-linkWater dark:border-blackRussian3 dark:text-white">{item.features}</td>
                                <td className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-sm md:text-base text-gray-500 border-t border-linkWater dark:border-blackRussian3">{item.icon1}</td>
                                <td className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-sm md:text-base text-themeColor border-t border-linkWater dark:border-blackRussian3">{item.icon2}</td>
                                <td className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-sm md:text-base text-themeColor border-t border-linkWater dark:border-blackRussian3">{item.icon3}</td>
                                <td className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-sm md:text-base text-themeColor border-t border-linkWater dark:border-blackRussian3">{item.icon4}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CoreFeaturesTable