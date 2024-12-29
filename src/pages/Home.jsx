/**************************************************************

Notion本体のコンポーネント
Loginしていた場合、トークンがある場合このページにリダイレクトされる

***************************************************************/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import memoApi from "../api/memoApi";

const Home = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(false);

  // メモを作成する
  const onClickCreateMemo = async () => {
    // APIを叩いていく
    try{
      setLoading(true);

      const res = await memoApi.create();
      // console.log(res)

      // 詳細ページにリダイレクト
      navigate(`/memo/${res._id}`)
    }catch(error){
      alert(error);
    }finally{
      // finally ... 必ず最後に実行される
      setLoading(false);
    }
  }

  return(
    <Box 
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingButton 
        variant="outlined"            // 枠線
        color="success"               // 色を緑に
        onClick={ onClickCreateMemo } // メモを作成する関数
        loading={ isLoading }
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  )
  
};

export default Home;
