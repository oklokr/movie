import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: { info: null },
  reducers: {
    setUserInfo(state, action) {
      state.info = action.payload;
    },
    resetUserInfo(state) {
      state.info = null;
    },
  },
});

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
