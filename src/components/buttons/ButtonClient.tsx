const ButtonClient = ({ title }: { title: string }) => {
  return (
    <button
      type="button"
      className="text-xs md:text-sm transition duration-300 mt-6 cursor-pointer px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 border border-gray-500 group-hover:bg-pink-500 group-hover:hover:bg-pink-600 dark:text-gray-300 group-hover:dark:bg-pink-700 group-hover:dark:hover:bg-pink-800"
    >
      {title}
    </button>
  );
};

export default ButtonClient;
