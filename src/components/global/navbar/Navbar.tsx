import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
import {
  CrossIcon,
  ThreeLinesManu,
} from "../../../svgs/svg";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import FeaturesDropdown from "../../NavbarDropdown/FeaturesDropdown";
import ResourcesDropdown from "../../NavbarDropdown/ResourcesDropdown";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const data = [
  {
    name: "How it works",
    current: true,
    href: "/how-it-works",
    dataname: "How it works",
    activeNavRoutes: ["/landing-page"],
  },
  {
    name: "Resources",
    current: true,
    href: "/resources",
    dataname: "Resources",
    activeNavRoutes: ["/resources"],
  },
  {
    name: "Home",
    current: true,
    href: "/",
    dataname: "Home",
    activeNavRoutes: ["/landing-page"],
  },
  {
    name: "Pricing",
    current: true,
    href: "/pricing",
    dataname: "Pricing",
    activeNavRoutes: ["/landing-page"],
  },
];

const isActive = (path: string, pathArray: string[]): boolean => {
  let isActivePath = false;

  for (let items of pathArray) {
    if (path.includes(items)) {
      isActivePath = true;
      break;
    }
  }
  return isActivePath;
};

const renderMenuItem = (item: any, i: number, router: any) => {

  if (i === 1) {
    return <FeaturesDropdown key={i} />;
  }
  
  if (i === 2) {
    return <ResourcesDropdown key={i} />;
  }

  return (
    <Menu.Item
      as={"li"}
      key={uuidv4()}
      className={classNames(
        item.href == router.pathname ? "!text-[#30C5D2]" : "",
        `px-5 lg:p-0`
      )}
    >
      <Link
        className={classNames(
          item.href == router.pathname ? "!text-[#30C5D2]" : "",
          isActive(router.pathname, item.activeNavRoutes) ? "lg:!text-white" : "hover:lg:text-white transition-all duration-[0.4s] ease-in-out dark:hover:text-white",
          `fs-16 group relative flex items-center gap-2 whitespace-nowrap font-Outfit lg:text-white dark:text-white`
        )}
        aria-current={item.current ? "page" : undefined}
        href={item.href}
        data-text={item.dataname}
      >
        {item.iocn}
        {item.name}
      </Link>
    </Menu.Item>
  );
};

export default function Navbar(props: any) {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  
  return (
    <nav className="flex items-center ml-auto lg:m-0">
      <button className="text-gray-700 h-9 w-10 rounded-md btn-primary p-1.5 outline-none lg:hidden xs:w-9" onClick={() => setNavbar(!navbar)}>
        {navbar ? <CrossIcon /> : <ThreeLinesManu />}
      </button>
      <div className={`absolute left-0 top-[4.5rem] z-30 max-h-[400px] sm:max-h-[600px] lg:max-h-auto flex w-full flex-grow flex-col space-x-4 space-y-3 lg:overflow-visible overflow-auto duration-300 ease-linear lg:static lg:z-10 lg:w-auto lg:flex-row lg:justify-between lg:space-x-0 lg:space-y-0 
        ${navbar ? "rounded-md bg-blackRussian2/90 p-4 lg:h-auto lg:rounded-none lg:bg-transparent lg:pb-0 lg:pt-0 text-white" : "mt-0 h-0 lg:h-auto"}`}>
        <Menu as={"ul"} className="headerNav flex w-full flex-col lg:items-center lg:justify-center lg:w-auto lg:flex-row lg:space-x-12 gap-5 lg:gap-0">
          {data.map((item: any, i: number) => renderMenuItem(item, i, router))}
        </Menu>
        {!props?.token && (
          <div className="flex sm:hidden items-center justify-center gap-3 lg:gap-4 xs:flex-col !m-0 !mt-3">
            <Link href={UN_AUTHENTICATED_ROUTES.LOGIN as string} className="btn-outline btn-outline-primary btn-lg !w-full text-white py-3 text-center">Sign in</Link>
            <Link href={UN_AUTHENTICATED_ROUTES.SIGNUP as string} className="btn btn-primary btn-lg block !w-full py-3 text-center">Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}