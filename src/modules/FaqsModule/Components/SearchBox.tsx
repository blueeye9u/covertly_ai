import { FiSearch } from 'react-icons/fi';

interface SearchBoxProps {
    readonly value: string;
    readonly onChange?: (value: string) => void;
    readonly onSubmit?: (value: string) => void;
}

export default function SearchBox({ value, onChange, onSubmit }: SearchBoxProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(value);
            }}
            className="w-full max-w-3xl mx-auto"
        >
            <div className="flex items-center bg-[#1C1D22] text-white border border-[#191C22] rounded-xl px-4 py-3 shadow-sm focus-within:ring-1 focus-within:ring-gray-400">
                <input
                    type="text"
                    placeholder="Search for a question..."
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[#D0D2DA]"
                />
                <button type="submit" className="text-gray-400 hover:text-white transition pr-5">
                    <FiSearch size={30} />
                </button>
            </div>
        </form>
    );
}