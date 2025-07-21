import { useLocation } from "react-router-dom";
import ToggleDarkMode from "../ults/ToggleDarkMode";
import { clientSiderBarMenuPath } from "../../utils/constants";
import ClientMenuItem from "../menu/ClientMenuItem";
import { IconMenu, IconSearch } from "../icons";
import { useEffect, useRef, useState } from "react";
import MenuAccount from "../other/MenuAccount";
import ButtonCart from "../ults/ButtonCart";

const ClientMenu = () => {
  const [menuShow, setMenuShow] = useState(false);

  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const iconMenuRef = useRef<HTMLDivElement>(null);

  const handleMenu = () => {
    setMenuShow((prev) => !prev);
  };

  const isActive = (path: string) => {
    return location.pathname === `/${path}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // ✅ Nếu click KHÔNG nằm trong menu và KHÔNG phải icon menu
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        iconMenuRef.current &&
        !iconMenuRef.current.contains(target)
      ) {
        setMenuShow(false);
      }
    };

    if (menuShow) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuShow]);

  return (
    <>
      <div className="py-3 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
        {/* menu */}
        <div className="px-4 lg:px-30 xl:px-60 gap-x-5 items-center h-8 hidden lg:flex">
          <div className="h-full flex items-center">
            <img src="/images/logo/logo.svg" alt="" className="h-full" />
          </div>
          <div className={`flex-1 flex gap-x-3 items-center h-full`}>
            <div className="flex-1 flex gap-x-3 items-center h-full">
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
            <div className="flex border border-gray-200 dark:border-gray-600">
              <input
                type="text"
                className="border-none outline-none px-2 py-1 text-sm font-semibold"
              />
              <div className="flex items-center justify-center px-2 cursor-pointer bg-pink-600">
                <IconSearch
                  className="text-white dark:text-gray-200"
                  width={16}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            <ButtonCart />
            <ToggleDarkMode />
            <MenuAccount />{" "}
          </div>
        </div>

        {/* menu mobile button */}
        <div className="flex items-center px-10 gap-x-4 lg:hidden">
          <div className="h-full flex-1">
            <img src="/images/logo/logo.svg" alt="" className="h-full" />
          </div>
          <div>
            <ButtonCart />
          </div>
          <div>
            <ToggleDarkMode />
          </div>
          <div
            ref={iconMenuRef}
            className="p-2 border border-gray-200 dark:border-gray-600 rounded-md"
            onClick={handleMenu}
          >
            <IconMenu width={16} />
          </div>
        </div>
      </div>
      {/* menu mobile item */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-[50px] left-0 w-full bg-gray-50 dark:bg-gray-800 shadow-md transition-all duration-300 z-40 ${
          menuShow ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          <ClientMenuItem
            title="Trang chủ"
            url={clientSiderBarMenuPath.Home}
            active={isActive(clientSiderBarMenuPath.Home)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Danh mục"
            url={clientSiderBarMenuPath.Category}
            active={isActive(clientSiderBarMenuPath.Category)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Sản phẩm"
            url={clientSiderBarMenuPath.Product}
            active={isActive(clientSiderBarMenuPath.Product)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Blog"
            url={clientSiderBarMenuPath.Blog}
            active={isActive(clientSiderBarMenuPath.Blog)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Giới thiệu"
            url={clientSiderBarMenuPath.About}
            active={isActive(clientSiderBarMenuPath.About)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Liên hệ"
            url={clientSiderBarMenuPath.Contact}
            active={isActive(clientSiderBarMenuPath.Contact)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Đăng nhập"
            url={clientSiderBarMenuPath.Login}
            active={isActive(clientSiderBarMenuPath.Login)}
            onClick={handleMenu}
          />
          <ClientMenuItem
            title="Đăng ký"
            url={clientSiderBarMenuPath.Register}
            active={isActive(clientSiderBarMenuPath.Register)}
            onClick={handleMenu}
          />
        </div>
      </div>
    </>
  );
};

export default ClientMenu;
