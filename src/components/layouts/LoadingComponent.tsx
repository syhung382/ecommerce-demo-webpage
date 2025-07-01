import { LoadingSpinner } from "../loading";

const LoadingComponent = () => {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
      <LoadingSpinner color="dark" size={60} borderSize={20} />
    </div>
  );
};
export default LoadingComponent;
