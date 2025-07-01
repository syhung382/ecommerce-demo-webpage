import { useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { localStorageName } from "./utils/constants";
import { handleCheckUserAsync } from "./stores/handles";
import { router } from "./router/router";

function App() {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const body = document.body;
    body.classList.add("transition-colors", "duration-300", "ease-in-out");
  }, []);

  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const userToken = localStorage.getItem(localStorageName.USERTOKEN);

    if (userToken) dispatch(handleCheckUserAsync());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
