import React from "react";
import { Label } from "./Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateIcon } from "../../../svgs/svg";
import { ErrorMessage } from "formik";
interface Iprops {
  placeholder: string;
  className?: string;
  maxDate?: any;
  minDate?: any;
  minTime?: any;
  maxTime?: any;
  SearchIcon?: string;
  onDateChange?: any;
  value?: any;
  disabled?: any;
  name?: string;
  error?: any;
}

const DatePickerComponent = ({
  className,
  maxDate,
  minDate,
  minTime,
  maxTime,
  onDateChange,
  value,
  SearchIcon,
  disabled,
  placeholder,
  error,
  name,
}: Iprops) => {
  return (
    <>
      <div className="user-input-wrp relative w-full rounded-md sm:rounded-lg border-2 border-secondary px-6 py-[9.46px] sm:py-4 md:py-[1.125rem]">
        <DatePicker
          name={name}
          showTimeSelect={false}
          minDate={minDate ? new Date(minDate) : null}
          maxDate={maxDate}
          autoComplete="off"
          selected={value ? new Date(value) : null}
          disabled={disabled}
          minTime={minTime ?? null}
          maxTime={maxTime ?? null}
          dateFormat="MMMM do, yyyy"
          popperClassName="rt-themedatepicker"
          onChange={onDateChange}
          className={`rt-datepickerinput form-control input-text cursor-pointer ${className}`}
        />
        <Label className="top-[10px] sm:top-[14px]">{value === "" && placeholder}</Label>
        <span className={`form-search-icon-group right-4 sm:right-[1.375rem] ${SearchIcon}`}>
          <DateIcon className="text-greysuit" />
        </span>
      </div>
      {error && (
        <ErrorMessage
          name="date"
          component="p"
          className="mt-1 block w-full text-start text-sm text-danger"
        />
      )}
    </>
  );
};

export default DatePickerComponent;
