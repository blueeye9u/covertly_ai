import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { DownArrowIcon } from '../../svgs/svg';

interface ListboxOption<T> {
  id: number;
  name: string;
  value: T;
}

interface SelectProps<T> {
  options: ListboxOption<T>[];
  selectedOption: ListboxOption<T>;
  onChange: (value: ListboxOption<T>) => void;
}

export function Select<T>({
  options,
  selectedOption,
  onChange,
}: Readonly<SelectProps<T>>) {
  return (
    <div className="relative sm:w-44 dark:text-white">
      <Listbox value={selectedOption} onChange={onChange}>
        <Listbox.Button
          className={clsx(
            'relative w-full rounded-md bg-linkWater dark:bg-vulcan py-2.5 px-3 text-sm text-left shadow-md',
          )}
        >
          {selectedOption.name}
         <span  className="absolute top-1/2 -translate-y-1/2 right-3  dark:text-white">
         <DownArrowIcon
            aria-hidden="true"
          />
         </span>
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-linkWater dark:bg-vulcan shadow-2xl',
            'focus:outline-none'
          )}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active, selected }) =>
                clsx(
                 'relative cursor-pointer select-none py-2 px-4 text-sm text-start',
                  // active ? '' : '',
                  // selected ? '' : ''
                  '', ''
                )
              }
            >
              {({ selected }) => (
                <div>
                  <span
                    className={clsx(
                      'block truncate',
                      //  selected ? '' : ''
                      ''
                    )}
                  >
                    {option.name}
                  </span>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
