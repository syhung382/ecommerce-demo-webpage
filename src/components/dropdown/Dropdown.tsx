import type { ChildrenProps } from "../../utils/interface";

const Dropdown = ({ children }: ChildrenProps) => {
  return <div className="relative inline-block w-full">{children}</div>;
};

export default Dropdown;
