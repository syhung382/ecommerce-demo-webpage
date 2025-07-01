import { Outlet, useNavigation } from "react-router-dom";
import LoadingLayout from "./LoadingLayout";

const GlobalLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <LoadingLayout />}
      <Outlet />
    </>
  );
};

export default GlobalLayout;
