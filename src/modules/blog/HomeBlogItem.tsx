const HomeBlogItem = () => {
  return (
    <div className="flex-col dark:bg-gray-600/20">
      <img src="images/image-blog.png" alt="blog" className="w-full" />
      <div className="p-4">
        <div className="flex gap-6 text-sm font-semibold text-blue-900 dark:text-blue-700">
          <span>Kazu</span>
          <span>25/12/2000</span>
        </div>
        <h2 className="mt-5 text-xl font-bold text-blue-900 cursor-pointer dark:text-blue-700">
          Bài viết 1
        </h2>
        <div className=" text-gray-600 dark:text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </div>
        <button
          type="button"
          className="text-xl mt-5 text-blue-900 dark:text-blue-700 underline decoration-1 decoration-blue-600 underline-offset-4 cursor-pointer"
        >
          Đọc thêm
        </button>
      </div>
    </div>
  );
};

export default HomeBlogItem;
