import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  darkMode: boolean | null;
  showSidebar: boolean | null;
}

const initialState: GlobalState = {
  darkMode: false,
  showSidebar: true,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = globalSlice.actions;

export default globalSlice.reducer;
