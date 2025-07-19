import { useState } from "react";
import { ButtonIcon } from "../buttons";
import { IconLogin, IconUser } from "../icons";
import { useNavigate } from "react-router-dom";
import { clientSiderBarMenuPath } from "../../utils/constants";
import { useAppSelector } from "../../hooks/hook";

const MenuAccount = () => {
  const [menuShow, setMenuShow] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const handleMenu = () => {
    setMenuShow(!menuShow);
  };

  return (
    <div className="relative inline-block">
      <ButtonIcon
        icon={<IconUser width={20} height={20} />}
        onClick={handleMenu}
      />
      {menuShow && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 w-48 z-10">
          {user ? (
            <>
              <div
                className="text-gray-800 dark:text-gray-200 font-medium py-1 cursor-pointer hover:text-pink-500 flex "
                onClick={() => navigate(`/${clientSiderBarMenuPath.Login}`)}
              >
                <span className="flex-1">Đăng nhập</span> <IconLogin />
              </div>
              <div
                className="text-gray-800 dark:text-gray-200 font-medium py-1 cursor-pointer hover:text-pink-500 flex"
                onClick={() => navigate(`${clientSiderBarMenuPath.Register}`)}
              >
                <span className="flex-1">Đăng ký</span> <IconLogin />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuAccount;
