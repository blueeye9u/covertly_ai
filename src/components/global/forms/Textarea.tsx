import { clsx } from "clsx";
import { ErrorMessage } from "formik";

interface SsProps {
  sm: string;
  lg: string;
  md: string;
}

interface Iprops {
  placeholder: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: string;
  spanClass?: string;
  name?: string;
  rest?: any;
  register?: any;
  value?: any;
  onChange?: Function;
  max?: any;
  min?: any;
  step?: any;
  prefix?: any;
  pattern?: any;
  title?: string;
  disabled?: boolean;
  error?: any;
  autoFocus?: boolean;
  onBlur?: any;
}

const sizeStyles: SsProps = {
  sm: "form-control-sm",
  md: "form-control-md",
  lg: "form-control-lg",
};

const Textarea = ({
  placeholder,
  size = "md",
  className,
  value,
  onChange,
  type,
  register,
  max,
  min,
  step,
  pattern,
  title,
  disabled,
  error,
  autoFocus,
  onBlur,
  ...rest
}: Iprops) => {
  return (
    <>
      <div className="relative w-full">
        <textarea
          type={type ?? "text"}
          className={clsx(className, sizeStyles[size], "form-control resize-none input-text user-input-wrp relative px-6 py-[1rem] md:py-[1.125rem] border-2 border-secondary rounded-lg")}
          pattern={pattern}
          max={max}
          step={step}
          title={title}
          min={min}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          {...(register !== undefined && { ...register(rest.name) })}
          placeholder={placeholder}
          // disabled={disabled}
          {...rest}
        />
     
      </div>
      {error && <ErrorMessage className='text-danger text-sm w-full mt-1 block text-start' component={'p'} name={error} />}
    </>
  );
};

export default Textarea;
