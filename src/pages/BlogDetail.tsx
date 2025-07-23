import { useEffect } from "react";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";
import MapComponent from "../components/other/MapComponent";
import BlogSiderBar from "../modules/blog/BlogSiderBar";
import BlogDetailContent from "../modules/blog/BlogDetailContent";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Blog",
    url: "/" + clientSiderBarMenuPath.Blog,
  },
  {
    title: "Blog detail",
    url: "/" + clientSiderBarMenuPath.Blog + "/blog-detail",
  },
];

const BlogDetail = () => {
  useEffect(() => {
    document.title = "Blog detail";
  }, []);

  return (
    <>
      <MapComponent title="Blog Detail" mapItem={mapList} />

      <div className="my-10 lg:my-20 px-10 lg:px-30 xl:px-60 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-full lg:col-span-3 grid grid-cols-1 gap-6">
          <BlogDetailContent />
        </div>

        <div className="w-full flex flex-col gap-6">
          <BlogSiderBar />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
