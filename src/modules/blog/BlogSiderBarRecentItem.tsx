import { Link } from "react-router-dom";
import { clientSiderBarMenuPath } from "../../utils/constants";

const BlogSiderBarRecentItem = () => {
  return (
    <div className="grid grid-cols-10 gap-2 items-center">
      <div className="col-span-3 w-full h-[50px] cursor-pointer">
        <img
          src="/images/posts/post-image.png"
          alt="post"
          className="w-full h-full object-contain  rounded-sm"
        />
      </div>
      <div className="col-span-7 flex flex-col">
        <Link
          to={`/${clientSiderBarMenuPath.Blog}/bai-viet-1`}
          className="text-sm font-semibold text-blue-950  dark:text-blue-700 hover:text-pink-600"
        >
          Bài viết 1
        </Link>
        <span className="text-xs text-gray-600">25/12/2000</span>
      </div>
    </div>
  );
};

export default BlogSiderBarRecentItem;
