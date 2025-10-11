import React from "react";
import Image from "next/image";
import { Container } from "../container/Container";

const InlineLoader = (style?: any) => {
  return (
    <div className="flex h-full w-full">
      <Container>
        <figure className="flex h-full w-full items-center justify-center">
          <Image
            width={200}
            height={200}
            alt="Theme Loader"
            src="/assets/images/theme-loader.gif"
            className="h-24 w-24 object-cover"
          />
        </figure>
      </Container>
    </div>
  );
};

export default InlineLoader;
