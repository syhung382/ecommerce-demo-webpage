import { localStorageName } from "../../utils/constants";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageName.GLOBALCONFIG);
    if (serializedState === null) return undefined;
    return {
      global: JSON.parse(serializedState), // 👈 đúng tên slice
    };
  } catch (err) {
    console.error("Load state error:", err);
    return undefined;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state.global); // 👈 đúng slice
    localStorage.setItem(localStorageName.GLOBALCONFIG, serializedState);
  } catch (err) {
    console.error("Save state error:", err);
  }
};
