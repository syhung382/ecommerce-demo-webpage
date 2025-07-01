import type { DashboardBodyProps } from "../../utils/interface";
import DashboardButton from "../buttons/DashboardButton";

const DashboardBody = ({
  children,
  title,
  onClick,
  buttonTitle,
  buttonColor,
}: DashboardBodyProps) => {
  return (
    <div className="grid bg-white dark:bg-gray-800 rounded-xl mt-6">
      <div className="p-5 flex text-md font-semibold border-b border-gray-200 dark:border-gray-500">
        <div className="flex-1">{title}</div>
        {buttonTitle && (
          <div>
            <DashboardButton buttonColor={buttonColor} onClick={onClick}>
              {buttonTitle}
            </DashboardButton>
          </div>
        )}
      </div>
      <div className="m-6">{children}</div>
    </div>
  );
};

export default DashboardBody;
