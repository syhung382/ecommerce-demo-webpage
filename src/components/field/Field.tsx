import type { ChildrenProps } from "../../utils/interface";

const Field = ({ children }: ChildrenProps) => {
  return <div className="flex flex-col gap-x-3 mt-4">{children}</div>;
};

export default Field;
