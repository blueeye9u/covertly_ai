import React from "react";
import Image from "next/image";

const ThemeLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-20 flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <figure className="flex h-full w-full items-center justify-center">
        <Image
          width={200}
          height={200}
          alt="Theme Loader"
          src="/assets/images/theme-loader.gif"
          className="w-40 h-40 lg:h-[12.5rem] lg:w-[12.5rem] object-cover"
        />
      </figure>
    </div>
  );
};

export default ThemeLoader;
