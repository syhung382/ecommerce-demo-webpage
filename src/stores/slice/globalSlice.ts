import { createSlice } from "@reduxjs/toolkit";
// import requestGetNews from "../../utils/request";

// const handleFetchNews = createAsyncThunk(
//   "news/handleFetchNews",
//   async (query: string) => {
//     const response = await requestGetNews(query);
//     return response.data;
//   }
// );

const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkMode: false,
    showSidebar: true,
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(handleFetchNews.fulfilled, (state, action) => {});
  // },
});

export const { toggleDarkMode, toggleSidebar } = globalSlice.actions;

export default globalSlice.reducer;
