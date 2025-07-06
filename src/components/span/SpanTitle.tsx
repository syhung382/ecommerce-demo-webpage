import type { SpanTitleProps } from "../../utils/interface";

const SpanTitle = ({ children, className }: SpanTitleProps) => {
  return (
    <span className={`${className ? className : "font-semibold"}`}>
      {children}
    </span>
  );
};

export default SpanTitle;
