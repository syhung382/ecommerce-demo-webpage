import type { SearchProps } from "../../utils/interface";

const Search = ({ value, onChange, placeholder }: SearchProps) => {
  return (
    <div className="w-full flex px-2 py-1">
      <input
        value={value}
        onChange={onChange}
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        className="py-2 p-4 flex-1 outline-none border border-gray-200 dark:border-gray-500 rounded-lg hover:border-blue-300 mx-2"
      />
    </div>
  );
};

export default Search;
