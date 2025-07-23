import BlogSiderBarCategory from "./BlogSiderBarCategory";
import BlogSiderBarOffer from "./BlogSiderBarOffer";
import BlogSiderBarRecentPost from "./BlogSiderBarRecentPost";
import BlogSiderBarSearch from "./BlogSiderBarSearch";
import BlogSiderBarTag from "./BlogSiderBarTag";

const BlogSiderBar = () => {
  return (
    <>
      <BlogSiderBarSearch />
      <BlogSiderBarCategory />
      <BlogSiderBarRecentPost />
      <BlogSiderBarOffer />
      <BlogSiderBarTag />
    </>
  );
};

export default BlogSiderBar;
