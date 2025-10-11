import React from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { FaTiktok } from "react-icons/fa";
import { Button } from "../button/Button";
import ImageComponent from "../imageComponent/ImageComponent";
import { BsTwitterX, BsFillThreadsFill } from "react-icons/bs";
import ThemeToggle from "../../ThemeToggle";
import { ImFacebook2 } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { images } from "../../../assets/images";
import { GrYoutube } from "react-icons/gr";

const Footer = () => {
  const socialicons = [
    { href: "https://www.youtube.com/@CovertlyAI", icon: <GrYoutube size={36} /> },
    { href: "https://www.linkedin.com/in/covertly-ai-484791330/", icon: <SiLinkedin size={36} /> },
    { href: "https://www.facebook.com/people/Covertly-AI/61565421015666/", icon: <ImFacebook2 size={36} /> },
    { href: "https://www.threads.net/@covertly.ai", icon: <BsFillThreadsFill size={36} /> },
    { href: "https://x.com/CovertlyAI", icon: <BsTwitterX size={36} /> },
    { href: "https://www.tiktok.com/@covertlyai?lang=en", icon: <FaTiktok size={36} /> },
  ];
  const QuickLinks = [
    { href: "/", title: "Home" },
    { href: "/how-it-works", title: "How it Works" },
    { href: "/knowledge-hub", title: "Resources" },
    { href: "/pricing", title: "Pricing" },
  ];
  const UsefulLinks = [
    { href: "/privacy-policy", title: "Privacy Policy" },
    { href: "/terms-and-conditions", title: "Terms & Conditions" },
  ];

  return (
    <div>
      <footer className="rt-footer bg-whiteSmoke">
        <div className="container-landingpage">
          <div className="grid grid-cols-12 gap-x-2 lg:gap-x-6 xl:gap-x-14 pb-12">
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col">
                <Link href={"/"} className="shrink-0 mb-6">
                  <ImageComponent
                    priority
                    width={305}
                    height={46}
                    className="object-contain"
                    src={images.lightLogo}
                    figClassName="w-[336px] h-auto"
                  />
                </Link>
                <p className="text-ghost2 text-[14px]">
                  {"Revolutionize Your Workflow with Advanced,"}
                </p>
                <p className="text-ghost2 text-[14px] mb-6">
                  {"Anonymous, and Secure AI Solutions"}
                </p>
                {/* <span className="dark:text-white text-base mb-5">support@covertly.ai</span> */}
                <div className="flex">
                  <ThemeToggle className=""/>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 md:mt-[50px] lg:mt-0">
              <div className="grid grid-cols-12 col-span-12 xs:mt-[20px]">
                <div className="col-span-6 flex flex-col gap-6">
                  <p className="text-[20px] font-medium text-mediumTurquoise">
                    Quick Links
                  </p>
                  <Menu as={"ul"} className="flex flex-col gap-2 md:gap-6">
                    {QuickLinks?.map((item, i) => {
                      return (
                        // change i into item.title
                        <Menu.Item as={"li"} className="" key={item.title}>
                          <Link
                            href={item.href}
                            className="text-white text-[16px] hover:text-primary-100"
                          >
                            {item.title}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </div>
                <div className="col-span-6 col-start-7 flex flex-col gap-6">
                  <p className="text-[20px] font-medium text-mediumTurquoise">
                    Legal
                  </p>
                  <Menu as={"ul"} className="flex flex-col gap-2 md:gap-6">
                    {UsefulLinks?.map((item, i) => {
                      return (
                        <Menu.Item as={"li"} className="" key={item.title}>
                          <Link
                            href={item.href}
                            className="text-white text-[16px] hover:text-primary-100"
                          >
                            {item.title}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </div>
              </div>
            </div>
            <div className="col-span-12 mt-12 md:col-span-6 lg:col-span-4 lg:mt-0">
              <div className="flex flex-col gap-6">
                <p className="text-[20px] font-medium text-mediumTurquoise">
                  Stay in Touch
                </p>
                <form>
                  <div className="form-group flex flex-col gap-6">
                    <label htmlFor="subscribe-email" className="text-ghost2 mb-0 text-[16px]">
                      Subscribe for news, updates, tips and offers.
                    </label>
                    <div className="flex gap-[8px]">
                      <input
                        type="email"
                        id="default-search"
                        className="w-full h-[40px] rounded-[6px] border-0  px-[16px] py-[5px] text-[14px] bg-black text-white"
                        placeholder="Email"
                        required
                      />
                      <Button
                        size="sm"
                        color="primary"
                        className="flex bg-black h-[40px] flex-shrink-0 items-center justify-center py-[10px] px-[16px] rounded-[6px]"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <Menu as={"ul"} className="flex justify-between w-full">
                       {socialicons?.map((item, i) => {
                         return (
                           <Menu.Item as={"li"} className="" key={item.href}>
                             <Link
                               href={item.href}
                               target="_blank"
                               className="w-[36px] h-[36px] flex items-center justify-center hover:text-primary-100 text-frenchgray"
                             >
                               {item.icon}
                             </Link>
                           </Menu.Item>
                         );
                       })}
                     </Menu>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="border-tuna2 flex md:flex-row flex-col gap-2 pt-[10px] pb-14 md:items-center justify-between items-start border-t-[2px] text-left">
            <p className="w-full fs-16 mb-0 text-tuna2 text-[14px] flex items-center justify-start gap-x-5 flex-wrap">
              <span className="text-tuna2 whitespace-nowrap">support@covertly.ai</span>   <span className="text-tuna2 whitespace-nowrap">Privacy Policy</span>   <span className="text-tuna2 whitespace-nowrap">Terms & Conditions</span>
            </p>
            <p className="fs-16 mb-0 text-tuna2 text-[16px] whitespace-nowrap">
              Copyright © {new Date().getFullYear()} Covertly. All Rights Reserved.
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
