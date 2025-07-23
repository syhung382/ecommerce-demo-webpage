import {
  IconArrowLongLeft,
  IconArrowLongRight,
  IconCalendar,
  IconFacebookRound,
  IconInstagramRound,
  IconPencil1,
  IconTwitterRound,
} from "../../components/icons";

const BlogDetailContent = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* thumball */}
      <div className="w-full max-h-[460px]">
        <img
          src="/images/posts/post-image.png"
          alt="post"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* author */}
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
      {/* content */}
      <div className="w-full flex flex-col text-gray-500 gap-4 text-sm">
        <h1 className="font-bold text-xl text-blue-950  dark:text-blue-700">
          Bài viết 1
        </h1>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere sit
          porro quod odio nihil, eum deleniti possimus hic voluptas veritatis
          dignissimos rerum quisquam
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          vero quos illo hic commodi architecto enim omnis quibusdam! Aliquam
          quam maiores at. Sit neque corrupti, quidem eum perspiciatis
          voluptatibus nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          laudantium libero? Ipsam, delectus fugit corporis, animi assumenda
          maiores hic harum exercitationem unde laborum recusandae facilis
          aliquid culpa, blanditiis magnam. Architecto?
        </p>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere sit
          porro quod odio nihil, eum deleniti possimus hic voluptas veritatis
          dignissimos rerum quisquam
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          vero quos illo hic commodi architecto enim omnis quibusdam! Aliquam
          quam maiores at. Sit neque corrupti, quidem eum perspiciatis
          voluptatibus nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          laudantium libero? Ipsam, delectus fugit corporis, animi assumenda
          maiores hic harum exercitationem unde laborum recusandae facilis
          aliquid culpa, blanditiis magnam. Architecto?
        </p>
      </div>
      {/* share */}
      <div className="mx-auto">
        <div className="flex gap-x-2 items-baseline">
          <IconFacebookRound
            width={20}
            height={20}
            className="text-blue-800 cursor-pointer"
          />
          <IconTwitterRound
            width={20}
            height={20}
            className="text-green-600 cursor-pointer"
          />
          <IconInstagramRound
            width={20}
            height={20}
            className="text-pink-700 cursor-pointer"
          />
        </div>
      </div>
      {/* navigation */}
      <div className="w-full px-4 py-1 flex justify-between bg-blue-100/50">
        <div className="flex cursor-pointer hover:text-pink-600 text-blue-900">
          <IconArrowLongLeft width={20} />
          <span>Bài viết trước</span>
        </div>
        <div className="flex cursor-pointer hover:text-pink-600 text-blue-900">
          <span>Bài viết sau</span>
          <IconArrowLongRight width={20} />
        </div>
      </div>
      {/* comment */}
      <div className="w-full flex flex-col gap-5">
        {/* comment box */}
        <div className="w-full flex flex-col gap-4">
          {/* comment */}
          <div className="w-full p-2 border rounded-md border-gray-200 shadow grid grid-cols-10 gap-2">
            <div className="col-span-2 aspect-square">
              <img
                src="/images/avt.jpg"
                alt="avt"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="col-span-8 flex flex-col gap-2 py-1 px-2">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold text-blue-950  dark:text-blue-700">
                  Kazu
                </h4>
                <span className="text-sm font-semibold text-gray-400">
                  25/12/2025
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                dolorem, repellat quisquam ipsam quod earum omnis impedit,
                fugit, nobis dignissimos dolore. Totam voluptatum doloremque
                dolores nostrum, maxime dolor! Eos, in.
              </p>
            </div>
          </div>
        </div>

        {/* comment form */}
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Tên của bạn *"
              className="border border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
            />
            <input
              type="text"
              placeholder="Email *"
              className="border border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
            />
          </div>

          <textarea
            placeholder="Viết bình luận..."
            className="border border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 h-32 resize-none shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
          ></textarea>
          <button
            className="w-full py-1 text-center text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded-md transform cursor-pointer"
            type="button"
          >
            Bình luận
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;
