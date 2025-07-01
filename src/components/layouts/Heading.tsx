import type { ChildrenProps } from "../../utils/interface";

const Heading = ({ children }: ChildrenProps) => {
  return <h1 className="text-xl font-bold">{children}</h1>;
};

export default Heading;
