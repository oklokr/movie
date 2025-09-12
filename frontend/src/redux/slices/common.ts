// frontend/src/redux/slices/common.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonCodeItem {
  commonId: number;
  commonName: string;
  commonSubValue: string;
  commonValue: string;
}

interface CommonState {
  code: Record<string, CommonCodeItem[]>;
}

const initialState: CommonState = { code: {} };

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommonCode(
      state,
      action: PayloadAction<Record<string, CommonCodeItem[]>>
    ) {
      state.code = action.payload;
    },
  },
});

export const { setCommonCode } = commonSlice.actions;
export default commonSlice.reducer;
