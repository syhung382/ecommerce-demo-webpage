import BlogSiderBarTagItem from "./BlogSiderBarTagItem";

const BlogSiderBarTag = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xm font-bold text-blue-950 dark:text-blue-700">
        Tag
      </h3>
      <div className="flex flex-wrap gap-1">
        <BlogSiderBarTagItem />
        <BlogSiderBarTagItem />
        <BlogSiderBarTagItem />
        <BlogSiderBarTagItem />
        <BlogSiderBarTagItem />
      </div>
    </div>
  );
};

export default BlogSiderBarTag;
