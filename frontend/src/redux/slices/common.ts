import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: { code: null },
  reducers: {
    setCommonCode(state, action) {
      state.code = action.payload;
    },
  },
});

export const { setCommonCode } = commonSlice.actions;
export default commonSlice.reducer;
