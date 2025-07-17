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
            <IconSun width={16} height={16}></IconSun>
          ) : (
            <IconMoon width={16} height={16}></IconMoon>
          )
        }
      ></ButtonIcon>
    </>
  );
};

export default ToggleDarkMode;
