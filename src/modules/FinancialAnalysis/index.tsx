import React from 'react'
import Banner from './Components/Banner'
import { FaqData } from '../../constants/faq-data'
import Financial from './Components/Financial'

const FinancialAnalysisModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/how-it-works-background.svg)] bg-no-repeat bg-cover bg-center pt-[72px]'>
      <Banner />
      <Financial />
    </section>
  )
}

export default FinancialAnalysisModule