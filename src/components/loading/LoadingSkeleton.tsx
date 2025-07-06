import type { LoadingSkeletonProps } from "../../utils/interface";

const LoadingSkeleton = ({
  height,
  width,
  radiusSize,
  className,
}: LoadingSkeletonProps) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        height: height,
        width: width || "100%",
        borderRadius: radiusSize,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
