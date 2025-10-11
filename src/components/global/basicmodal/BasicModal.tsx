import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import CommonTooltip from "../../ComonTooltip";

interface Iprops {
  readonly className?: string;
  readonly children: any;
  readonly show: any;
  readonly hide: any;
  readonly state?: any;
  readonly setstate?: any;
  readonly minimize?: any;
  readonly afterClose?: any;
  readonly close?: any;
  readonly crosstyle?: string;
  readonly notOnsideclick?: any;
  readonly overlayClass?: any;
  readonly closeBtn?: any
  readonly closeTooltipText?: string;
  readonly closeTooltipPosition?: "left" | "right" | "top" | "bottom" | "topResponsive";
}
export default function BasicModal({
  show,
  hide,
  close,
  state,
  setstate,
  children,
  minimize,
  crosstyle,
  className,
  afterClose,
  notOnsideclick,
  overlayClass,
  closeBtn,
  closeTooltipText,
  closeTooltipPosition = "left"
}: Readonly<Iprops>) {
  return (
    <Transition.Root show={show} as={Fragment} afterLeave={afterClose}>
      <Dialog as="div" className="fixed inset-0 z-[200] overflow-y-auto" onClose={hide}>

        {/* Close Button */}
        {closeBtn && <button
          className="absolute right-2 top-5  dark:text-black text-white bg-black dark:bg-white p-2 flex gap-1 justify-center items-center rounded-full cursor-pointer z-20"
          onClick={() => {
            hide(false);
          }}
        >
          <RxCross2 />
          close
        </button>}
        <div className="flex items-center justify-center min-h-full pt-4 px-4 md:px-8 py-4 md:py-10 text-center md:p-0">
          <Transition.Child>
            <Dialog.Overlay
              className={`fixed inset-0 bg-black bg-opacity-80 transition-opacity ${notOnsideclick ? "pointer-events-none" : ""}
               ${overlayClass}
              `}
            />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 transform-[scale(95%)]"
            enterTo="opacity-100 transform-[scale(100%)]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 transform-[scale(100%)]"
            leaveTo="opacity-0 transform-[scale(95%)]"
          >
            <div className={`inline-block sm:w-auto sm:ml-0 w-full text-center transform transition-all align-middle ${className}`}>
              <div
                className={`${close ? "hidden" : "flex"
                  } ${crosstyle} absolute top-5 right-5 flex justify-center items-center z-50 dark:text-white`}
              >
                {closeTooltipText ? (
                  <CommonTooltip name={closeTooltipText} position={closeTooltipPosition} parentClassName="!group">
                    <button
                      type="button"
                      className="w-5 h-5 border dark:border-white opacity-40 rounded-full text-sm flex items-center justify-center focus:outline-none"
                      onClick={() => {
                        hide(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <AiOutlineClose className="stroke-2 text-xs" />
                    </button>
                  </CommonTooltip>
                ) : (
                  <button
                    type="button"
                    className="w-5 h-5 border dark:border-white opacity-40 rounded-full text-sm flex items-center justify-center  focus:outline-none"
                    onClick={() => {
                      hide(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <AiOutlineClose className="stroke-2 text-xs" />
                    {/* <i className="icon-cross" aria-hidden="true" /> */}
                  </button>
                )}
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
