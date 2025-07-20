const Offer = () => {
  return (
    <div className="mt-20 w-full max-w-[99vw] overflow-x-hidden grid grid-cols-2 lg:grid-cols-4 gap-4 px-10 lg:px-30 xl:px-60">
      <div className="items-center text-center w-full flex flex-col px-6 py-4">
        <img src="/images/delivery.png" alt="delivery" className="w-16 h-16" />
        <h3 className="mt-5 font-semibold text-[16px] text-blue-950 dark:text-blue-700">
          Giao hàng miễn phí
        </h3>
        <span className="mt-4 text-sm font-semibold text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
      <div className="items-center text-center w-full flex flex-col px-6 py-4">
        <img src="/images/cashback.png" alt="cashback" className="w-16 h-16" />
        <h3 className="mt-5 font-semibold text-[16px] text-blue-950 dark:text-blue-700">
          Giao hàng miễn phí
        </h3>
        <span className="mt-4 text-sm font-semibold text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
      <div className="items-center text-center w-full flex flex-col px-6 py-4">
        <img
          src="/images/premium-quality.png"
          alt="premium-quality"
          className="w-16 h-16"
        />
        <h3 className="mt-5 font-semibold text-[16px] text-blue-950 dark:text-blue-700">
          Giao hàng miễn phí
        </h3>
        <span className="mt-4 text-sm font-semibold text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
      <div className="items-center text-center w-full flex flex-col px-6 py-4">
        <img
          src="/images/24-hours-support.png"
          alt="24-hours-support"
          className="w-16 h-16"
        />
        <h3 className="mt-5 font-semibold text-[16px] text-blue-950 dark:text-blue-700">
          Giao hàng miễn phí
        </h3>
        <span className="mt-4 text-sm font-semibold text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
    </div>
  );
};

export default Offer;
