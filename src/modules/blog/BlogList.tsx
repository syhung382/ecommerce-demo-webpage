import PagingClient from "../../paging/PagingClient";
import BlogListItem from "./BlogListItem";

const BlogList = () => {
  return (
    <>
      <BlogListItem />
      <BlogListItem />
      <BlogListItem />
      <BlogListItem />
      <BlogListItem />
      <BlogListItem />

      <PagingClient page={1} totalPage={5} handleChangePage={() => {}} />
    </>
  );
};

export default BlogList;
