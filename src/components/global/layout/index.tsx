import Header from '../header/Header';
import React from 'react'

interface IProps {
  children: any;
  showHeader?: boolean;
  showFooter?: boolean
}

const Layout = ({ children, showHeader, showFooter }: IProps) => {
  return (
    <>
      <Header  />
      <main id="main" className="main layoutHeaderFooter">
        {children}
      </main>
    </>
  )
}

export default Layout