import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/router";
import useLoggedInStatus from "../../../hooks/useLoggedInStatus";
import { images } from "../../../assets/images";
import { Button } from "../button/Button";
import { IoIosArrowBack } from "react-icons/io";
import UserDropDown from "../userDropdown/UserDropdown";
import ImageComponent from "../imageComponent/ImageComponent";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import { ROUTES } from "../routes";
import { useConversation } from "../../../context/conversation.context";
import { HttpService } from "../../../services/base.service";
import { EGptModels } from "../../../enums/gpt-models.enum";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn] = useLoggedInStatus();
  const { setSelected, setSelectedModel } = useConversation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoBack = () => {
    setSelected("");
    setSelectedModel("");
    HttpService.setCookie("model", EGptModels.GPT_4);
    router.replace(ROUTES.chat);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 mb-[72px]
        ${isScrolled ? "backdrop-blur-lg shadow-md" : "bg-transparent"}
        backdrop-blur-[50px] bg-[#191C2280] lg:text-white
      `}
    >
      <div className="container-landingpage">
        <div className="flex items-center lg:justify-between gap-3 sm:gap-5 lg:gap-10 pt-4 pb-[20px]">
          <Link href={"/"} className="shrink-0">
            <ImageComponent
              priority
              fill={"fill"}
              className="object-contain"
              src={images.lightLogo}
              figClassName="w-[208px] h-7"
            />
          </Link>

          {/* Tablet mode: buttons on left side of hamburger menu */}
          {!isLoggedIn && (
            <div className="hidden md:flex lg:hidden items-center gap-3 ml-auto mr-1">
              <Link
                href={UN_AUTHENTICATED_ROUTES.LOGIN as string}
                className="btn-outline btn-outline-primary-landing btn-lg border-2 h-[40px] py-2 px-4 text-center border-box text-sm"
              >
                Sign in
              </Link>
              <Link
                href={UN_AUTHENTICATED_ROUTES.SIGNUP as string}
                className="btn btn-primary btn-lg h-[40px] py-2 px-4 text-center border-box border-2 border-transparent btn-addition text-sm"
              >
                Sign up
              </Link>
            </div>
          )}

          <Navbar token={isLoggedIn} />

          <div className="flex sm:gap-4 gap-2 items-center">
            {isLoggedIn && (
              <Button className="!py-2 !px-3 flex items-center justify-center" onClick={handleGoBack}>
                <IoIosArrowBack /> <span className="sm:block hidden">Back to Chats</span>
              </Button>
            )}

            {isLoggedIn && UN_AUTHENTICATED_ROUTES.home && <UserDropDown imgUrl={images.profileImg} />}

            {/* Desktop mode: buttons on right side */}
            {!isLoggedIn && (
              <div className="hidden lg:flex items-center justify-center gap-3 lg:gap-4 xs:flex-col">
                <Link
                  href={UN_AUTHENTICATED_ROUTES.LOGIN as string}
                  className="btn-outline btn-outline-primary-landing btn-lg border-2 !w-1/2 h-[40px] py-3 text-center border-box"
                >
                  Sign in
                </Link>
                <Link
                  href={UN_AUTHENTICATED_ROUTES.SIGNUP as string}
                  className="btn btn-primary btn-lg block !w-1/2 h-[40px] py-3 text-center border-box border-2 border-transparent btn-addition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
