import type { LoadingSprinProps } from "../../utils/interface";

const LoadingSpinner = ({
  size,
  borderSize,
  color,
  ...props
}: LoadingSprinProps) => {
  let type;
  switch (color) {
    case "dark":
      type = "#99a1af";
      break;
    case "outline":
      type = "#4a5565";
      break;

    default:
      type = "#ffff";
      break;
  }

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
