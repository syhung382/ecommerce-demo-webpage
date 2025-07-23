import BlogSiderBarOfferItem from "./BlogSiderBarOfferItem";

const BlogSiderBarOffer = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xm font-bold text-blue-950 dark:text-blue-700">
        Sản phẩm gợi ý
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <BlogSiderBarOfferItem />
        <BlogSiderBarOfferItem />
        <BlogSiderBarOfferItem />
        <BlogSiderBarOfferItem />
      </div>
    </div>
  );
};

export default BlogSiderBarOffer;
