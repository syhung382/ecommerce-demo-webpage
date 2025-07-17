import { useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { localStorageName } from "./utils/constants";
import { setupRounter } from "./router/router";
import { handleUserCheckAsync } from "./api/handle/handleUsers";

function App() {
  const router = setupRounter();
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

    if (userToken) dispatch(handleUserCheckAsync());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
