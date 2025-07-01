import { LoadingSpinner } from "../loading";

const LoadingLayout = () => {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-800 flex justify-center items-center align-middle">
      <LoadingSpinner color="dark" size={60} borderSize={20}></LoadingSpinner> *
    </div>
  );
};
export default LoadingLayout;
