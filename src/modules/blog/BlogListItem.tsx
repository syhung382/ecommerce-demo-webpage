import { Link } from "react-router-dom";
import { IconCalendar, IconPencil1 } from "../../components/icons";
import { clientSiderBarMenuPath } from "../../utils/constants";

const BlogListItem = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full max-h-[460px]">
        <img
          src="/images/posts/post-image.png"
          alt="post"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <IconPencil1 width={16} className="text-pink-700" />
          <span className="px-4 py-1 rounded-md text-blue-950 bg-purple-200 font-semibold cursor-pointer">
            Kazu
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <IconCalendar width={16} className="text-orange-600" />
          <span className="px-4 py-1 rounded-md text-blue-950 bg-orange-100 font-semibold">
            25/12/2000
          </span>
        </div>
      </div>
      <div className="w-full">
        <Link
          to={`/${clientSiderBarMenuPath.Blog}/bai-viet-1`}
          className="font-bold text-xl text-blue-950 dark:text-blue-700 hover:text-pink-600"
        >
          Bài viết 1
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere sit
          porro quod odio nihil, eum deleniti possimus hic voluptas veritatis
          dignissimos rerum quisquam
        </p>
      </div>
      <Link
        to={`/${clientSiderBarMenuPath.Blog}/bai-viet-1`}
        className="font-semibold text-blue-950 dark:text-blue-700 hover:text-pink-600 underline decoration-1  underline-offset-4"
      >
        Đọc tiếp
      </Link>
    </div>
  );
};

export default BlogListItem;
