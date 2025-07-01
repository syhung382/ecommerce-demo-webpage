import { useEffect, useState } from "react";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { useNavigate } from "react-router-dom";
import { adminSideBarMenuPath } from "../../utils/constants";
import LoadingComponent from "../../components/layouts/LoadingComponent";

const CategoriesManager = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleNavigateAdd = () => {
    navigate(`../${adminSideBarMenuPath.CategoryAdd}`);
  };

  useEffect(() => {
    document.title = "Quản trị | Danh mục";

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <Heading>Danh mục sản phẩm</Heading>
      <DashboardBody
        title="Danh sách"
        buttonTitle="Thêm danh mục"
        onClick={handleNavigateAdd}
      >
        <table className="table-auto w-full border-gray-200 rounded-xl ">
          <thead>
            <tr className="bg-blue-100 dark:bg-gray-700 text-left dark:border-b dark:border-gray-400 dark:border-collapse">
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2 w-[8%] text-center">Ảnh</th>
              <th className="px-4 py-2 w-[20%]">Tên</th>
              <th className="px-4 py-2 w-[20%]">Cha</th>
              <th className="px-4 py-2 w-[30%]">Mô tả</th>
              <th className="px-4 py-2 w-[10%] text-center">Trạng thái</th>
              <th className="px-4 py-2 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-700 dark:even:bg-gray-700 dark:border-b dark:border-gray-400 dark:border-collapse">
              <td className="px-4 py-2 text-center font-semibold">1</td>
              <td className="px-4 py-2 text-center">
                <img
                  src="/images/avt.jpg"
                  alt="avt"
                  className="w-10 h-10 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="px-4 py-2">AA</td>
              <td className="px-4 py-2">AA</td>
              <td className="px-4 py-2">AA</td>
              <td className="px-4 py-2 text-center">A</td>
              <td className="px-4 py-2">
                <div className="flex gap-x-2">
                  <ActionView />
                  <ActionEdit />
                  <ActionDelete />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </DashboardBody>
    </>
  );
};

export default CategoriesManager;
