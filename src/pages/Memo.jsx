/**************************************************************

メモ単体のページ

***************************************************************/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import memoApi from '../api/memoApi';
import EmojiPicker from '../components/common/EmojiPicker';
import { setMemo } from '../redux/features/memoSlice';


const Memo = () => {
  const { memoId } = useParams();
  const navigate = useNavigate();

  const [ title, setTitle ]             = useState("");
  const [ description, setDescription ] = useState("");
  const [ icon, setIcon ] = useState("");

  const dispatch = useDispatch();
  const memos = useSelector(store => store.memo.value);
  // console.log(memos)

  // console.log(memoId)

  // メモを1つ取得
  useEffect(() => {
    const getMemo = async () => {
      try{
        // APIで取得
        const res = await memoApi.getOne(memoId);
        // console.log(res)

        setTitle(res.title)
        setDescription(res.description);
        setIcon(res.icon)

      }catch(error){
        alert(error)
      }
    }
    getMemo();

    // memoIdが切り替わるたびに発火
  }, [ memoId ]);

  // 更新に一定時間空けるためにsetTimeoutを使う
  let timer;
  const timeout=  500;

   // タイトルを更新
  const onChangeUpdateTitle = async (e) => {
    //  500ms秒経ってから発火するように設定。500ms経っていない場合は発火しない
    clearTimeout(timer);

    // console.log(e.target.value)
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      // mongoDBに保存、更新する
      try{
        // APIを叩く
        await memoApi.update(memoId, { title: newTitle });

      }catch(error){
        alert(error)
      }
    }, timeout);
  }

  // ディスクリプションを更新
  const onChangeUpdateDescription = async (e) => {
    clearTimeout(timer);

    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async() => {
      try{
        await memoApi.update(memoId, { description: newDescription });

      }catch(error){
        alert(error);
      }
    }, timeout);
  }

  // 削除ボタン
  const onClickDeleteMemo = async () => {
    try{
      await memoApi.delete(memoId);

      // Reducerのメモを1つ削除してやり、Reducerに通知
      const newMemos = memos.filter(memo => memo._id !== memoId);
      dispatch(setMemo(newMemos));
      console.log(newMemos)

      //  メモが1つもない場合はメモのトップに遷移させる。
      if(newMemos === 0){
        navigate("/");
      }else{
        navigate(`/memo/${newMemos[0]._id}`);
      }

    }catch(error){
      alert(error);
    }
  };

  // アイコンを切り替える
  const onChangeIcon = async (_newIcon) => {
    const temp = [ ...memos ]
    console.log(temp)
    
    // クリックしたメモのインデックスを全てのメモの中から取得
    const index = temp.findIndex(e => e._id === memoId);
    console.log(index)

    // 新しいアイコンを追加、上書き
    temp[index] = { ...temp[index], icon: _newIcon }

    setIcon(_newIcon);
    dispatch(setMemo(temp));

    // mongoDBの中も更新
    try{
      await memoApi.update(memoId, { icon: _newIcon });
    }catch(error){
      alert(error);
    }
  }
  
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* お気に入りボタン */}
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>

        {/* 削除ボタン */}
        <IconButton 
          variant="outlined"
          color="error"
          onClick={ onClickDeleteMemo }
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>

      <Box>
        <Box sx={{ padding: "10px 50px" }}>
          <EmojiPicker 
            icon={ icon }
            onChange={ onChangeIcon }
          />
          
          <TextField
            onChange={ onChangeUpdateTitle }
            placeholder={ title }
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input":  { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
            }}
          />
          <TextField
            onChange={ onChangeUpdateDescription }
            placeholder={ description }
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input":  { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem" },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Memo;
