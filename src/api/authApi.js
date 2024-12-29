/**************************************************************



***************************************************************/
import axiosClient from "./axiosClient";


const authApi = {
  // 新規登録について
  // registerを呼べば、auth/registerのurlが叩かれる。
  // register(パラメータ)とurlを叩く。
  register: (params) => axiosClient.post("auth/register", params),

  // ログインについて
  login: (params) => axiosClient.post("auth/login", params),

  // JWTのユーザー情報などを返す
  verifyToken: (params) => axiosClient.post("auth/verify-token"),
}

export default authApi;
