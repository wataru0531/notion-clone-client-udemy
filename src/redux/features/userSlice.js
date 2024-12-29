/**************************************************************



***************************************************************/
import { createSlice } from "@reduxjs/toolkit";


// 初期値
const initialState = {
  value: {},
  memo: [],
};

const userSlice= createSlice({
  name: "user", // 任意の名前
  initialState: initialState,

  reducers: {
    setUser: (state, action) => {
      // console.log(state, action);
      // state  ...  初期値
      // action ... type: 'user/setUser', payload: {…ユーザーのパスワードなど}

      // payload...dispatchした時のActionの引数のこと dispatch(removeItem(id)
      state.value = action.payload;
    },
  }
});

// console.log(userSlice)

// Actionをエクスポート (Reducerと名前が同じなので注意)
export const { setUser } = userSlice.actions;
// Reducerをエクスポート
export default userSlice.reducer;