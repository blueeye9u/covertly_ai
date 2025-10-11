import React from "react";
import Head from "next/head";
import { site } from "./site";

const MetaTags = ({ title }: { title: string }) => {
  return (
      <Head>
          <title>{`${site.name} | ${title}`}</title>
      </Head>
  );
};

export default MetaTags;
