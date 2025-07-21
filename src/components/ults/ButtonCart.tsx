import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "../buttons";
import { IconShopingCart } from "../icons";
import { clientSiderBarMenuPath } from "../../utils/constants";

const ButtonCart = () => {
  const navigate = useNavigate();

  return (
    <>
      <ButtonIcon
        icon={<IconShopingCart width={20} height={20} />}
        onClick={() => navigate(`/${clientSiderBarMenuPath.Cart}`)}
      ></ButtonIcon>
    </>
  );
};

export default ButtonCart;
