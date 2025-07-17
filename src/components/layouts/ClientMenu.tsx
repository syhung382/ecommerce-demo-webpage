import { useLocation } from "react-router-dom";
import ToggleDarkMode from "../ults/ToggleDarkMode";
import { clientSiderBarMenuPath } from "../../utils/constants";
import ClientMenuItem from "../menu/ClientMenuItem";
import { IconSearch } from "../icons";

const ClientMenu = () => {
  const location = useLocation();

  // Hàm kiểm tra xem path hiện tại có khớp với menu không
  const isActive = (path: string) => {
    return location.pathname === `/${path}`;
  };

  return (
    <div className="px-4 lg:px-40 gap-x-5 items-center h-8 hidden lg:flex">
      <div className="h-full flex items-center">
        <img src="/images/logo/logo.svg" alt="" className="h-full" />
      </div>
      <div className={`flex-1 flex gap-x-3 items-center h-full`}>
        <div className="flex-1 flex gap-x-3 items-center h-full`">
          <ClientMenuItem
            title="Trang chủ"
            url={clientSiderBarMenuPath.Home}
            active={isActive(clientSiderBarMenuPath.Home)}
          />
          <ClientMenuItem
            title="Danh mục"
            url={clientSiderBarMenuPath.Category}
            active={isActive(clientSiderBarMenuPath.Category)}
          />
          <ClientMenuItem
            title="Sản phẩm"
            url={clientSiderBarMenuPath.Product}
            active={isActive(clientSiderBarMenuPath.Product)}
          />
          <ClientMenuItem
            title="Blog"
            url={clientSiderBarMenuPath.Blog}
            active={isActive(clientSiderBarMenuPath.Blog)}
          />
          <ClientMenuItem
            title="Giới thiệu"
            url={clientSiderBarMenuPath.About}
            active={isActive(clientSiderBarMenuPath.About)}
          />
          <ClientMenuItem
            title="Liên hệ"
            url={clientSiderBarMenuPath.Contact}
            active={isActive(clientSiderBarMenuPath.Contact)}
          />
        </div>
        <div className="flex border border-gray-400 dark:border-gray-600">
          <input
            type="text"
            className="border-none outline-none px-2 py-1 text-sm font-semibold"
          />
          <div className="flex items-center justify-center px-2 cursor-pointer bg-pink-600 dark:bg-pink-600/60">
            <IconSearch className="text-white dark:text-gray-200" width={16} />
          </div>
        </div>
      </div>
      <div>
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default ClientMenu;
