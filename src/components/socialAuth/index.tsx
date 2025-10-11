import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MicrosoftIcon } from "../../svgs/svg";
import AuthInfoSection from '../auth/common/AuthInfoSection';
import CommonTooltip from '../ComonTooltip';

const SocialAuthButton = ({
                            provider,
                            icon: Icon,
                            tooltipText,
                            iconProps,
                          }: {
  provider: string;
  icon: React.ElementType;
  tooltipText: string;
  iconProps?: React.ComponentProps<any>;
}) => {
  const handleLogin = async () => {
    globalThis.window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/social-auth/${provider}`;
  };

  return (
    <CommonTooltip
      name={tooltipText}
      position="top"
      className="!w-[170px] whitespace-normal text-center"
    >
      <button
        onClick={handleLogin}
        className="size-[50px] btn-outline text-blackrussian gap-2 flex justify-center items-center !rounded-md !border-linkWater dark:!border-tuna2 p-3 !font-normal capitalize text-black dark:text-white !text-sm"
      >
        <span className="p-[1px] flex justify-center items-center rounded-full">
            {
              iconProps ? (
                <div className="relative">
                  <span className="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[28px] rounded-full bg-white border-0 outline-0 p-0"></span>
                  <Icon className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[30px] text-3xl" {...iconProps}/>
                </div>
              ) : (
                <Icon className="text-3xl"/>
              )
            }
        </span>
      </button>
    </CommonTooltip>
  );
};

/**
 * SocialAuth component renders buttons for social authentication.
 * It provides options for users to log in using Google, Apple, Facebook and Microsoft.
 * @returns {JSX.Element} The JSX element representing the SocialAuth component.
 */
export default function SocialAuth(): JSX.Element {
  return (
    <AuthInfoSection
      title={"For convenience, use Single Sign-On"}
      tooltip={"We ensure your privacy by blocking all data transmitted by Google, accepting only your email for authentication purposes. This email is securely converted into a 12-digit unique ID, used solely to track your token count. We do not store, monitor or have access to any details about your activity, plus all data is deleted."}
    >
      <div className="w-full flex flex-row items-center justify-between gap-2">
        <SocialAuthButton
          provider="google"
          icon={FcGoogle}
          tooltipText="Sign in with Google"
        />
        <SocialAuthButton
          provider="apple"
          icon={FaApple}
          tooltipText="Sign in with Apple"
        />
        <SocialAuthButton
          provider="microsoft"
          icon={MicrosoftIcon}
          tooltipText="Sign in with Microsoft"
        />
        <SocialAuthButton
          provider="facebook"
          icon={FaFacebook}
          tooltipText="Sign in with Facebook"
          iconProps={{ color: "#1977F3" }}
        />
      </div>
    </AuthInfoSection>
  );
}
