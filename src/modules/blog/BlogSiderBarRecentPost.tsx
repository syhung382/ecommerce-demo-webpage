import BlogSiderBarRecentItem from "./BlogSiderBarRecentItem";

const BlogSiderBarRecentPost = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xm font-bold text-blue-950 dark:text-blue-700">
        Bài đăng gần đây
      </h3>
      <div className="flex flex-col gap-3">
        <BlogSiderBarRecentItem />
        <BlogSiderBarRecentItem />
        <BlogSiderBarRecentItem />
        <BlogSiderBarRecentItem />
      </div>
    </div>
  );
};

export default BlogSiderBarRecentPost;
