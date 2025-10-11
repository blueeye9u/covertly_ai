import { AiOutlineInfo } from 'react-icons/ai';
import { ReactNode } from 'react';
import CommonTooltip from '../../ComonTooltip';


interface AuthInfoSectionProps {
  readonly title: string;
  readonly tooltip?: string;
  readonly children? : ReactNode;
}

export default function AuthInfoSection({title, tooltip, children}: AuthInfoSectionProps): JSX.Element {

  return (
    <div className="p-6 flex flex-col items-center justify-center gap-6 relative border-2 border-linkWater dark:border-shark rounded-2xl">
      <div className="w-full flex justify-between items-center">
        <span className="dark:text-athensgray">
          {title}
        </span>
        {
          tooltip && (
            <CommonTooltip
              name={tooltip}
              position="top"
              className="!w-[310px] whitespace-normal"
            >
              <span className="border border-blackRussian dark:border-frenchgray p-[1px] flex justify-center items-center rounded-full text-frenchgray">
                <AiOutlineInfo/>
              </span>
            </CommonTooltip>
          )
        }
      </div>
      {children}
    </div>
  );
}