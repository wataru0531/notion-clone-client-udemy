/**************************************************************

トークンをチェックするための関数

***************************************************************/

import authApi from "../api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    // トークンを取得
    const token = localStorage.getItem("token");

    // トークンがない場合
    if(!token) return false;

    // トークンが存在している場合
    try{
      // JWTがあれば返す
      const res = await authApi.verifyToken();

      return res.user;
    }catch{
      return false;
    }
  }
}

export default authUtils;