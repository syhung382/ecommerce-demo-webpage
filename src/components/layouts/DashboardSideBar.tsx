import {
  IconGrid,
  IconGroup,
  IconList,
  IconLogout,
  IconMail,
  IconSetting,
  IconShopingBag,
  IconShopingCart,
  IconTag,
  IconUser,
} from "../icons";
import DashBoardSideItem from "../ults/DashBoardSideItem";
import { adminSideBarMenuPath } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hook";
import { userLogout } from "../../stores/slice/userSlice";

const sideBarGroupRoutes = {
  Dashboard: [adminSideBarMenuPath.Dashboard],
  Category: [
    adminSideBarMenuPath.CategoryManager,
    adminSideBarMenuPath.CategoryDetail,
    adminSideBarMenuPath.CategoryAdd,
    adminSideBarMenuPath.CategoryUpdate,
  ],
  Product: [
    adminSideBarMenuPath.ProductManager,
    adminSideBarMenuPath.ProductDetail,
    adminSideBarMenuPath.ProductAdd,
    adminSideBarMenuPath.ProductUpdate,
  ],
  Tag: [
    adminSideBarMenuPath.TagOfProductManager,
    adminSideBarMenuPath.TagOfProductDetail,
    adminSideBarMenuPath.TagOfProductManager,
    adminSideBarMenuPath.TagOfProductUpdate,
  ],
  Order: [
    adminSideBarMenuPath.OrderManager,
    adminSideBarMenuPath.OrderDetail,
    adminSideBarMenuPath.OrderAdd,
    adminSideBarMenuPath.OrderUpdate,
  ],
  Contact: [
    adminSideBarMenuPath.ContactManager,
    adminSideBarMenuPath.ContacDetail,
    adminSideBarMenuPath.ContacReply,
  ],
  Customer: [
    adminSideBarMenuPath.CustomerManager,
    adminSideBarMenuPath.CustomerDetail,
    adminSideBarMenuPath.CustomerAdd,
    adminSideBarMenuPath.CustomerUpdate,
  ],
  Setting: [adminSideBarMenuPath.Setting],
  Member: [
    adminSideBarMenuPath.MemberManager,
    adminSideBarMenuPath.MemberDetail,
    adminSideBarMenuPath.MemberAdd,
    adminSideBarMenuPath.MemberUpdate,
  ],
  Image: [adminSideBarMenuPath.ImageManager],
  Profile: [adminSideBarMenuPath.Profile],
};

const DashboardSideBar = () => {
  const location = useLocation();
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispath(userLogout());
    navigate("/sign-in");
  };

  const isActiveGroup = (paths: string[]): boolean => {
    return paths.some((p) => location.pathname.startsWith("/admin/" + p));
  };

  return (
    <div className="hidden fixed lg:flex flex-col top-0 left-0 h-screen w-[290px] z-10 px-5 py-8 border-r dark:border-gray-500 border-gray-200 dark:bg-gray-900 bg-white">
      <div>
        <img src="/images/logo/logo.svg" alt="logo" />
      </div>
      <div className="flex-1 mt-6 overflow-y-auto scrollbar-hidden">
        <div className="flex-1 mt-6">
          <span className="text-[12px] font-[400] text-gray-400">MENU</span>
          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Dashboard)}
            title="Dashboard"
            to={adminSideBarMenuPath.Dashboard}
            icon={<IconGrid></IconGrid>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Category)}
            title="Danh mục"
            to={adminSideBarMenuPath.CategoryManager}
            icon={<IconList></IconList>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Tag)}
            title="Tag"
            to={adminSideBarMenuPath.TagOfProductManager}
            icon={<IconTag></IconTag>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Product)}
            title="Sản phẩm"
            to={adminSideBarMenuPath.ProductManager}
            icon={<IconShopingBag></IconShopingBag>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Image)}
            title="Hình ảnh"
            to={adminSideBarMenuPath.ImageManager}
            icon={<IconShopingBag></IconShopingBag>}
          ></DashBoardSideItem>
        </div>
        <div className="flex-1 mt-6">
          <span className="text-[12px] font-[400] text-gray-400">SUPPORT</span>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Order)}
            title="Đơn hàng"
            to={adminSideBarMenuPath.OrderManager}
            icon={<IconShopingCart></IconShopingCart>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Contact)}
            title="Liên hệ"
            to={adminSideBarMenuPath.ContactManager}
            icon={<IconMail></IconMail>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Customer)}
            title="Khách hàng"
            to={adminSideBarMenuPath.CustomerManager}
            icon={<IconGroup></IconGroup>}
          ></DashBoardSideItem>
        </div>
        <div className="flex-1 mt-6">
          <span className="text-[12px] font-[400] text-gray-400">KHÁC</span>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Setting)}
            title="Cài đặt"
            to={adminSideBarMenuPath.Setting}
            icon={<IconSetting></IconSetting>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Member)}
            title="Thành viên"
            to={adminSideBarMenuPath.MemberManager}
            icon={<IconGroup></IconGroup>}
          ></DashBoardSideItem>

          <DashBoardSideItem
            active={isActiveGroup(sideBarGroupRoutes.Profile)}
            title="Tài khoản"
            to={adminSideBarMenuPath.Profile}
            icon={<IconUser></IconUser>}
          ></DashBoardSideItem>

          <div
            onClick={() => handleLogout()}
            className={`flex-1 flex gap-x-3 px-3 items-center mt-4 py-2  rounded-lg cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100`}
          >
            <div>
              <IconLogout></IconLogout>
            </div>
            <div className="flex-1 text-[14px] font-[600]">Đăng xuất</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
