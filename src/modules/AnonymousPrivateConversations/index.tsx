import React from 'react'
import Banner from './Components/Banner'
import PrivateConversations from './Components/PrivateConversations'

const AnonymousPrivateConversations = () => {
  return (
    <section className='dark:bg-bg-athensgray dark:bg-blackRussian bg-no-repeat bg-cover bg-center pt-[72px]'>
      <Banner />
      <PrivateConversations />
    </section>
  )
}

export default AnonymousPrivateConversations