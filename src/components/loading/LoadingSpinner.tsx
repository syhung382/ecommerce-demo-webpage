import type { LoadingSprinProps } from "../../utils/interface";

const LoadingSpinner = ({ size, borderSize, ...props }: LoadingSprinProps) => {
  return (
    <div
      className="mx-auto border-4 border-t-0 text-white animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: `${borderSize}px solid white`,
        borderTop: `${borderSize}px solid transparent`,
        borderBottom: `${borderSize}px solid transparent`,
      }}
      {...props}
    ></div>
  );
};

export default LoadingSpinner;
