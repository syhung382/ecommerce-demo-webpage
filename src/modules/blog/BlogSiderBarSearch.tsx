import { IconSearch } from "../../components/icons";

const BlogSiderBarSearch = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xm font-bold text-blue-950 dark:text-blue-700">
        Tìm kiếm
      </h3>
      <div className="col-span-full lg:col-span-4 flex items-center gap-x-2 border border-gray-300 rounded px-2 py-1 bg-blue-50 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="flex-1 outline-none text-sm bg-transparent dark:text-gray-200"
        />
        <button className="text-gray-600 hover:text-pink-600 transition cursor-pointer">
          <IconSearch width={18} />
        </button>
      </div>
    </div>
  );
};

export default BlogSiderBarSearch;
