import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./stores/configureStore.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer></ToastContainer>
  </>
);
