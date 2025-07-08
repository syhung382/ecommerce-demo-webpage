import { useEffect, useState } from "react";
import DashboardBody from "../../components/layouts/DashboardBody";
import Heading from "../../components/layouts/Heading";
import { PopupModal } from "../../components/modals";
import TagOfProductAdd from "./TagOfProductAdd";
import TagOfProductTable from "./TagOfProductTable";
import {
  type FilterListPayload,
  type TagOfProduct,
  type TagOfProductFilter,
} from "../../utils/requestUtils";
import type {
  Pagin,
  ResponseList,
  ResponseResult,
} from "../../utils/responseUtils";
import { useAppDispatch } from "../../hooks/hook";
import { handleTagOfProductList } from "../../stores/handles";
import { toast } from "react-toastify";

const TagOfProductManager = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddModal, setIsAddModal] = useState<boolean>(false);
  const [dataList, setDataList] = useState<TagOfProduct[]>([]);
  const [headerParams, setHeaderParams] = useState<
    FilterListPayload<TagOfProductFilter>
  >({
    limit: 10,
    page: 1,
    body: {
      title: "",
      status: undefined,
      isDesc: false,
      typeSort: "",
    },
  });
  const [pagin, setPagin] = useState<Pagin>();
  const dispatch = useAppDispatch();

  async function fetchData() {
    if (loading) return;
    setLoading(true);

    const payload: FilterListPayload<TagOfProductFilter> = headerParams;

    try {
      const res = (await dispatch(
        handleTagOfProductList(payload)
      ).unwrap()) as ResponseResult<ResponseList<TagOfProduct[]>>;
      if (res) {
        if (res.retCode === 0) {
          setDataList(res.data.listData);
          setPagin(res.data.paging);
        } else {
          toast.error(res.retText);
        }
      } else {
        toast.error("lỗi khi tải dữ liệu!");
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [headerParams]);

  useEffect(() => {
    document.title = "Quản trị | Tag";
  }, []);

  return (
    <>
      <Heading>Thẻ tag</Heading>
      <DashboardBody
        title="Danh sách Tag"
        buttonTitle="Thêm tag"
        onClick={() => setIsAddModal(true)}
      >
        <TagOfProductTable
          data={dataList}
          paging={pagin}
          headerParams={headerParams}
          setHeaderParams={setHeaderParams}
          handleResetData={fetchData}
        />
      </DashboardBody>
      <PopupModal
        isOpen={isAddModal}
        onCancel={() => setIsAddModal(false)}
        buttonCancelTitle="Hủy"
        title="Thêm Tag"
      >
        <TagOfProductAdd
          onClick={() => {
            setIsAddModal(false);
            fetchData();
          }}
        />
      </PopupModal>
    </>
  );
};

export default TagOfProductManager;
