import { createAction, createSlice } from "@reduxjs/toolkit";
import type { UserSliceProps } from "../../utils/request";
import { handleCheckUserAsync, handleLoginAsync } from "../handles";
import { localStorageName, RetCodeEnum } from "../../utils/constants";

const initialState: UserSliceProps = {
  isLoading: false,
  serverError: false,
  user: {
    email: undefined,
    fullname: undefined,
    avatar: undefined,
    gender: undefined,
    lastLoginDate: undefined,
    token: undefined,
  },
  errorMessage: undefined,
};

export const setLoading = createAction<boolean>("setLoading");
export const clearErrorMessage = createAction("user/clearErrorMessage");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = {
        email: undefined,
        fullname: undefined,
        avatar: undefined,
        gender: undefined,
        lastLoginDate: undefined,
        token: undefined,
      };
      localStorage.removeItem(localStorageName.USERTOKEN);
    },
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(handleLoginAsync.fulfilled, (state, action) => {
        switch (action.payload.retCode) {
          case RetCodeEnum.Ok: {
            state.user.email = action.payload.data.email;
            state.user.fullname = action.payload.data.fullname;
            state.user.avatar = action.payload.data.avatar;
            state.user.gender = action.payload.data.gender;
            state.user.lastLoginDate = action.payload.data.lastLoginDate;
            state.user.token = action.payload.data.token;

            localStorage.setItem(
              localStorageName.USERTOKEN,
              action.payload.data.token
            );
            break;
          }
          default: {
            state.errorMessage = action.payload.retText;
          }
        }
        state.isLoading = false;
      })
      .addCase(handleLoginAsync.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(handleLoginAsync.rejected, (state) => {
        state.isLoading = false;
        state.serverError = true;
        state.errorMessage = "Kết nối thất bại, vui lòng thử lại sau!";
      });
    //check user
    builder
      .addCase(handleCheckUserAsync.fulfilled, (state, action) => {
        switch (action.payload.retCode) {
          case RetCodeEnum.Ok: {
            state.user.email = action.payload.data.email;
            state.user.fullname = action.payload.data.fullname;
            state.user.avatar = action.payload.data.avatar;
            state.user.gender = action.payload.data.gender;
            state.user.lastLoginDate = action.payload.data.lastLoginDate;
            state.user.token = action.payload.data.token;
            break;
          }
          default: {
            state.user = {
              email: undefined,
              fullname: undefined,
              avatar: undefined,
              gender: undefined,
              lastLoginDate: undefined,
              token: undefined,
            };
            localStorage.removeItem(localStorageName.USERTOKEN);
            state.errorMessage = action.payload.retText;
          }
        }
      })
      .addCase(handleCheckUserAsync.pending, () => {})
      .addCase(handleCheckUserAsync.rejected, (state) => {
        state.serverError = true;
      });
    // other
    builder.addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    });
    builder.addCase(clearErrorMessage, (state) => {
      state.errorMessage = undefined;
    });
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
