import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import { images } from "../../assets/images";
import { Button } from "../global/button/Button";
import { ChatFilledIcon} from "../../svgs/svg";
import useLoggedInStatus from "../../hooks/useLoggedInStatus";
import { getCookie } from "../../utils/getCookie";
import { useConversation } from "../../context/conversation.context";
import { HttpService } from "../../services/base.service";
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from "../../constants/routes";
import { EGptModels } from "../../enums/gpt-models.enum";

const data = [
    {
        icon: <ChatFilledIcon />,
        title: "Data is anonymized and deleted."
    },
    {
        icon: <ChatFilledIcon />,
        title: "Secure 18-digit key login."
    },
    {
        icon: <ChatFilledIcon />,
        title: "High-level encryption."
    },
    {
        icon: <ChatFilledIcon />,
        title: "Multi-format media support."
    },
]

interface IProps {
    toggleSidebar: any;
    setToggleSidebar: any;
}

const DocumentSidebar = ({ toggleSidebar, setToggleSidebar }: IProps) => {
    const [isLoggedIn] = useLoggedInStatus();
    const router = useRouter();
    const { setSelected, setSelectedModel, setConversationMessages, setCurrentChatId, setCurrentChat, setChatMessages } = useConversation();
    const token = getCookie("token");

    const handleGoBack = () => {
        setSelected("");
        setSelectedModel("");
        setConversationMessages([]);
        setCurrentChatId("");
        setCurrentChat(null);
        setChatMessages([]);
        HttpService.setCookie("model", EGptModels.GPT_4);
        router.push(AUTHENTICATED_ROUTES.CHAT)
    }

    const handleSignIn = () => {
        router.push(UN_AUTHENTICATED_ROUTES.LOGIN as string)
    }

    return (
        <aside
            className={`DocumentSidebar gradient-bg px-5 ${toggleSidebar ? "DocumentSidebar__open" : "DocumentSidebar__close"
                }`}
        >
            <div className="DocumentSidebar__head mb-2.5 flex flex-col gap-2.5">
                <button
                    className="DocumentSidebar__burger__menu"
                    onClick={() => {
                        setToggleSidebar(!toggleSidebar);
                    }}
                >
                    <RxCross1 />
                </button>
                {isLoggedIn ? (
                    <strong className="mb-24 block">
                        <Link href={"/"} className="inline-block">
                            <Image src={images.lightLogo} alt="logo" width={139} height={44} />
                        </Link>
                    </strong>
                ) : (
                    <strong className="block">
                        <Link href="#" className="mb-24 inline-block">
                            <Image src={images.lightLogo} alt="logo" width={139} height={44} />
                        </Link>
                    </strong>
                )}
            </div>

            <div className="DocumentSidebar__body themeScrollbarOverflow DocumentSidebar__chatThread grow overflow-x-hidden">
                <h6 className="font-semibold mb-8 text-white">Choosing Covertly AI</h6>
                <ul className="flex flex-col gap-4 mb-6">
                    {
                        data.map((item) => (
                            <li key={uuidv4()} className="flex gap-2 items-center text-sm text-white"><span>{item.icon}</span>{item.title}</li>

                        ))
                    }
                </ul>
                {token ? (
                    <Button className="!py-2 !px-3 flex items-center justify-center w-full" onClick={handleGoBack}><IoIosArrowBack /> <span className="sm:block hidden">Back to Chats</span></Button>
                ) : (
                    <Button size="lg" type="button" color="primary" className="w-full" onClick={handleSignIn}>
                        Sign in
                    </Button>

                )}
            </div>

            <div className="DocumentSidebar__foot">
                <p className="mt-4 text-start text-sm text-white">
                    By accessing or using our platform, you agree to our{" "}
                    <Link href={"/terms-and-conditions"} className="text-cornflowerBlue">
                        Terms & Conditions
                    </Link>{" "}
                    &{" "}
                    <Link href={"/privacy-policy"} className="text-cornflowerBlue">
                        Privacy Statement
                    </Link>
                </p>
            </div>
        </aside>
    );
};

export default DocumentSidebar;
