import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import commonReducer from "./slices/common";

const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
