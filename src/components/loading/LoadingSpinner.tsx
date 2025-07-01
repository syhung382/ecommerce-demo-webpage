import type { LoadingSprinProps } from "../../utils/interface";

const LoadingSpinner = ({
  size,
  borderSize,
  color,
  ...props
}: LoadingSprinProps) => {
  const type = color === "dark" ? "#99a1af" : "#ffff";

  return (
    <div
      className="mx-auto border-4 border-t-0 animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: `${borderSize}px solid ${type}`,
        borderTop: `${borderSize}px solid transparent`,
        borderBottom: `${borderSize}px solid transparent`,
      }}
      {...props}
    ></div>
  );
};

export default LoadingSpinner;
