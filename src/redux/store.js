/**************************************************************



***************************************************************/
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../redux/features/userSlice";
import memoReducer from "../redux/features/memoSlice";

export const store = configureStore({
  reducer: {
    // ここのuserという名前がuseSelectorで使われる
    user: userReducer, 
    memo: memoReducer,
  },
})
