import React from 'react';
import Head from 'next/head';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
}

const Seo: React.FC<SEOProps> = ({ title, description, canonical }) => {
    return (
        <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={canonical} />}
        </Head>
    );
};

export default Seo;