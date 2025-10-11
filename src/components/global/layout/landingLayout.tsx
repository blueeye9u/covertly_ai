import React from 'react'
import {useRouter} from "next/router";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {getSEOByPath} from "../../../utils/getSEOByPath";

interface IProps {
    children: any;
    parentClass?: string
}

const LandingLayout = ({children, parentClass}: IProps) => {
    const {pathname} = useRouter();
    const {h1} = getSEOByPath(pathname);
    return (
        <div className={`${parentClass} flex flex-col flex-grow`}>
            <Header/>
            <main id="main" className="main flex-col">
                <h1 className="sr-only">{h1}</h1>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default LandingLayout