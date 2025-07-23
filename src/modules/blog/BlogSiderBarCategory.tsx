import BlogSiderBarCategoryItem from "./BlogSiderBarCategoryItem";

const BlogSiderBarCategory = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xm font-bold text-blue-950 dark:text-blue-700">
        Danh mục
      </h3>
      <div className="flex flex-wrap gap-2">
        <BlogSiderBarCategoryItem />
        <BlogSiderBarCategoryItem />
        <BlogSiderBarCategoryItem />
        <BlogSiderBarCategoryItem />
      </div>
    </div>
  );
};

export default BlogSiderBarCategory;
