
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Drawer, List, Box, Typography, IconButton, ListItemButton } from "@mui/material";
import { AddBoxOutlined, LogoutOutlined } from "@mui/icons-material";

import assets from "../../assets";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";


const Sidebar = () => {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const { memoId } = useParams();

  /********************
  storeから取り出す
  *********************/
  const { username } = useSelector(store => store.user.value);
  // console.log(username)

  const memos = useSelector(store => store.memo.value);
  // console.log(memos)

  // ログアウトボタン
  const onClickLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  }

  // ログインしているユーザーのメモを全て取得
  useEffect(() => {
    const getMemos = async () => {
      // APIを叩くときはときはトライキャッチ文にする
      try{
        const res = await memoApi.getAll();
        // console.log(res);

        // Reduxを使いグローバルに保存
        dispatch(setMemo(res));
        
      }catch(error){
        alert(error);
      }
    }
    getMemos();

    // dispatchが呼ばれると同時に発火
  }, [ dispatch ])

  // クリックしたメモをハイライトする
  const [ activeIndex, setActiveIndex ] = useState(0);

  useEffect(() => {
    // findIndex ... memosの添字を1つづつ操作し、trueのみの添字を返す
    // memoId    ... useParamsで取得したURL
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    // console.log(activeIndex)
    setActiveIndex(activeIndex);

  }, [ navigate ])

  
  // メモを追加する
  const onClickAddMemo = async () => {

    try{
      const res = await memoApi.create();
      // console.log(res)
      // 新しく作成したメモに、これまでのメモを追加して配列を作る
      const newMemos = [res, ...memos];
      // console.log(newMemos)

      // Reduxに保存
      dispatch(setMemo(newMemos));

      navigate(`/memo/${res._id}`)

    }catch(error){
      alert(error)
    }
  }


  return (
  <Drawer 
    container={ window.document.body }
    variant="permanent" // 色など
    open={ true }
    sx={{ width: 250, height: "100vh" }}
  >
    <List 
      sx={{
        width: 250, 
        height: "200vh",
        backgroundColor: assets.colors.secondary,
      }}
      
    >
      <ListItemButton>
        <Box 
          sx={{ 
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ログインしているユーザー名 */}
          <Typography variant="body2" fontWeight="bold">
            { username }
          </Typography>

          {/* ログアウトボタン */}
          <IconButton onClick={ onClickLogout }>
            <LogoutOutlined />
          </IconButton>
        </Box>
      </ListItemButton>

      <Box sx={{ paddingTop: "10px" }}>
        <ListItemButton>
          <Box 
            sx={{ 
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Favorite
            </Typography>
          </Box>
        </ListItemButton>
      </Box>

      <Box sx={{ paddingTop: "10px" }}>
        <ListItemButton>
            <Box 
              sx={{ 
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Private
              </Typography>

              <IconButton onClick={ onClickAddMemo }>
                <AddBoxOutlined/>
              </IconButton>
            </Box>
        </ListItemButton>
        
        {/* mongoDBからメモを展開していく */}
        {
          memos.map((memo, index) => (
            <ListItemButton 
              key={ memo._id }
              sx={{ pl: "20px" }} 
              component={ Link }                 // aタグ化する
              to={ `/memo/${memo._id}` }         // 遷移先
              selected={ index === activeIndex } // 選択されていると色が変化
            >
              <Typography>
                { memo.icon }{ memo.title }
                </Typography>
            </ListItemButton>
          ))
        }
      </Box>
    </List>
  </Drawer>
  );
};

export default Sidebar;