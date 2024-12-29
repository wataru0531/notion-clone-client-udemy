/**************************************************************

ログイン時、登録時の共通のコンポーネント

***************************************************************/
import React, { useEffect } from "react";
import  { Container } from "@mui/system";
import { Box } from "@mui/material";

// Outlet ... ネストした子コンポーネントが全て含まれている
import { Outlet, useNavigate } from "react-router-dom";

import authUtils from "../../utils/authUtils";
import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout =  () => {
  const navigate = useNavigate();

  useEffect(() => {
    // JWTを持っているかを確認
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
    
      // トークン(JWT)があればあればリダイレクト
      if(isAuth){
        navigate("/");
      }
    }
    checkAuth();

    // ページ遷移するたびにuseEffectを発火させる
  }, [ navigate ]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img 
            src={ notionLogo } 
            alt="Notionののロゴ画像"
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notion Clone開発
        </Box>

        <Outlet /> 
      </Container>
    </div>
  )
};

export default AuthLayout;