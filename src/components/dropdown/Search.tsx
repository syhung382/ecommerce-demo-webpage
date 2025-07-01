import type { SearchProps } from "../../utils/interface";

const Search = ({ value, onChange, placeholder }: SearchProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      autoComplete="off"
      type="text"
      placeholder={placeholder}
      className="py-[10px] p-4 outline-none w-full border border-gray-200 dark:border-gray-500 rounded-lg"
    />
  );
};

export default Search;
