import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import NiceModal from "@ebay/nice-modal-react";
import { v4 as uuidv4 } from "uuid";
import { DeleteIcon, OptionsIcon } from "../../svgs/svg";

interface IProps {
  className?: string;
  chatId?: string;
  setDeleteChatLoading: any;
  setConversationMessages: any;
  setIsOpen?:any;
}

const ChatThreadActions = ({
  className,
  chatId,
  setDeleteChatLoading,
  setConversationMessages,
  setIsOpen
}: IProps) => {
  const handleDelModal = (modalName: string) => {
    NiceModal.show(modalName, {
      chatId,
      setDeleteChatLoading,
      setConversationMessages,
    });
  };
  const Nav = [
    {
      title: "Delete Chat",
      icon: <DeleteIcon />,
      onClick: () => handleDelModal("deleteModal"),
    },
  ];
 
  return (
    <Menu as="div" className={`relative h-4 w-4 ${className}`}>
            {() => ( 
              <>  
              <Menu.Button>
                <OptionsIcon />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="shadow-3xl absolute right-0 top-0 z-40 mt-0 w-40 ">
                  <div className="mt-8 rounded-lg border border-ebony bg-blackRussian2 p-0 lg:origin-top-right">
                    <Menu as={"ul"} className="">
                      {Nav.map((item) => (
                          <Menu.Item key={uuidv4()} as={"ul"}>
                            <li className="flex items-center gap-3 !px-2 text-sm text-white duration-300 hover:text-white/60">
                              <button
                                  className="flex cursor-pointer items-center w-full"
                                  onClick={item.onClick}
                              >
                                {item.icon && <i className="text-danger">{item.icon}</i>}
                                <span className="flex-shrink-0 text-white">
                                    {item.title}
                                </span>
                              </button>
                            </li>
                          </Menu.Item>
                      ))}
                    </Menu>
                  </div>
                </Menu.Items>
              </Transition>
              </>
            )}
    </Menu>
  );
};

export default ChatThreadActions;



