import Image from "next/image";
import Link from "next/link";
import React from "react";
import { images } from "../../../assets/images";
import ThemeToggle from "../../ThemeToggle";
import { useTheme } from "../../../context/themeContext";

interface IProps {
  children: any;
  signupText?: any;
  linkText?: any;
  linkUrl?: any;
  className?: any;
}

const AuthLayout = ({
  children,
  signupText,
  linkText,
  linkUrl,
  className,
}: IProps) => {
  const { isDarkMode } = useTheme();


  return (
    <div>
      <main id="main" className="main authlayout">
        <div className="grow">
          <div className="mx-auto flex h-full w-full max-w-[950px] flex-col px-5 py-8 pb-16 lg:p-8">
            <div className="mb-[100px] flex flex-col sm:flex-row items-center justify-between gap-5">
              <strong className="flex-shrink-0">
                <Link href={"/"} className="inline-block">
                  <Image src={isDarkMode ? images.lightLogo : images.logo} alt="logo" width={139} height={44} />
                </Link>
              </strong>
              <ThemeToggle />
            </div>
            <div className={`mx-auto w-full grow max-w-[378px] overflow-hidden ${className}`}>
              {children}
            </div>
            <p className="mt-4 text-center text-sm text-black dark:text-white max-w-[378px] mx-auto">
                By signing in or creating an account, you agree with our{" "}
                <Link href={"/terms-and-conditions"} className="text-cornflowerBlue">
                Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href={"/privacy-policy"} className="text-cornflowerBlue">
                  Privacy Statement
                </Link>
              .
              </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;