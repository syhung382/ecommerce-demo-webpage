import HomeBlogItem from "./HomeBlogItem";

const HomeBlog = () => {
  return (
    <div className="mt-20 w-full max-w-[99vw] overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-950 dark:text-blue-800 px-4">
        Blog
      </h2>

      <div className="mt-10 w-full overflow-hidden grid grid-cols-1 lg:grid-cols-3 px-10 lg:px-40 xl:px-60 gap-4">
        <HomeBlogItem />
        <HomeBlogItem />
        <HomeBlogItem />
      </div>
    </div>
  );
};

export default HomeBlog;
