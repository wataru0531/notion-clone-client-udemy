/**************************************************************

メモに関するスライス Storeの中に存在

***************************************************************/
import { createSlice } from "@reduxjs/toolkit";

//  初期値
const initialState = {
  // 配列でメモを格納していく
  value: [],
};

const memoSlice = createSlice({
  name: "memo",
  initialState: initialState,

  reducers: {
    setMemo: (state, action) => {
      // console.log(action)
      // action ... {type: 'memo/setMemo', payload: Array(6)}

      state.value = action.payload;
    },
  }

})

// Action
export const { setMemo } = memoSlice.actions;

// Reducer
export default memoSlice.reducer;