/**************************************************************

axiosのインスタンスを利用 
インターセプターを使いリクエスト、レスポンスに処理をかます。

***************************************************************/
import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1"; // サーバーのURL

// 初期化
const axiosClient = axios.create({
  baseURL: BASE_URL,
  // paramsSerializer    // パラメータをjson化する

});

// トークンをローカルストレージから取得する
const getToken  = () => window.localStorage.getItem("token");


// リクエストの時
axiosClient.interceptors.request.use(async(config) => {
  return{
    ...config,     // configはそのまま返す
    headers: {
      // json形式でAPI通信を行うように設定
      "Content-Type": "application/json",

       // リクエストヘッダーにJWTをつけてサーバーに渡す
      authorization: `Bearer ${getToken()}`,

    }
  }
})

// レスポンスの時  
axiosClient.interceptors.response.use((response) => {

  // response.dataの中にトークンが格納
  return response.data;
}, (error) => {
  // 第２引数ではエラー処理
  throw error.response;
});


export default axiosClient;