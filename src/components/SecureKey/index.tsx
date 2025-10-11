import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface SecureKeyProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  handleError: (e: string) => void;
}

const SecureKey: React.FC<SecureKeyProps> = ({ value, handleChange, error, handleError }) => {
  const [formattedValue, setFormattedValue] = useState<string>(''); // Store formatted input (with dashes)
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formatInput = (input: string) => {
    const cleanedInput = input
        .split('')
        .filter(c => /[A-Za-z0-9]/.test(c))
        .join('')
        .slice(0, 18);
    const segments = [
      cleanedInput.slice(0, 5),
      cleanedInput.slice(5, 9),
      cleanedInput.slice(9, 13),
      cleanedInput.slice(13, 18)
    ].filter(Boolean); // remove empty segments
    return segments.join('-');
  };

  const handleInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectionStart = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;
    const original = input.value;

    // Remove non-alphanumeric characters
    const cleanedRaw = original.replaceAll(/[^A-Za-z0-9]/g, '');

    // If user selects and deletes characters
    const isDeletingRange = selectionStart !== selectionEnd;

    let newRawValue = cleanedRaw;

    if (isDeletingRange) {
      // Simulate deleting selected range from cleanedRaw
      const rawStart = cleanedRaw.slice(0, selectionStart);
      const rawEnd = cleanedRaw.slice(selectionEnd);
      newRawValue = rawStart + rawEnd;
    }

    const formatted = formatInput(newRawValue);
    setFormattedValue(formatted);

    const regex = /^[A-Za-z0-9]{18}$/;
    handleError(regex.test(newRawValue) ? '' : 'Invalid format. Use: XXXXX-XXXX-XXXX-XXXXX');

    // Pass raw value back to parent
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: formatted
      }
    };
    handleChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg relative">
        <input
          type={showPassword ? "text" : "password"}
          value={formattedValue}
          onChange={handleInternalChange}
          placeholder="*****-****-****-*****"
          className={`rounded-b-md py-5 bg-stormGrey dark:bg-blackRussian w-full text-center xs2:text-start sm:text-lg text-sm font-bold placeholder:text-[#585A5D] dark:text-white !border-none secure-key ${error ? 'border-red-500' : ''}`}
        />
        <button
            className="password__eye"
            onClick={handleTogglePassword}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
  );
};

export default SecureKey;
