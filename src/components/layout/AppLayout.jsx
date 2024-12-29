/**************************************************************

Notion本体の共通のコンポーネント

***************************************************************/
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import  { Container } from "@mui/system";
import { Box } from "@mui/material";
// Outlet ... ネストした子コンポーネントが全て含まれている
import { Outlet, useNavigate } from "react-router-dom";

import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
// import notionLogo from "../../assets/images/notion-logo.png";
import { setUser } from "../../redux/features/userSlice";

const AppLayout =  () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // JWTを持っているかを確認
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();
    
      // トークン(JWT)がなければリダイレクト
      if(!user){
        navigate("/login");
      } else {

        /**************************
        ここでユーザーをReducerに保存
        → Actionを投げる(Action名とReducer名が同じなので注意)
        ***************************/
        // setUser ... Actionのこと。引数はpayload
        // Action ... type: 'user/setUser', payload: {…user}
        dispatch(setUser(user));

      }
    }
    checkAuth();

    // ページ遷移するたびにuseEffectを発火させる
  }, [ navigate ]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
};

export default AppLayout;