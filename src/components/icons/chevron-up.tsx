import type { svgProp } from "../../utils/interface";

const chevronUp = ({ ...rest }: svgProp) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export default chevronUp;
