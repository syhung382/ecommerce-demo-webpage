import type { LabelStatusProps } from "../../utils/interface";

const LabelStatus = ({ type, children }: LabelStatusProps) => {
  let color = "";

  switch (type) {
    case "info":
      color =
        "bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-500/50";
      break;

    case "danger":
      color = "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-500/70";
      break;

    default:
      color =
        "bg-green-100 text-green-800 dark:text-green-500/60 dark:bg-green-950/70";
      break;
  }

  return (
    <span className={`text-xs font-semibold ${color} px-2 py-[2px] rounded-xl`}>
      {children}
    </span>
  );
};

export default LabelStatus;
