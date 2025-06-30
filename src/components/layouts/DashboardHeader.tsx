import ButtonIcon from "../buttons/ButtonIcon";
import { IconBell, IconMenu, IconAngleDown } from "../icons";
import ToggleDarkMode from "../ults/ToggleDarkMode";

const DashboardHeader = () => {
  return (
    <header className="flex dark:bg-gray-900 dark:border-gray-400 bg-white border-gray-200  justify-between z-10 top-0 right-0 px-5 py-3 border-b  lg:left-[300px]">
      <div className="flex-1">
        <div className="w-8 lg:w-10 h-8 lg:h-10 dark:border-gray-400 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
          <IconMenu></IconMenu>
        </div>
      </div>
      <div className="flex gap-x-4 px-5">
        <ToggleDarkMode></ToggleDarkMode>
        <ButtonIcon icon={<IconBell></IconBell>}></ButtonIcon>
        <div className="flex gap-x-2">
          <div className="w-8 lg:w-10 h-8 lg:h-10 border dark:border-gray-400 border-gray-200 rounded-full flex items-center justify-center cursor-pointer">
            <img
              src="/images/avt.jpg"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1 flex items-center gap-x-1 cursor-pointer">
            <span className="text-md font-bold">Kazu</span>
            <IconAngleDown></IconAngleDown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
