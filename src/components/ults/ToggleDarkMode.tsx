import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { toggleDarkMode } from "../../stores/slice/globalSlice";
import ButtonIcon from "../buttons/ButtonIcon";
import { IconMoon, IconSun } from "../icons";

const ToggleDarkMode = () => {
  const { darkMode } = useAppSelector((state) => state.global);

  const dispatch = useAppDispatch();

  return (
    <>
      <ButtonIcon
        onClick={() => dispatch(toggleDarkMode(!darkMode))}
        icon={
          !darkMode ? (
            <IconSun width={20} height={20}></IconSun>
          ) : (
            <IconMoon width={20} height={20}></IconMoon>
          )
        }
      ></ButtonIcon>
    </>
  );
};

export default ToggleDarkMode;
